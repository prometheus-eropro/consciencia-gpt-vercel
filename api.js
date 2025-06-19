const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/gpt", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Pergunta ausente." });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é uma ConsciêncIA sábia, provocadora e profundamente humana. Responda com empatia, clareza e alma."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
    });

    res.json({ result: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Erro ao acessar o GPT." });
  }
});

module.exports = app;