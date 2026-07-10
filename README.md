# 🚀 AI Resume Tailor

AI Resume Tailor is a Generative AI-powered web application that helps job seekers tailor their resumes according to specific job descriptions. The system analyzes uploaded resumes and job posts, calculates a match score, identifies missing skills, and provides AI-generated feedback to improve ATS compatibility and recruiter appeal.

---

# 📌 Problem Statement

Job seekers often struggle to:

- Tailor resumes for every job application
- Identify missing skills required for a role
- Optimize resumes for Applicant Tracking Systems (ATS)
- Match evolving job description requirements

AI Resume Tailor solves this using LLM-powered resume analysis and intelligent feedback generation.

---

# 🧠 Core Features

- ✅ Upload Resume (PDF)
- ✅ Paste Job Description
- ✅ AI-Powered Resume Analysis
- ✅ Percentage-Based Match Score
- ✅ Missing Skills Detection
- ✅ AI Feedback & Improvement Suggestions

---

# 🏗️ Tech Stack

## Frontend

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **PDF Parsing:** pdf-parse
- **File Handling:** Multer
- **AI Model:** Google Gemini (`gemini-2.5-flash`)

## Storage

- Resume files are stored locally on the backend server.

---

# ⚙️ System Architecture

User → Next.js Frontend → Express API →  
PDF Parsing (pdf-parse) → Gemini API →  
Response Processing → UI Rendering

---

# 📂 Project Structure

```
AI-Resume-Tailor/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── .next/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── node_modules/
│   ├── public/
│   ├── .env
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   └── tsconfig.json
│
└── README.md
```

---

# 🔌 API Documentation

## Base URL

```
http://localhost:5000
```

---

## 1️⃣ Analyze Resume

### Endpoint

```
POST /api/analyze
```

### Content-Type

```
multipart/form-data
```

### Request Body

| Field          | Type       | Description             |
| -------------- | ---------- | ----------------------- |
| resume         | File (PDF) | Uploaded resume file    |
| jobDescription | Text       | Job description content |

### Sample Response

```json
{
  "matchPercentage": 82,
  "missingSkills": ["Docker", "Kubernetes"],
  "contentFeedback": "Your resume is strong in backend development but lacks cloud-native deployment experience."
}
```

---

# 🛠️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Adityakumar626/AI-Resume-Enhancer.git
cd ai-resume-enhancer
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` inside `/backend`

```
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
```

### Start Backend Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

### Create `.env` inside `/frontend`

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Start Frontend

```bash
npm run dev
```

Application runs at:

```
http://localhost:3000
```

---

# 🧠 How It Works

1. User uploads resume (PDF).
2. Backend parses resume using `pdf-parse`.
3. Job description is combined with resume content.
4. Prompt-engineered request is sent to Gemini (`gemini-2.5-flash`).
5. AI returns:
   - Match score
   - Missing skills
   - Resume improvement suggestions
6. Frontend renders animated results.

---

# 🎯 Key Highlights (For Review)

- Modern UI with Tailwind & Framer Motion
- Clean backend architecture (controllers, routes, middleware separation)
- Gemini LLM integration
- ATS-style scoring logic
- Skill gap detection
- Full-stack implementation (Next.js + Express)
- Environment-based configuration
- Scalable modular structure

---

# 🚀 Future Improvements

- Cover Letter Generator
- Resume Rewrite + Download Option
- ATS Keyword Highlight Simulation
- Cloud Storage (AWS S3)
- User Authentication
- Resume History Dashboard
- Vector Embedding Similarity Scoring

---

# 📊 Example Use Case

**Input:**

- Resume: Backend Developer
- Job Description: Cloud/DevOps Engineer

**Output:**

- 75% Match Score
- Missing Skills: AWS, Docker, CI/CD
- AI Feedback recommending measurable deployment achievements

---
