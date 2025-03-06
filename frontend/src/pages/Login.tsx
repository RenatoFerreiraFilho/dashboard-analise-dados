import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);

                // Buscar os dados do usuário autenticado
                const userResponse = await axios.get("http://localhost:4000/api/auth/me", {
                    headers: { Authorization: `Bearer ${response.data.token}` },
                });

                setUser(userResponse.data);
                navigate("/"); // Redireciona para a Home após login
            } else {
                setError("Erro ao autenticar. Tente novamente.");
            }
        } catch (err) {
            setError("Usuário ou senha inválidos!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-overlay">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="login-button" type="submit">
                        Entrar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                <p>Ainda não tem uma conta?</p>
                <button className="register-button" onClick={() => navigate("/register")}>
                    Criar Conta
                </button>
            </div>
        </div>
    );
};

export default Login;
