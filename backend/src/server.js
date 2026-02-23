require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyze');

const app = express();

// 1. GLOBAL MIDDLEWARE (MUST come before routes)
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 2. DEBUGGER (Let's see the request before it hits Multer)
app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.url}`);
  console.log(">>> Content-Type:", req.headers['content-type']);
  next();
});

// 3. ROUTES
app.use('/api', analyzeRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});