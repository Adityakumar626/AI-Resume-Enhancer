const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdf = require("pdf-parse-fork"); // Update this line

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async (req, res) => {
  try {
    // ... your logging ...

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // This call should now work perfectly without "is not a function" errors
    const pdfData = await pdf(req.file.buffer);
    const resumeText = pdfData.text;

    console.log("✅ PDF Text Extracted!");

    // ... rest of your code (model config and prompt) ...

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const jobDescription = req.body.jobDescription || "No description provided";

    const prompt = `
  You are a highly critical ATS (Applicant Tracking System) Gatekeeper. 
  
  TASK:
  Compare the <Resume> against the <JobDescription>. 
  If the Resume has NO relevance to the Job Description (e.g., a Chef applying for a DevOps role), the matchPercentage MUST be below 10%.

  <JobDescription>
  ${jobDescription}
  </JobDescription>

  <Resume>
  ${resumeText}
  </Resume>

  SCORING RULES (MANDATORY):
  1. BASELINE: Start at 0%. Do not give points for general skills like "Communication" or "Microsoft Office" unless explicitly required.
  2. ZERO-OVERLAP PENALTY: If core technical requirements (e.g., specific languages, frameworks, or domain expertise) are completely missing, the score cannot exceed 15%.
  3. HALLUCINATION CHECK: Do not assume the candidate knows a tool just because they know a similar one. 
  4. WEIGHTING: 70% of the score must come from Hard Skills/Experience. 30% from Soft Skills/Education.

  OUTPUT FORMAT:
  Return ONLY JSON:
  {
    "matchPercentage": number,
    "missingSkills": ["List the TOP 5 missing core requirements"],
    "keywordOptimization": ["List keywords they are missing"],
    "contentFeedback": "A blunt, 1-sentence explanation of why they are or are not a fit."
  }
`;

    const result = await model.generateContent(prompt);
    res.status(200).json(JSON.parse(result.response.text()));
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};
