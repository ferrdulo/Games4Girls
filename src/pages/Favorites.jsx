import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameCard from '../components/GameCard/GameCard';
import { Heart, Sparkles } from 'lucide-react';
import './Favorites.css';

const Favorites = () => {
    const { favorites } = useSelector(state => state.games);

    return (
        <div className="favorites-page">
            <header className="favorites-header">
                <h1 className="page-title text-gradient">Mi Colección Glam</h1>
                <p className="subtitle">Tus juegos favoritos guardados con amor 💖</p>
            </header>

            {favorites.length === 0 ? (
                <div className="empty-favorites glass-morphism animate-on-scroll">
                    <Heart className="empty-icon" size={64} />
                    <h2>Aún no tienes juegos guardados</h2>
                    <p>Explora la biblioteca y haz clic en el ♥ en los juegos que te gusten ✨</p>
                    <Link to="/games" className="explore-btn">
                        <Sparkles size={20} />
                        Descubrir juegos
                    </Link>
                </div>
            ) : (
                <div className="favorites-grid grid">
                    {favorites.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
