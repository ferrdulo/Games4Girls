import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getPublisherDetails, getPublisherGames } from '../services/service';
import { ArrowLeft, Globe, Gamepad2, Users } from 'lucide-react';
import GameCard from '../components/GameCard/GameCard';
import './PublisherDetails.css';

const PublisherDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get('page')) || 1;

    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(pageParam);
    const [totalPages, setTotalPages] = useState(0);

    const fetchPublisherInfo = async () => {
        try {
            const details = await getPublisherDetails(id);
            setPublisher(details);
        } catch (error) {
            console.error("Error al obtener detalles del distribuidor:", error);
        }
    };

    const fetchGames = async (page = pageParam) => {
        setLoading(true);
        try {
            const gamesData = await getPublisherGames(id, page);
            setGames(gamesData.results);
            setTotalPages(Math.ceil(gamesData.count / 12));
            setCurrentPage(page);
        } catch (error) {
            console.error("Error al obtener juegos del distribuidor:", error);
        } finally {
            setLoading(false);
        }
    };

    // Solo cargar info básica al montar o cambiar el ID
    useEffect(() => {
        fetchPublisherInfo();
        window.scrollTo(0, 0);
    }, [id]);

    // Cargar juegos al cambiar página o ID
    useEffect(() => {
        fetchGames(pageParam);
    }, [id, pageParam]);

    const handlePageChange = (newPage) => {
        const params = Object.fromEntries(searchParams.entries());
        setSearchParams({ ...params, page: newPage });
    };

    if (loading && !publisher) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Cargando información del distribuidor...</p>
            </div>
        );
    }

    if (!publisher) return <p className="error-msg">Distribuidor no encontrado :(</p>;

    return (
        <div className="publisher-page fade-in">
            <div className="publisher-hero" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), var(--bg-dark)), url(${publisher.image_background})`
            }}>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                    <span>Volver</span>
                </button>

                <div className="publisher-hero-content">
                    <h1 className="publisher-title">{publisher.name}</h1>
                    <div className="publisher-stats-row">
                        <span className="stat-item">
                            <Gamepad2 size={20} />
                            {publisher.games_count} Juegos distribuidores
                        </span>
                        {publisher.positions && publisher.positions.length > 0 && (
                            <span className="stat-item">
                                <Users size={20} />
                                {publisher.positions.map(p => p.name).join(', ')}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="publisher-container">
                <div className="publisher-grid-layout">
                    <div className="publisher-info-main">
                        <section className="publisher-section">
                            <h2 className="section-title">Sobre {publisher.name}</h2>
                            <div
                                className="description-content"
                                dangerouslySetInnerHTML={{ __html: publisher.description || 'No hay descripción disponible para este distribuidor.' }}
                            />
                        </section>

                        <section className="publisher-section">
                            <h2 className="section-title">Catálogo de Juegos</h2>
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

                                    {totalPages > 1 && (
                                        <div className="pagination-container">
                                            <span className="page-info">
                                                Página <span className="current-page">{currentPage}</span> de <span className="total-pages">{totalPages}</span>
                                            </span>
                                            <div className="pagination-actions">
                                                {currentPage > 1 && (
                                                    <button className="pagination-btn prev" onClick={() => handlePageChange(currentPage - 1)}>
                                                        Anterior
                                                    </button>
                                                )}
                                                {currentPage < totalPages && (
                                                    <button className="pagination-btn next" onClick={() => handlePageChange(currentPage + 1)}>
                                                        Siguiente
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublisherDetails;
