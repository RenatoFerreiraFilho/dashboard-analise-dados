import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importando para navegação
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./FinanceDashboard.css";

const FinanceDashboard = () => {
    const [data, setData] = useState<any[]>([]);
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        axios
            .get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then((response) => {
                const rates = response.data.rates;
                const formattedData = Object.entries(rates).map(([currency, value]) => ({
                    name: currency,
                    value,
                }));
                setData(formattedData);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, [baseCurrency]);

    const availableCurrencies = ["USD", "EUR", "BRL", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"];
    const filteredData = data.slice(0, limit);

    return (
        <div className="finance-dashboard">
            {/* Botão de Voltar */}
            <button className="back-button" onClick={() => navigate("/")}>
                ⬅ Voltar
            </button>

            <h1>📈 Cotações do Mercado Financeiro</h1>

            <div className="filters">
                <label>Escolha a moeda base:</label>
                <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                    {availableCurrencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                <label>Quantidade de moedas exibidas:</label>
                <input type="number" value={limit} min={1} max={data.length} onChange={(e) => setLimit(Number(e.target.value))} />
            </div>

            <div className="chart-container">
                <h3>📊 Comparação de Moedas</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                        <XAxis dataKey="name" stroke="white" />
                        <YAxis stroke="white" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4caf50" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>📈 Evolução das Cotações</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <XAxis dataKey="name" stroke="white" />
                        <YAxis stroke="white" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#ffcc00" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>🍕 Distribuição das Moedas</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={filteredData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                            {filteredData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b"][index % 4]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FinanceDashboard;
