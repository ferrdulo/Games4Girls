import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('g4g_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('g4g_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (game) => {
        setFavorites(prev => {
            const isFav = prev.some(f => f.id === game.id);
            if (isFav) {
                return prev.filter(f => f.id !== game.id);
            } else {
                return [...prev, game];
            }
        });
    };

    const isFavorite = (id) => {
        return favorites.some(f => f.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
