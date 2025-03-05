export const fetchFinancialData = async () => {
    try {
        const response = await fetch("https://api.example.com/financial"); // Trocar para uma API real
        const data = await response.json();
        return {
            mainIndex: data.marketIndex,
            variation: data.changePercentage,
            volume: data.marketVolume,
        };
    } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
        throw error;
    }
};
