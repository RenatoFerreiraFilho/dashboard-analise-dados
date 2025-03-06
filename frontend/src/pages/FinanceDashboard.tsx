import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FinanceDashboard.css";
import LoadingSpinner from "../components/LoadingSpinner";

const FinanceDashboard = () => {
    const navigate = useNavigate();
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then((response) => {
                const rates = response.data.rates;
                const formattedData = Object.entries(rates).map(([currency, value]) => ({
                    name: currency,
                    value,
                    inverseRate: 1 / value, // Taxa inversa
                    percentageChange: ((value - 1) * 100).toFixed(2), // Simulação de variação percentual
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
                setError("Erro ao carregar dados financeiros.");
                setLoading(false);
            });
    }, [baseCurrency]);

    return (
        <div className="financial-dashboard">
            {/* Botão de Voltar */}
            <div className="financial-back-container">
                <button className="financial-back-button" onClick={() => navigate(-1)}>
                    ⬅ Voltar
                </button>
            </div>

            <h1>Mercado Financeiro</h1>

            {/* Seleção de moeda base */}
            <div className="currency-selector">
                <label htmlFor="baseCurrency">Moeda Base:</label>
                <select id="baseCurrency" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                    <option value="USD">USD - Dólar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="BRL">BRL - Real</option>
                    <option value="GBP">GBP - Libra</option>
                </select>
            </div>

            {loading && <LoadingSpinner />}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="financial-content">
                    <div className="exchange-rates">
                        <h2>Taxas de Câmbio</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Moeda</th>
                                    <th>Valor</th>
                                    <th>Taxa Inversa</th>
                                    <th>Variação (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.value.toFixed(4)}</td>
                                        <td>{item.inverseRate.toFixed(4)}</td>
                                        <td className={parseFloat(item.percentageChange) >= 0 ? "positive" : "negative"}>{item.percentageChange}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceDashboard;
