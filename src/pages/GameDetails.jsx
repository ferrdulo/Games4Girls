import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameDetails, getGameScreenshots, getRelatedGames } from '../services/api';
import { Star, Calendar, ArrowLeft, Users, Globe, Building2, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import GameCard from '../components/GameCard/GameCard';
import './GameDetails.css';

const GameDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(parseInt(id));
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [relatedGames, setRelatedGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [details, screenData] = await Promise.all([
                    getGameDetails(id),
                    getGameScreenshots(id)
                ]);
                setGame(details);
                setScreenshots(screenData.results);

                // Fetch related games based on genres
                if (details.genres && details.genres.length > 0) {
                    const genreIds = details.genres.map(g => g.id).join(',');
                    const related = await getRelatedGames(genreIds, id);
                    setRelatedGames(related.results);
                }
            } catch (error) {
                console.error("Error al obtener los detalles del juego", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Cargando información del juego...</p>
            </div>
        );
    }

    if (!game) return <p className="error-msg">Juego no encontrado :(</p>;

    return (
        <div className="details-page fade-in">
            <div className="details-hero" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), var(--bg-dark)), url(${game.background_image_additional || game.background_image})`
            }}>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                    <span>Volver</span>
                </button>

                <div className="details-hero-content">
                    <div className="hero-flex">
                        <img src={game.background_image} alt={game.name} className="details-cover fade-in" />
                        <div className="hero-text">
                            <h1 className="details-title">{game.name}</h1>
                            <div className="details-meta-row">
                                <span className="rating gold">
                                    <Star size={18} fill="currentColor" />
                                    {game.rating} / 5
                                </span>
                                <span className="meta-info">
                                    <Calendar size={18} />
                                    {new Date(game.released).toLocaleDateString()}
                                </span>
                                <button
                                    className={`favorite-btn-details ${isFav ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(game)}
                                    title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                                >
                                    <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                                    <span>{isFav ? 'En mi Colección' : 'Añadir a Favoritos'}</span>
                                </button>
                            </div>
                            <div className="tags-container">
                                {game.genres?.map(g => (
                                    <span key={g.id} className="genre-tag">{g.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="details-container">
                <div className="details-grid">
                    <div className="details-main">
                        <section className="details-section">
                            <h2 className="section-title">Descripción</h2>
                            <div
                                className="description-content"
                                dangerouslySetInnerHTML={{ __html: game.description }}
                            />
                        </section>

                        <section className="details-section">
                            <h2 className="section-title">Galería de Imágenes</h2>
                            <div className="screenshots-grid-large">
                                {screenshots.slice(0, 6).map(screen => (
                                    <div key={screen.id} className="screenshot-item">
                                        <img src={screen.image} alt="Captura de pantalla" className="screenshot-img" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="details-sidebar">
                        <div className="sidebar-card glass-morphism">
                            <h3>Ficha Técnica</h3>
                            <div className="sidebar-item">
                                <Users size={18} className="sidebar-icon" />
                                <div>
                                    <span className="label">Plataformas</span>
                                    <span className="value">{game.platforms?.map(p => p.platform.name).join(', ')}</span>
                                </div>
                            </div>
                            <div className="sidebar-item">
                                <Building2 size={18} className="sidebar-icon" />
                                <div>
                                    <span className="label">Desarrollador</span>
                                    <span className="value">{game.developers?.map(d => d.name).join(', ') || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="sidebar-item">
                                <Globe size={18} className="sidebar-icon" />
                                <div>
                                    <span className="label">Sitio Web</span>
                                    <a href={game.website} target="_blank" rel="noreferrer" className="value link">
                                        {game.name} Oficial
                                    </a>
                                </div>
                            </div>

                            <div className="publisher-info">
                                <span className="label">Distribuidor</span>
                                <span className="value">{game.publishers?.map(p => p.name).join(', ') || 'N/A'}</span>
                            </div>
                        </div>
                    </aside>
                </div>

                {relatedGames.length > 0 && (
                    <section className="related-section">
                        <h2 className="section-title">Juegos Relacionados</h2>
                        <div className="related-grid">
                            {relatedGames.slice(0, 5).map(g => (
                                <GameCard key={g.id} game={g} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default GameDetails;
