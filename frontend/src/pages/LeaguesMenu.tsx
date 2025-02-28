import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchLeagues } from "../services/sportsAPI";
import "./LeaguesMenu.css";

const LeaguesMenu = () => {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const loadLeagues = async () => {
            const leaguesData = await fetchLeagues();
            setLeagues(leaguesData);
        };
        loadLeagues();
    }, []);

    return (
        <div className="leagues-menu">
            {/* Botão de Voltar */}
            <div className="leagues-back-container">
                <button className="leagues-back-button" onClick={() => navigate(-1)}>
                    ⬅ Voltar
                </button>
            </div>

            <h1>Escolha uma Liga</h1>

            {/* Grid para exibir os cards das ligas */}
            <div className="leagues-grid">
                {leagues.map((league) => (
                    <Link key={league.idLeague} to={`/leagues/${encodeURIComponent(league.strLeague)}`} className="league-card">
                        <div className="league-card-content">
                            <h3>{league.strLeague}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LeaguesMenu;
