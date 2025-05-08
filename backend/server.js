require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado ao MongoDB Atlas!"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB Atlas:", err));

// Rotas de autenticação
const { authRouter, verifyToken } = require("./routes/auth");
app.use("/api/auth", authRouter);

// Rota de teste protegida
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: "Acesso autorizado a rota protegida!", user: req.user });
});

app.get("/", (req, res) => {
    res.send("API do Dashboard rodando");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
