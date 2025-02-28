const API_KEY = import.meta.env.VITE_SPORTS_API_KEY;
const BASE_URL = "https://www.thesportsdb.com/api/v1/json";

export const fetchLeagues = async () => {
    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/all_leagues.php`);
        const data = await response.json();

        if (!data.leagues || data.leagues.length === 0) {
            throw new Error("Nenhuma liga encontrada.");
        }

        return data.leagues; // Retorna um array de ligas
    } catch (error) {
        console.error("Erro ao buscar as ligas:", error);
        return [];
    }
};

export const fetchLeagueDetails = async (leagueId) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id=${leagueId}`);
        const data = await response.json();
        return data.leagues ? data.leagues[0] : null;
    } catch (error) {
        console.error("Erro ao buscar detalhes da liga:", error);
        return null;
    }
};

export const fetchLeagueTeams = async (leagueName) => {
    try {
        const formattedLeagueName = encodeURIComponent(leagueName);
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${formattedLeagueName}`);
        const data = await response.json();
        return data.teams || [];
    } catch (error) {
        console.error("Erro ao buscar times da liga:", error);
        return [];
    }
};

export const fetchTeamDetails = async (teamName) => {
    try {
        const formattedTeamName = encodeURIComponent(teamName);
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${formattedTeamName}`);
        const data = await response.json();
        return data.teams ? data.teams[0] : null;
    } catch (error) {
        console.error("Erro ao buscar detalhes do time:", error);
        return null;
    }
};
