import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { searchGames, getPopularGames, getGamesByCategory } from '../services/api';
import GameCard from '../components/GameCard/GameCard';
import './Explore.css';

const Explore = () => {
    const [searchParams] = useSearchParams();
    const genreParam = searchParams.get('genre');

    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultsFor, setResultsFor] = useState('Juegos Populares');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (genreParam) {
                    const data = await getGamesByCategory(genreParam);
                    setGames(data.results);
                    setResultsFor(`Categoría: ${genreParam.charAt(0).toUpperCase() + genreParam.slice(1)}`);
                } else {
                    const data = await getPopularGames();
                    setGames(data.results);
                    setResultsFor('Juegos Populares');
                }
            } catch (error) {
                console.error("Error al obtener los datos", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [genreParam]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            const data = await searchGames(searchTerm);
            setGames(data.results);
            setResultsFor(`Resultados para "${searchTerm}"`);
        } catch (error) {
            console.error("Error al buscar juegos", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="explore-page fade-in">
            <header className="explore-header">
                <h1 className="page-title">Explorar</h1>
                <form className="search-bar-container glass-morphism" onSubmit={handleSearch}>
                    <SearchIcon className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Busca cualquier juego..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </header>

            <main className="explore-content">
                <div className="content-meta">
                    <h2 className="results-label">{resultsFor}</h2>
                    <button className="filter-button glass-morphism">
                        <Filter size={18} />
                        <span>Filtros</span>
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="games-grid">
                        {games.length > 0 ? (
                            games.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))
                        ) : (
                            <p className="no-results">No se encontraron juegos. Intenta con otro término.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Explore;
