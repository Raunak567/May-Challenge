// GenerateLyrics.jsx
import React, { useState } from "react";
import axios from "axios";

export default function GenerateLyrics() {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/generate-lyrics-for-song", { prompt });
      setLyrics(res.data.lyrics);
    } catch (err) {
      console.error("Failed to generate lyrics:", err);
      setLyrics("Error generating lyrics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎶 AI Lyrics Generator</h2>
      <textarea
        rows="3"
        style={{ width: "100%", padding: "0.5rem" }}
        placeholder="Enter a theme like 'breakup in R&B style'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        {loading ? "Generating..." : "Generate Lyrics"}
      </button>

      <div style={{ whiteSpace: "pre-wrap", marginTop: "2rem" }}>
        {lyrics}
      </div>
    </div>
  );
}
