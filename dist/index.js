import 'cross-fetch/polyfill'; // <-- must be first
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Explain how AI works in a few words"
    });
    console.log(response.text);
}
await main();
