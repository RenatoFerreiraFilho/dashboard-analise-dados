require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexão com o MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin@mongo_db:27017/dashboard?authSource=admin";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB conectado com sucesso!"))
    .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// 🔹 Rota inicial para teste
app.get("/", (req, res) => {
    res.send("API do Dashboard rodando 🚀");
});

// 🔹 Iniciando o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
