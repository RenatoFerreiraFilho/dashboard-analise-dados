import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FinanceDashboard from "./pages/FinanceDashboard";
import WeatherDashboard from "./pages/WeatherDashboard";
import CountryDashboard from "./pages/CountryDashboard";
import CountryDetails from "./pages/CountryDetails";
import LeaguesMenu from "./pages/LeaguesMenu";
import LeagueDetails from "./pages/LeagueDetails";
import TeamDetails from "./pages/TeamDetails";
import Login from "./pages/Login";
import UserMenu from "./components/UserMenu";
import axios from "axios";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:4000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data.user))
                .catch(() => localStorage.removeItem("token"));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <Router>
            {user && <UserMenu user={user} onLogout={handleLogout} />}
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                <Route path="/finance" element={user ? <FinanceDashboard /> : <Navigate to="/login" />} />
                <Route path="/weather" element={user ? <WeatherDashboard /> : <Navigate to="/login" />} />
                <Route path="/countries" element={user ? <CountryDashboard /> : <Navigate to="/login" />} />
                <Route path="/countries/:countryCode" element={user ? <CountryDetails /> : <Navigate to="/login" />} />
                <Route path="/leagues" element={user ? <LeaguesMenu /> : <Navigate to="/login" />} />
                <Route path="/leagues/:leagueId" element={user ? <LeagueDetails /> : <Navigate to="/login" />} />
                <Route path="/teams/:teamName" element={user ? <TeamDetails /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
