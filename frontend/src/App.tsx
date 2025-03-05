import React, { useState } from "react"; // Adicionando a importação correta
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FinanceDashboard from "./pages/FinanceDashboard";
import WeatherDashboard from "./pages/WeatherDashboard";
import CountryDashboard from "./pages/CountryDashboard";
import CountryDetails from "./pages/CountryDetails";
import LeaguesMenu from "./pages/LeaguesMenu";
import LeagueDetails from "./pages/LeagueDetails";
import TeamDetails from "./pages/TeamDetails";
import UserMenu from "./components/UserMenu";

function App() {
    const [user, setUser] = useState({
        name: "Renato Ferreira",
        email: "renato@example.com",
    });

    const handleLogout = () => {
        console.log("Usuário deslogado");
        // Aqui você pode redirecionar para a página de login ou remover token
    };

    return (
        <Router>
            {/* Botão suspenso do usuário */}
            <UserMenu user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/finance" element={<FinanceDashboard />} />
                <Route path="/weather" element={<WeatherDashboard />} />
                <Route path="/countries" element={<CountryDashboard />} />
                <Route path="/countries/:countryCode" element={<CountryDetails />} />
                <Route path="/leagues" element={<LeaguesMenu />} />
                <Route path="/leagues/:leagueId" element={<LeagueDetails />} />
                <Route path="/teams/:teamName" element={<TeamDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
