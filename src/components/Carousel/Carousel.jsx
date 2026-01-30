import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Info } from 'lucide-react';
import './Carousel.css';

const Carousel = ({ games }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!games || games.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [games?.length]);

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

    if (!games || games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="carousel-wrapper fade-in">
            <div className="carousel-container glass-morphism">
                <div
                    className="carousel-slide"
                    key={currentGame.id}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${currentGame.background_image_additional || currentGame.background_image})`
                    }}
                >
                    <div className="carousel-info">
                        <div className="carousel-badge">Favoritos de la Comunidad</div>
                        <h1 className="carousel-title">{currentGame.name}</h1>
                        <div className="carousel-meta">
                            <span className="rating gold">
                                <Star size={16} fill="currentColor" />
                                {currentGame.rating}
                            </span>
                            <span className="release">{new Date(currentGame.released).getFullYear()}</span>
                        </div>
                        <p className="carousel-description">Un imprescindible que no puede faltar en tu biblioteca. ¡Descubre por qué nos encanta!</p>

                        <Link to={`/game/${currentGame.id}`} className="carousel-details-btn">
                            <Info size={18} />
                            <span>Ver Detalles</span>
                        </Link>
                    </div>
                </div>

                <button className="carousel-btn prev" onClick={goToPrev} aria-label="Anterior"><ChevronLeft size={30} /></button>
                <button className="carousel-btn next" onClick={goToNext} aria-label="Siguiente"><ChevronRight size={30} /></button>

                <div className="carousel-dots">
                    {games.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
