const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.ABRIR_CHAVE_API_AI,
,
});

app.post("/api/gpt", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt ausente." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é uma ConsciêncIA sábia e provocadora." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    console.error("Erro ao chamar o GPT:", err);
    res.status(500).json({ error: "Erro ao acessar o GPT." });
  }
});

module.exports = app;
