import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeamDetails } from "../services/sportsAPI";
import "./TeamDetails.css";

const TeamDetails = () => {
    const { teamName } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const loadTeamDetails = async () => {
            const teamData = await fetchTeamDetails(decodeURIComponent(teamName));
            setTeam(teamData);
        };
        loadTeamDetails();
    }, [teamName]);

    return (
        <div className="team-details" style={{ backgroundImage: `url(${team?.strFanart1 || "/images/team-page-b.jpg"})` }}>
            <div className="team-back-container">
                <button className="team-back-button" onClick={() => navigate(-1)}>
                    ⬅ Voltar
                </button>
            </div>

            {team ? (
                <div className="team-info">
                    <h1>{team.strTeam}</h1>
                    <img src={team.strBadge || "/images/default.webp"} alt={`${team.strTeam} Logo`} className="team-logo" />
                    <p>
                        <strong>Estádio:</strong> {team.strStadium || "N/A"}
                    </p>
                    <p>
                        <strong>Cidade:</strong> {team.strLocation || "N/A"}
                    </p>
                    <p>
                        <strong>Ano de Fundação:</strong> {team.intFormedYear || "N/A"}
                    </p>
                </div>
            ) : (
                <p>Carregando informações do time...</p>
            )}
        </div>
    );
};

export default TeamDetails;
