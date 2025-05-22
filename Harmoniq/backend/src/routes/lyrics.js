import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/generate-lyrics-for-song", async (req, res) => {
    const { title, artist, mood, genre } = req.body;
  
    if (!title || !artist || !genre) {
      return res.status(400).json({ error: "Missing song metadata" });
    }
  
    const prompt = `Generate ${mood || ""} ${genre} song lyrics for a song titled "${title}" by ${artist}.`;
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional songwriter AI assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 300,
      });
  
      const lyrics = response.choices[0].message.content;
      res.json({ lyrics });
    } catch (err) {
      console.error("Lyrics generation failed:", err);
      res.status(500).json({ error: "Lyrics generation failed" });
    }
  });
  
  export default router;