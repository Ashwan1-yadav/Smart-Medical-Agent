import { config } from "dotenv";
config();

import express from "express";
import z from "zod";
import path from "path";
import { fileURLToPath } from "url";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import medicineData from "./medicine_data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = process.env.PORT || 3000;

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.6,
});

const MedicinePrescribeTool = new DynamicStructuredTool({
  name: "MedicinePrescribeTool",
  description:
    "Given a symptom (like fever, headache, diarrhea, etc.), return the suitable medicine and dosage for adults and children.",
  schema: z.object({
    symptoms: z.string().describe("The symptom to analyze (e.g. fever, cough)"),
  }),
  func: async ({ symptoms }) => {
    const medicines = medicineData;
    if (!symptoms)
      return `Please provide a symptom to analyze.`;

    const med = medicines[symptoms.toLowerCase()];
    if (!med)
      return `No medicine found for "${symptoms}". Please consult a doctor.`;

    return `For ${symptoms}:
Recommended Medicine: ${med}
Adult Dosage: 1 tablet twice daily
Child Dosage: ½ tablet twice daily (consult pediatrician before use)`;
  },
});

const agent = model.bindTools([MedicinePrescribeTool]);

// Routes
app.get("/", (req, res) => {
  res.render("landingPage", { 
    title: "Smart Medical Agent",
    page: "home"
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { 
    title: "Dashboard - Medical Agent",
    page: "dashboard"
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ error: "Missing 'question' field" });

    const result = await agent.invoke(question);

    if (result.tool_calls && result.tool_calls.length > 0) {
      const call = result.tool_calls[0];
      const response = await MedicinePrescribeTool.invoke(call.args);
      return res.json({ response, type: "prescription" });
    }

    res.json({ response: result.content[0].text, type: "general" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});