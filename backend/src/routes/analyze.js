const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResume } = require('../controllers/analyzeController');

const upload = multer({ storage: multer.memoryStorage() });

// 'resume' must match the key name in Postman!
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;