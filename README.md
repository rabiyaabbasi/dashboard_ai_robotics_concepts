# Top AI Concepts in Robotics – Interactive Dashboard

An interactive React + TypeScript dashboard that visualizes 25+ foundational **AI concepts powering modern robotics** – including Physical AI, Embodied AI, Agentic AI, Digital Twins, Sim2Real Transfer, Swarm Intelligence, Neuromorphic Chips, and more.

This project is designed as a **glossary + learning tool** for engineers, researchers, and students exploring AI in robotics.

---

## 🧠 Features

- 🎛️ **Clickable concept cards** – each card opens a rich modal
- 📚 **Clear descriptions + real-world use cases** for every concept
- 🤖 **"Ask Gemini" panel** with:
  - 👶 ELI5 explanations
  - ⚠️ Future risks / ethics
  - 🚀 Startup idea prompts
- 🔊 **Text-to-speech narration** of each concept and use case
- 🎨 Clean, responsive UI with Tailwind CSS and `lucide-react` icons

> Note: The Gemini API integration is wired in the code, but you need your own API key to actually call the models.

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons
- Google Gemini API (text + TTS)

---

## 🚀 Getting Started (Local)

```bash
# install dependencies
npm install

# start dev server
npm run dev


Then open the URL Vite prints in your terminal (usually http://localhost:5173).

🔐 Gemini API Key

In src/App.tsx, you will see:

const API_KEY = "";


For a public GitHub repo, you should NOT commit your real key.

For local testing only, you can temporarily paste your key there, or (better) switch to an environment variable with:

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";


and create a .env file (not committed) with:

VITE_GEMINI_API_KEY=your_real_key_here

📸 Use in Content

This dashboard is designed to be embedded or screenshotted for:

LinkedIn posts on AI in robotics

Talks and workshops on embodied AI / Physical AI

Teaching materials for robotics & AI courses

Personal learning hubs
