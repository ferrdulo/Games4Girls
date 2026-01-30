import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchGames, getPopularGames } from '../services/api';
import GameCard from '../components/GameCard/GameCard';
import './Games.css';

const Games = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultsFor, setResultsFor] = useState('Juegos Populares');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchGamesData = async (page = 1, term = searchTerm) => {
        setLoading(true);
        try {
            let data;
            if (term.trim().length > 2) {
                data = await searchGames(term, page);
                setResultsFor(`Resultados para "${term}"`);
            } else {
                data = await getPopularGames(page);
                setResultsFor('Juegos Populares');
            }

            setGames(data.results);
            const pageSize = 12;
            setTotalPages(Math.ceil(data.count / pageSize));
            setCurrentPage(page);
        } catch (error) {
            console.error("Error al obtener juegos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchGamesData(1, searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        if (!loading && currentPage > 1) {
            const section = document.querySelector('.games-content');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchGamesData(1, searchTerm);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchGamesData(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            fetchGamesData(currentPage - 1);
        }
    };

    const handleGoToStart = () => {
        fetchGamesData(1);
    };

    const handleGoToEnd = () => {
        fetchGamesData(totalPages);
    };

    return (
        <div className="games-page fade-in">
            <header className="games-header">
                <h1 className="page-title">Biblioteca de Juegos</h1>
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

            <main className="games-content">
                <div className="content-meta">
                    <h2 className="results-label">{resultsFor}</h2>
                </div>

                {loading ? (
                    <div className="loading-container mini">
                        <div className="loader mini"></div>
                    </div>
                ) : (
                    <>
                        <div className="games-grid">
                            {games.length > 0 ? (
                                games.map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))
                            ) : (
                                <p className="no-results">No encontramos nada. Prueba con otra búsqueda.</p>
                            )}
                        </div>

                        {games.length > 0 && (
                            <div className="pagination-container">
                                <span className="page-info">
                                    Página <span className="current-page">{currentPage}</span> de <span className="total-pages">{totalPages}</span>
                                </span>

                                <div className="pagination-actions">
                                    <div className="pagination-group back">
                                        {currentPage > 1 && (
                                            <>
                                                <button
                                                    className="pagination-btn first"
                                                    onClick={handleGoToStart}
                                                >
                                                    <span className="btn-icon">↞</span>
                                                    Ir al Principio
                                                </button>
                                                <button
                                                    className="pagination-btn prev"
                                                    onClick={handlePrevPage}
                                                >
                                                    <span className="btn-icon">←</span>
                                                    Página Anterior
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="pagination-group forward">
                                        {currentPage < totalPages && (
                                            <>
                                                <button
                                                    className="pagination-btn next"
                                                    onClick={handleNextPage}
                                                >
                                                    Siguiente Página
                                                    <span className="btn-icon">→</span>
                                                </button>
                                                <button
                                                    className="pagination-btn end"
                                                    onClick={handleGoToEnd}
                                                >
                                                    Ir al Final
                                                    <span className="btn-icon">↠</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Games;
