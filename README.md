# 🎯 Decision Companion AI

<p align="center">
  <a href="https://decision-companion-ai.vercel.app/">
    🚀 Live Demo
  </a>
</p>

**Decision Companion AI** is a full-stack web application that helps users make structured, logical decisions using AI.  
It takes your decision criteria and outputs a clear recommendation, confidence score, reasoning, risks, and alternatives — all automatically generated using a Pydantic AI agent.

---

## 💡 Problem Statement

People often struggle to make important life decisions such as:
- Career choices
- Education vs job
- Business vs stability
- Investment vs saving

These decisions involve complex tradeoffs and subjective risks.

**Decision Companion AI** simplifies this by:
✔ Analyzing options  
✔ Weighing pros and cons  
✔ Respecting risk tolerance  
✔ Providing a clear recommendation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS + shadcn/ui |
| Backend | Python + FastAPI |
| AI Agent | Pydantic AI |
| API Hosting | Vercel (frontend), Render / Railway (backend) |
| AI Model | OpenRouter (free tokens capable) |

---

## 📌 Features

### 🌟 Core Functionality

- User inputs:
  - Decision title
  - Options (e.g., Startup vs Job)
  - Pros & cons for each
  - Priority factors
  - Risk tolerance

- Output:
  - Recommended option
  - Confidence score (0–100)
  - Structured explanation
  - Key risks
  - One alternative choice

### 🧠 Why It’s Unique

- Uses **structured Pydantic models** for input validation and output consistency
- AI agent driven, not rule-based
- Clear AI reasoning with JSON output that’s easy to parse and display
- Real use-case: decision aid, not chat bot

---

## 📸 Screenshots

*(Include a few screenshots here if you want — interpretation optional)*

Example UI:
