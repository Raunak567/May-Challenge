# 🎧 Harmoniq — AI-Powered Social Music App

Welcome to **Harmoniq**, an intelligent and collaborative music platform that combines the magic of music with the power of AI. Whether you're vibing solo or syncing up with friends, Harmoniq makes your listening experience smarter, more social, and tailored to your emotions and preferences.

---

## 🚀 Key Features

✅ **Natural Language Song Search** — Ask for songs like _“chill jazz with rainy vibes”_  
✅ **AI-Generated Lyrics** — Create lyrics from scratch using GPT-4 or Mistral  
✅ **Mood-Based Music Tagging** — Songs automatically classified by emotional tone  
✅ **Live Chat While Listening** — Chat and react to music live with your group  
✅ **Friend System** — Add friends, invite them to join sessions, and sing together  

---

## 🧠 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + WebSockets + OpenAI API
- **AI Models**:
  - [Cohere](https://cohere.com/) for Embedding & Rerank (Search)
  - [OpenAI GPT-4](https://openai.com) / [Mistral 7B](https://mistral.ai) for Lyrics & Chat
  - Hugging Face for Emotion Classification
- **Database**: MongoDB
- **Real-Time**: WebSockets for chat & synchronized playback

---

## 💡 Example Use Cases

- 🔍 _“Find me relaxing indie songs with happy vibes”_  
- ✍️ Generate custom lyrics for your own melodies  
- 🧑‍🤝‍🧑 Start a room with friends and listen together in sync  
- 💬 Chat while you listen, react to songs, and share music moments live  
- 🧠 Tag your favorite songs by emotion or theme for smarter discovery  

---

## 📦 Installation & Running the App

Clone the repository:

```bash
git clone https://github.com/Raunak567/May-Challenge.git
cd May-Challenge
```

### 🖥️ Terminal 1: Frontend
```bash
cd ./Harmoniq/frontend/
npm install
npm run dev
```

### 🖥️ Terminal 2: Backend
```bash
cd ./Harmoniq/backend/
npm install
npm run dev
```

⚠️ Both frontend and backend must be running for full functionality.

---

## 📌 Under Development

- 🎧 Collaborative playlist editing  
- 🧠 Music tagging via a fine-tuned BERT model  
- 🛠️ Admin panel for metadata & content control  
- 🗃️ Persistent lyrics & user preferences storage

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas to improve the AI, UI/UX, or real-time sync logic, feel free to fork the repo and submit a PR.

---

## 📬 Contact

Made by **Raunak** — passionate about building experiences where **music meets AI** and friends vibe together.  
