// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');
const welcomeScreen = document.getElementById('welcomeScreen');
const typingIndicator = document.getElementById('typingIndicator');
const chatArea = document.getElementById('chatArea');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// State
let isProcessing = false;
let conversationHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  autoResizeTextarea();
});

// Setup Event Listeners
function setupEventListeners() {
  // Send message on button click
  sendButton.addEventListener('click', handleSendMessage);
  
  // Send message on Enter (Shift+Enter for new line)
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Auto-resize textarea
  messageInput.addEventListener('input', autoResizeTextarea);

  // Suggestion cards
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query;
      messageInput.value = query;
      handleSendMessage();
    });
  });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }
}

// Toggle Sidebar (Mobile)
function toggleSidebar() {
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

// Auto-resize textarea
function autoResizeTextarea() {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 128) + 'px';
}

// Handle Send Message
async function handleSendMessage() {
  const message = messageInput.value.trim();
  
  if (!message || isProcessing) return;
  
  isProcessing = true;
  sendButton.disabled = true;
  
  // Hide welcome screen
  if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
    welcomeScreen.classList.add('hidden');
  }
  
  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  
  // Add user message to UI
  addMessage(message, 'user');
  
  // Add to conversation history
  conversationHistory.push({ role: 'user', message });
  
  // Show typing indicator
  showTypingIndicator();
  
  try {
    // Call API
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: message })
    });
    
    const data = await response.json();
    
    // Hide typing indicator
    hideTypingIndicator();
    
    if (response.ok) {
      // Parse and display response
      addMessage(data.response, 'assistant', data.type);
      conversationHistory.push({ role: 'assistant', message: data.response });
    } else {
      addMessage('Sorry, I encountered an error. Please try again.', 'assistant', 'error');
    }
    
  } catch (error) {
    hideTypingIndicator();
    console.error('Error:', error);
    addMessage('Sorry, I couldn\'t connect to the server. Please check your connection.', 'assistant', 'error');
  } finally {
    isProcessing = false;
    sendButton.disabled = false;
    messageInput.focus();
  }
}

// Add Message to UI
function addMessage(text, role, type = 'general') {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'flex items-start space-x-3 animate-fadeIn';
  
  if (role === 'user') {
    messageDiv.innerHTML = `
      <div class="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <div class="flex-1 bg-slate-100 px-6 py-4 rounded-2xl rounded-tl-sm">
        <p class="text-slate-900 whitespace-pre-wrap leading-relaxed">${escapeHtml(text)}</p>
      </div>
    `;
  } else {
    const isPrescription = type === 'prescription' || text.includes('Recommended Medicine') || text.includes('Adult Dosage');
    
    messageDiv.innerHTML = `
      <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </div>
      <div class="flex-1 bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-tl-sm shadow-sm">
        ${isPrescription ? formatPrescription(text) : `<p class="text-slate-900 whitespace-pre-wrap leading-relaxed">${escapeHtml(text)}</p>`}
      </div>
    `;
  }
  
  messagesContainer.appendChild(messageDiv);
  scrollToBottom();
}

// Format Prescription Response
function formatPrescription(text) {
  const lines = text.split('\n').filter(line => line.trim());
  
  let html = '<div class="space-y-4">';
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('For ')) {
      html += `<div class="flex items-center space-x-2 text-emerald-700 font-semibold mb-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>${escapeHtml(trimmedLine)}</span>
      </div>`;
    } else if (trimmedLine.includes(':')) {
      const [label, value] = trimmedLine.split(':').map(s => s.trim());
      html += `
        <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
          <div class="font-semibold text-slate-900 mb-1">${escapeHtml(label)}</div>
          <div class="text-slate-700">${escapeHtml(value)}</div>
        </div>
      `;
    } else {
      html += `<p class="text-slate-700">${escapeHtml(trimmedLine)}</p>`;
    }
  });
  
  html += '</div>';
  
  // Add disclaimer
  html += `
    <div class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-3">
      <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
      <div class="text-sm text-amber-800">
        <strong>Important:</strong> This is general information. Please consult a licensed healthcare professional before taking any medication.
      </div>
    </div>
  `;
  
  return html;
}

// Show/Hide Typing Indicator
function showTypingIndicator() {
  typingIndicator.classList.remove('hidden');
  scrollToBottom();
}

function hideTypingIndicator() {
  typingIndicator.classList.add('hidden');
}

// Scroll to Bottom
function scrollToBottom() {
  setTimeout(() => {
    chatArea.scrollTo({
      top: chatArea.scrollHeight,
      behavior: 'smooth'
    });
  }, 100);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;
document.head.appendChild(style);

console.log('🎨 Medical Agent Dashboard Loaded');