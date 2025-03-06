import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:4000/api/auth/register", {
                username,
                email,
                password,
            });

            setSuccess("Cadastro realizado com sucesso! Redirecionando para login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-overlay">
                <h2>Cadastro</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="register-submit" type="submit">
                        Cadastrar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <p>
                    Já tem uma conta? <a href="/login">Faça login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
