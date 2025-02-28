import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const dashboards = [
        { name: "📈 Mercado Financeiro", path: "/finance" },
        { name: "🌍 Clima Global", path: "/weather" },
        { name: "📊 Países e Estatísticas", path: "/countries" },
        { name: "🏀 Dados Esportivos", path: "/leagues" },
    ];

    return (
        <div className="home-container">
            <h1>Menu de Seleção</h1>
            <div className="dashboard-list">
                {dashboards.map((dash) => (
                    <Link key={dash.path} to={dash.path} className="dashboard-option">
                        {dash.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
