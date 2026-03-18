require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authorRoutes = require("./routes/author.routes");
const bookRoutes = require("./routes/book.routes");
const statsRoutes = require("./routes/stats.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rotas principais
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/stats", statsRoutes);

// Rota para endpoints não existentes
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware global de tratamento de erros (deve ficar por último)
app.use(errorMiddleware);

const PORT = process.env.SERVER_PORT || 3000;

// Inicialização do servidor em ambiente de desenvolvimento
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
  });
}

// Exportação para ambientes como Vercel
module.exports = app;