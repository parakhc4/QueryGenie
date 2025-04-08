import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
dotenv.config();

export async function extractSQLFromPrompt(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const result = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are an expert SQL query extractor. You are given a text containing an SQL query inside. You need to respond with ONLY THE SQL QUERY.

You are working with a database called "BOOKS" with a single table also named "books". Here is the schema:

Table: books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  author VARCHAR(100),
  published_year INT,
  price NUMERIC(6, 2)
)

Rules:
- Use standard PostgreSQL syntax.
- Return **only** the SQL query as plain text.
Here is the text: 
  
  "${prompt}"
            `
          }
        ]
      }
    ]
  });
  
    console.log("🧠 Gemini extraction result:", result);
  
    const candidate = result.candidates?.[0];
  
    if (!candidate?.content?.parts?.[0]?.text) {
      throw new Error("No valid response text returned from Gemini");
    }
  
    return candidate.content.parts[0].text;
  }
  
