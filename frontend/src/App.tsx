import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FinanceDashboard from "./pages/FinanceDashboard";
import WeatherDashboard from "./pages/WeatherDashboard";
import CountryDashboard from "./pages/CountryDashboard";
import CountryDetails from "./pages/CountryDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/finance" element={<FinanceDashboard />} />
                <Route path="/weather" element={<WeatherDashboard />} />
                <Route path="/countries" element={<CountryDashboard />} />
                <Route path="/countries/:countryCode" element={<CountryDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
