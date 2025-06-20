require("dotenv").config();
const app = require("./api");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor ConsciêncIA Vercel rodando na porta ${port}`);
});
