const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendVerificationEmail = require("../utils/emailService");

const secretKey = process.env.JWT_SECRET;

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({ error: "Usuário já existe!" });
            } else {
                // Se o usuário não verificou o e-mail, gere um novo código e reenvie
                const verificationCode = generateVerificationCode();
                existingUser.verificationCode = verificationCode;
                await existingUser.save();

                await sendVerificationEmail(email, verificationCode); // 🔹 Reenvia o e-mail

                return res.status(200).json({ message: "Novo código de verificação enviado para o seu e-mail!" });
            }
        }

        // Criar um novo usuário caso ele ainda não exista
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationCode = generateVerificationCode();

        const newUser = new User({ username, email, password: hashedPassword, verificationCode });
        await newUser.save();

        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: "Cadastro realizado! Verifique seu e-mail." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Endpoint para verificar o código de ativação
router.post("/verify-email", async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Usuário não encontrado!" });

        if (user.isVerified) return res.status(400).json({ error: "E-mail já verificado!" });

        if (user.verificationCode !== code) return res.status(400).json({ error: "Código inválido!" });

        user.isVerified = true;
        user.verificationCode = null; // 🔹 Remove o código após a verificação
        await user.save();

        res.json({ message: "E-mail verificado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao verificar e-mail" });
    }
});

// Endpoint de login de usuário existente
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Usuário ou senha incorretos!" });

        if (!user.isVerified) return res.status(400).json({ error: "E-mail não verificado! Verifique seu e-mail antes de fazer login." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Usuário ou senha incorretos!" });

        const payload = { userId: user._id, email: user.email };

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
