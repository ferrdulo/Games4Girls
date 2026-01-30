import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Monitor, Smartphone, Cpu, Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import './GameCard.css';

const GameCard = ({ game }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(game.id);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(game);
    };

    const getPlatformIcon = (slug) => {
        if (slug.includes('pc')) return <Monitor size={14} />;
        if (slug.includes('playstation')) return <Cpu size={14} />;
        if (slug.includes('xbox')) return <Cpu size={14} />;
        if (slug.includes('android') || slug.includes('ios')) return <Smartphone size={14} />;
        return null;
    };

    return (
        <Link to={`/game/${game.id}`} className="game-card fade-in">
            <div className="card-image-container">
                <img src={game.background_image} alt={game.name} className="card-image" loading="lazy" />
                <div className="card-overlay">
                    <button
                        className={`favorite-btn ${isFav ? 'is-favorite' : ''}`}
                        onClick={handleFavorite}
                        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                    </button>
                    <div className="rating">
                        <Star size={14} fill="currentColor" />
                        <span>{game.rating}</span>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <div className="platforms">
                    {game.parent_platforms?.slice(0, 4).map(({ platform }) => (
                        <span key={platform.id} className="platform-icon" title={platform.name}>
                            {getPlatformIcon(platform.slug)}
                        </span>
                    ))}
                </div>
                <h3 className="game-title">{game.name}</h3>
                <div className="game-info">
                    <span className="release-date">{new Date(game.released).getFullYear()}</span>
                    <span className="genre">{game.genres?.[0]?.name}</span>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
