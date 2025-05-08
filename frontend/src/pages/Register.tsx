import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const [step, setStep] = useState(1); // 1 = Cadastro, 2 = Verificação do código
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                username,
                email,
                password,
            });

            setSuccess(response.data.message);
            setTimeout(() => setStep(2), 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Erro ao cadastrar. Tente novamente.");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await axios.post(`${API_BASE_URL}/api/auth/verify-email`, {
                email,
                code: verificationCode,
            });

            setSuccess("Cadastro confirmado com sucesso! Redirecionando para login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Código inválido. Tente novamente.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-overlay">
                {step === 1 ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <h2>Verificação de E-mail</h2>
                        <p>Insira o código enviado para {email}:</p>
                        <form onSubmit={handleVerifyCode}>
                            <input type="text" placeholder="Código de verificação" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                            <button className="register-submit" type="submit">
                                Verificar
                            </button>
                        </form>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </>
                )}
                <p>
                    Já tem uma conta? <a href="/login">Faça login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
