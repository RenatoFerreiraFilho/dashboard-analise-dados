const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const secretKey = process.env.JWT_SECRET;

// Endpoint de registro de novo usuário
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Usuário já existe!" });
        }

        // Gera o hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Cria e salva o novo usuário
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Endpoint de login de usuário existente
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Usuário não encontrado!" });

        // Compara a senha enviada com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Senha inválida!" });

        // Cria o payload do token
        const payload = { userId: user._id, email: user.email };

        // Gera o token com expiração de 1 hora
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro ao efetuar login" });
    }
});

// Middleware de verificação de token
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "Acesso negado, token não fornecido!" });

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified; // informações do token (payload)
        next();
    } catch (error) {
        res.status(400).json({ error: "Token inválido!" });
    }
};

// Endpoint para obter informações do usuário autenticado
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Retorna dados sem a senha
        if (!user) return res.status(404).json({ error: "Usuário não encontrado!" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados do usuário" });
    }
});

module.exports = { authRouter: router, verifyToken };
