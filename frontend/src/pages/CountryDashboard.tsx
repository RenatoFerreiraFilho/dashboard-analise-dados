import React, { useState, useEffect } from "react";
import "./CountryDashboard.css";

const CountryDashboard = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setFilteredCountries(data);
            })
            .catch((error) => console.error("Erro ao buscar países:", error));
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredCountries(filtered);
        } else {
            setFilteredCountries(countries);
        }
    }, [searchTerm, countries]);

    return (
        <div className="country-dashboard">
            <button className="back-button" onClick={() => window.history.back()}>
                Voltar
            </button>

            <h1>Dashboard de Países 🌍</h1>

            <input type="text" placeholder="Pesquisar país..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-box" />

            <div className="countries-list">
                {filteredCountries.map((country) => (
                    <div key={country.cca3} className="country-card">
                        <img src={country.flags.svg} alt={`Bandeira de ${country.name.common}`} />
                        <h3>{country.name.common}</h3>
                        <p>População: {country.population.toLocaleString()}</p>
                        <p>Área: {country.area.toLocaleString()} km²</p>
                        <p>Região: {country.region}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryDashboard;
