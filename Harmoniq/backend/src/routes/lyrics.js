import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/lyrics', async (req, res) => {
  const { title, artist } = req.body;

  const prompt = `Write a short song inspired by the song "${title}" by ${artist}. Keep it lyrical, creative, and emotionally engaging.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 250
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const lyrics = response.data.choices[0].message.content.trim();
    res.json({ lyrics });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ lyrics: 'Error generating lyrics' });
  }
});

export default router;
