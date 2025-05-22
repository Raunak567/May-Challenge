import express from "express";
import { CohereClient } from "cohere-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the songs file
const songs = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../seeds/songs_with_embeddings.json"),
    "utf-8"
  )
).songs;

function searchSongs(query, songs) {
  const searchTerms = query.toLowerCase().split(' ');
  
  return songs
    .map(song => {
      const title = song.title.toLowerCase();
      const artist = song.artist.toLowerCase();
      
      // Calculate a simple relevance score
      const score = searchTerms.reduce((total, term) => {
        if (title.includes(term)) total += 2;
        if (artist.includes(term)) total += 1;
        return total;
      }, 0);
      
      return { ...song, score };
    })
    .filter(song => song.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const results = searchSongs(query, songs);
    res.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Error performing search" });
  }
});

export default router;
