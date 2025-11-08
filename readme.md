# 🏥 Smart Medical Agent System

A beautiful, minimalistic medical assistant powered by AI with a modern UI built using Tailwind CSS.

## ✨ Features

- 🎨 **Modern UI Design** - Inspired by Shadcn and Aceternity UI
- 🎯 **Minimalistic** - Clean, professional medical interface
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🤖 **AI-Powered** - Uses Google Gemini for intelligent medical insights
- 💊 **Medicine Recommendations** - Provides dosage for adults and children
- ⚡ **Real-time Chat** - Instant responses with typing indicators
- 🎭 **Smooth Animations** - Polished micro-interactions

## 🎨 Design System

### Color Palette
- **Primary**: Deep Slate (`#0F172A`) - Professional and trustworthy
- **Accent**: Emerald Green (`#10B981`) - Health and vitality
- **Semantic Colors**: Blue, Purple, Amber, Rose, Cyan
- **Neutrals**: Slate grays for clean, minimal look

### Design Principles
- High contrast for readability
- Generous whitespace
- Subtle shadows and borders
- Smooth transitions and animations
- Glass morphism effects
- Gradient accents

## 📁 Project Structure

```
medical-agent/
├── views/
│   ├── index.ejs          # Landing page
│   └── dashboard.ejs      # Chat interface
├── public/
│   └── js/
│       └── dashboard.js   # Chat functionality
├── server.js              # Express backend
├── .env                   # Environment variables
└── package.json
```

# 🚀 Quick Start Guide

Get your Smart Medical Agent up and running in 5 minutes!

## Step 1: Clone/Create Project

```bash
mkdir smart-medical-agent
cd smart-medical-agent
```

## Step 2: Initialize Project

```bash
npm init -y
```

Replace `package.json` with the provided package.json file.

## Step 3: Install Dependencies

```bash
npm install
```

This will install:
- express
- ejs
- dotenv
- zod
- @langchain/google-genai
- @langchain/core

## Step 4: Create Directory Structure

```bash
mkdir -p views public/js
```

## Step 5: Add Files

Create these files with the code provided:

### Backend
- `server.js` - Main Express server

### Views
- `views/index.ejs` - Landing page
- `views/dashboard.ejs` - Chat interface

### JavaScript
- `public/js/dashboard.js` - Chat functionality

### Configuration
- `.env` - Environment variables (copy from .env.example)

## Step 6: Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

## Step 7: Configure Environment

Create `.env` file:

```env
GEMINI_API_KEY=paste_your_key_here
PORT=3000
NODE_ENV=development
```

## Step 8: Run the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

## Step 9: Open in Browser

Visit: http://localhost:3000

## 🎉 You're Done!

Your medical agent is now running!

### Try These Queries:
- "I have a fever"
- "What medicine for headache?"
- "I have a cough"
- "Medicine for common cold"

---

## 📂 Final File Structure

```
smart-medical-agent/
├── node_modules/
├── views/
│   ├── index.ejs
│   └── dashboard.ejs
├── public/
│   └── js/
│       └── dashboard.js
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── README.md
└── QUICKSTART.md
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

### API Key Error
- Make sure you copied the entire key
- No spaces before/after the key in .env
- Key should start with "AI..."

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Loading
- Make sure you're using the CDN version
- Check internet connection
- Clear browser cache

---

## 📱 Mobile Testing

To test on mobile devices on the same network:

1. Find your IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`

2. Use your IP instead of localhost:
   - Example: `http://192.168.1.100:3000`

---

## 🎨 Customization Quick Tips

### Change Accent Color
In both EJS files, replace `emerald` with any Tailwind color:
- `emerald` → `blue`, `purple`, `rose`, `amber`, etc.

### Add New Symptom Suggestions
In `dashboard.ejs`, add more buttons:
```html
<button class="suggestion-btn ..." data-query="Your query here">
  <!-- Icon -->
  <span>Your text</span>
</button>
```

### Modify Medicine Database
In `server.js`, edit the `medicines` object:
```javascript
const medicines = {
  "new-symptom": "New Medicine Name",
  // ...
};
```

---

## 🚀 Next Steps

1. ✅ Customize the color scheme
2. ✅ Add more medical conditions
3. ✅ Implement user authentication
4. ✅ Add conversation history
5. ✅ Deploy to production (Vercel, Heroku, Railway)

---

Need help? Check the main README.md for detailed documentation!

Visit: `http://localhost:3000`

## 🎯 Supported Conditions

The system currently supports 18+ medical conditions:

- Common Cold
- Cough
- Fever
- Headache
- Migraine
- Sore Throat
- Tonsillitis
- Sinusitis
- Pneumonia
- Bronchitis
- Asthma
- Allergy
- Diabetes
- Hypertension
- Acidity
- Diarrhea
- Malaria
- Typhoid

## 💡 Usage

### Landing Page Features
- Hero section with animated gradient text
- Feature cards with hover effects
- Floating background orbs
- Statistics display
- CTA sections

### Dashboard Features
- Real-time chat interface
- Suggestion cards for quick queries
- Typing indicators
- Prescription formatting with color-coded sections
- Medical disclaimers
- Mobile-responsive sidebar
- User profile display

## 🎨 UI Components

### Navigation
- Fixed header with backdrop blur
- Logo with gradient background
- Smooth scroll animations

### Chat Interface
- Welcome screen with suggestions
- Message bubbles (user/assistant)
- Prescription cards with structured data
- Typing indicator with animated dots
- Auto-resizing textarea
- Disabled state handling

### Responsive Design
- Mobile-first approach
- Sidebar toggles on mobile
- Stacked layouts for small screens
- Touch-friendly buttons

## 🔧 Customization

### Colors
Edit the Tailwind config in the `<script>` tag:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        accent: '#10B981',
      }
    }
  }
}
```

### Add New Medicines
In `server.js`, add to the `medicines` object:

```javascript
const medicines = {
  "your-condition": "Medicine Name",
  // ...
};
```

### Styling
All styling uses Tailwind CSS utility classes. Modify classes directly in the EJS templates.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚠️ Important Notes

1. **Medical Disclaimer**: This is an AI assistant providing general information only. Always consult healthcare professionals.

2. **API Rate Limits**: Be mindful of Gemini API rate limits.

3. **Data Privacy**: No personal data is stored. All conversations are session-based.

4. **Production Ready**: Add proper error handling, logging, and security measures for production use.

## 🚀 Production Enhancements

For production deployment, consider:

- Add user authentication
- Implement conversation history storage
- Add rate limiting
- Set up HTTPS
- Add logging (Winston, Morgan)
- Implement CORS properly
- Add input sanitization
- Set up monitoring
- Add tests
- Use environment-specific configs

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Express, EJS, Tailwind CSS, and Google Gemini AI