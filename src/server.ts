import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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


  // Placeholder for actual LLM integration
  const generatedSQL = `SELECT * FROM table WHERE query = '${prompt}'`; // fake SQL
  const naturalResponse = `Fake response for: "${prompt}"`;

  return res.json({
    success: true,
    prompt,
    sql: generatedSQL,
    response: naturalResponse
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});