import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({ success: true, answer: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ success: false, error: "AI Service Error" });
  }
});

app.listen(port, () =>
  console.log(`🚀 Backend running at http://localhost:${port}`),
);
