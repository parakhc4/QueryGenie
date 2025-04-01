import MonsterAPI from 'monsterapi';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.MONSTER_API_KEY;
if (!apiKey) {
  throw new Error("MONSTER_API_KEY is not defined in the environment variables.");
}
const client = new MonsterAPI(apiKey);

const model = "falcon-7b-instruct"; 
const input = {
  prompt:"Hello",
};

client
  .generate(model, input)
  .then((response) => {
    console.log("Generated content:", response);
  })
  .catch((error) => {
    // Handle API errors
    console.error("Error:", error);
  });
