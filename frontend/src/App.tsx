import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FinanceDashboard from "./pages/FinanceDashboard";
import WeatherDashboard from "./pages/WeatherDashboard"; // Importando o novo dashboard

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/finance" element={<FinanceDashboard />} />
                <Route path="/weather" element={<WeatherDashboard />} /> {/* Adicionando rota */}
            </Routes>
        </Router>
    );
}

export default App;
