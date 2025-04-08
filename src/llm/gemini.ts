import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
dotenv.config();

export async function generateSQLFromPrompt(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
    const systemPrompt = `
You are an expert SQL query generator. Your job is to convert plain English questions into PostgreSQL queries.

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
- Do not include explanations or extra comments.
- Return **only** the SQL query as plain text.
- If the query is ambiguous, make reasonable assumptions.
`;

const result = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
  You are an expert SQL query generator. Your job is to convert plain English questions into PostgreSQL queries.
  
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
  - Do not include explanations or extra comments.
  - Return ONLY the SQL query as plain text.
  - If the query is ambiguous, make reasonable assumptions.
  
  Now, convert the following prompt to SQL:
  
  "${prompt}"
            `
          }
        ]
      }
    ]
  });
  
    console.log("🧠 Gemini raw result:", result);
  
    const candidate = result.candidates?.[0];
  
    if (!candidate?.content?.parts?.[0]?.text) {
      throw new Error("No valid response text returned from Gemini");
    }
  
    return candidate.content.parts[0].text;
  }
  
