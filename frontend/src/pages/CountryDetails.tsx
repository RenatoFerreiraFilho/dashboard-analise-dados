import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CountryDetails.css";

const CountryDetails = () => {
    const { countryCode } = useParams(); // Obtém o código do país na URL
    const [country, setCountry] = useState(null);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then((res) => res.json())
            .then((data) => {
                setCountry(data[0]); // O retorno da API é um array com um único país
            })
            .catch((error) => console.error("Erro ao buscar detalhes do país:", error));
    }, [countryCode]);

    if (!country) {
        return <div className="loading">Carregando...</div>;
    }

    // Cálculo de densidade populacional
    const density = (country.population / country.area).toFixed(2);

    return (
        <div className="country-details">
            <button className="back-button" onClick={() => window.history.back()}>
                Voltar
            </button>

            <h1>{country.name.common}</h1>
            <img src={country.flags.svg} alt={`Bandeira de ${country.name.common}`} className="flag" />

            <div className="details-grid">
                <p>
                    <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </p>
                <p>
                    <strong>População:</strong> {country.population.toLocaleString()}
                </p>
                <p>
                    <strong>Área:</strong> {country.area.toLocaleString()} km²
                </p>
                <p>
                    <strong>Densidade Populacional:</strong> {density} hab/km²
                </p>
                <p>
                    <strong>Continente:</strong> {country.region}
                </p>
                <p>
                    <strong>Sub-região:</strong> {country.subregion || "N/A"}
                </p>
                <p>
                    <strong>Moeda:</strong> {Object.values(country.currencies || {})[0]?.name || "N/A"}
                </p>
                <p>
                    <strong>Idiomas:</strong> {Object.values(country.languages || {}).join(", ") || "N/A"}
                </p>
                <p>
                    <strong>Fuso Horário:</strong> {country.timezones.join(", ")}
                </p>
                <p>
                    <strong>Domínio de Internet:</strong> {country.tld?.[0] || "N/A"}
                </p>
                <p>
                    <strong>Código Telefônico:</strong> +{country.idd?.root?.replace("+", "") || ""}
                    {country.idd?.suffixes?.join(", ") || "N/A"}
                </p>
                <p>
                    <strong>Fronteiras:</strong> {country.borders ? country.borders.join(", ") : "Nenhuma"}
                </p>
            </div>
        </div>
    );
};

export default CountryDetails;
