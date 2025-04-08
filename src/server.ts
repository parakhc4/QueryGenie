import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {generateSQLFromPrompt} from './llm/gemini.ts';
import { extractSQLFromPrompt } from './llm/validation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // To parse JSON body

// POST /generate
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ success: false, error: 'Prompt is required' });
  }
  const sql = await generateSQLFromPrompt(prompt);

  console.log(sql);

  const validated_sql = await extractSQLFromPrompt(sql);

  console.log(validated_sql)
  
  return res.json({
    success: true,
    prompt,
    response: validated_sql,
  });
  
});



// To listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});