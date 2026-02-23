require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoutes = require("./routes/analyze");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.url}`);
  console.log(">>> Content-Type:", req.headers["content-type"]);
  next();
});

// ROUTES
app.use("/api", analyzeRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
