import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./WeatherDashboard.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Mapear imagens de fundo para diferentes tipos de clima
const weatherBackgrounds: { [key: string]: string } = {
    Clear: "/images/sunny.webp",
    Clouds: "/images/cloudy.webp",
    Rain: "/images/rainy.webp",
    Snow: "/images/snowy.webp",
    Mist: "/images/foggy.webp",
    Fog: "/images/foggy.webp",
    Thunderstorm: "/images/thunderstorm.webp",
    Drizzle: "/images/drizzle.webp",
    Default: "/images/default.webp", // Fundo padrão caso o clima não seja identificado
};

const WeatherDashboard = () => {
    const [city, setCity] = useState("São Paulo");
    const [weatherData, setWeatherData] = useState<any>(null);
    const [forecastData, setForecastData] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWeatherData(city);
        fetchForecastData(city);
    }, [city]);

    const fetchWeatherData = (cityName: string) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then((response) => setWeatherData(response.data))
            .catch((error) => console.error("Erro ao buscar dados do clima:", error));
    };

    const fetchForecastData = (cityName: string) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                const formattedData = response.data.list.map((entry: any) => ({
                    time: entry.dt_txt.split(" ")[1].slice(0, 5),
                    temp: entry.main.temp,
                    wind: entry.wind.speed,
                    humidity: entry.main.humidity,
                    pressure: entry.main.pressure,
                }));
                setForecastData(formattedData.slice(0, 8));
            })
            .catch((error) => console.error("Erro ao buscar previsão:", error));
    };

    const getWeatherIcon = (weather: string) => {
        switch (weather) {
            case "Clear":
                return <WiDaySunny size={80} />;
            case "Clouds":
                return <WiCloud size={80} />;
            case "Rain":
                return <WiRain size={80} />;
            case "Snow":
                return <WiSnow size={80} />;
            case "Fog":
            case "Mist":
                return <WiFog size={80} />;
            default:
                return <WiCloud size={80} />;
        }
    };

    // Pegar a condição do clima atual e definir a imagem de fundo correspondente
    const weatherCondition = weatherData?.weather[0].main || "Default";
    const backgroundImage = weatherBackgrounds[weatherCondition] || weatherBackgrounds["Default"];

    return (
        <div className="weather-dashboard" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <button className="back-button" onClick={() => navigate("/")}>
                ⬅ Voltar
            </button>
            <h1>🌍 Clima Global</h1>

            <div className="search-container">
                <input type="text" placeholder="Digite uma cidade..." value={city} onChange={(e) => setCity(e.target.value)} />
                <button
                    onClick={() => {
                        fetchWeatherData(city);
                        fetchForecastData(city);
                    }}
                >
                    🔍 Buscar
                </button>
            </div>

            {weatherData && (
                <div className="weather-info">
                    <h2>
                        {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    {getWeatherIcon(weatherData.weather[0].main)}
                    <p>
                        <strong>🌡 Temperatura:</strong> {weatherData.main.temp}°C
                    </p>
                    <p>
                        <strong>💨 Vento:</strong> {weatherData.wind.speed} m/s
                    </p>
                    <p>
                        <strong>🌫 Umidade:</strong> {weatherData.main.humidity}%
                    </p>
                    <p>
                        <strong>📡 Pressão:</strong> {weatherData.main.pressure} hPa
                    </p>
                    <p>
                        <strong>📝 Condição:</strong> {weatherData.weather[0].description}
                    </p>
                </div>
            )}

            {/* Gráfico de Temperatura */}
            <div className="chart-container">
                <h3>📈 Variação da Temperatura</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={forecastData}>
                        <XAxis dataKey="time" stroke="white" />
                        <YAxis stroke="white" />
                        <Tooltip />
                        <Line type="monotone" dataKey="temp" stroke="#ffcc00" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Comparação Climática */}
            <div className="chart-container">
                <h3>🌡 Comparação de Clima</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={forecastData}>
                        <XAxis dataKey="time" stroke="white" />
                        <YAxis stroke="white" />
                        <Tooltip />
                        <Bar dataKey="wind" fill="#4caf50" name="Vento (m/s)" />
                        <Bar dataKey="humidity" fill="#ff6b6b" name="Umidade (%)" />
                        <Bar dataKey="pressure" fill="#8884d8" name="Pressão (hPa)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeatherDashboard;
