import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchLeagueTeams } from "../services/sportsAPI";
import "./LeagueDetails.css";

const LeagueDetails = () => {
    const { leagueId } = useParams();
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const leagueName = decodeURIComponent(leagueId);

    useEffect(() => {
        const loadTeams = async () => {
            setTeams([]);
            const teamsData = await fetchLeagueTeams(leagueName);
            setTeams(teamsData);
        };
        loadTeams();
    }, [leagueName]);

    return (
        <div className="league-details">
            <div className="league-back-container">
                <button className="league-back-button" onClick={() => navigate(-1)}>
                    ⬅ Voltar
                </button>
            </div>

            <h1>{leagueName}</h1>

            {teams.length > 0 ? (
                <div className="teams-table">
                    <h2>Times da Liga</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Estádio</th>
                                <th>Cidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr key={team.idTeam} className="clickable-row">
                                    <td>
                                        <Link to={`/teams/${encodeURIComponent(team.strTeam)}`}>{team.strTeam}</Link>
                                    </td>
                                    <td>{team.strStadium || "N/A"}</td>
                                    <td>{team.strLocation || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Carregando times...</p>
            )}
        </div>
    );
};

export default LeagueDetails;
