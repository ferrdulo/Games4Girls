import React, { useEffect, useState } from 'react';
import { getPopularGames, getCoopGames } from '../services/api';
import GameCard from '../components/GameCard/GameCard';
import Carousel from '../components/Carousel/Carousel';
import './Home.css';

const Home = () => {
    const [games, setGames] = useState([]);
    const [coopGames, setCoopGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchGames = async (page = 1) => {
        setLoading(true);
        try {
            const [popularData, coopData] = await Promise.all([
                getPopularGames(page),
                page === 1 ? getCoopGames() : Promise.resolve(null)
            ]);

            setGames(popularData.results);
            if (coopData) setCoopGames(coopData.results);

            // RAWG API proporciona 'count' para el total de resultados
            const pageSize = 12;
            setTotalPages(Math.ceil(popularData.count / pageSize));
            setCurrentPage(page);
        } catch (error) {
            console.error("No se pudo obtener los juegos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && currentPage > 1) {
            const section = document.querySelector('.games-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, currentPage]);

    useEffect(() => {
        fetchGames(1);
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchGames(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            fetchGames(currentPage - 1);
        }
    };

    const handleGoToStart = () => {
        fetchGames(1);
    };

    const handleGoToEnd = () => {
        fetchGames(totalPages);
    };

    if (loading && currentPage === 1) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Cargando los últimos juegos...</p>
            </div>
        );
    }

    return (
        <div className="home-page fade-in">
            <section className="hero-simple">
                <h1 className="hero-title">Descubre tu Próxima <span className="text-gradient">Aventura</span></h1>
                <p className="hero-subtitle">Explora miles de juegos en todas las plataformas.</p>
            </section>

            <Carousel games={coopGames} />

            <section className="games-section">
                <h2 className="section-title">Tendencias Actuales</h2>

                {loading ? (
                    <div className="loading-container mini">
                        <div className="loader mini"></div>
                    </div>
                ) : (
                    <>
                        <div className="games-grid">
                            {games.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>

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
                    </>
                )}
            </section>
        </div>
    );
};

export default Home;
