import React from 'react';
import { Bookmark, PlusCircle } from 'lucide-react';
import './Library.css';

const Library = () => {
    return (
        <div className="library-page fade-in">
            <div className="library-empty">
                <div className="empty-icon-container glass-morphism">
                    <Bookmark size={48} className="empty-icon" />
                </div>
                <h1>Tu Biblioteca está vacía</h1>
                <p>Guarda los juegos a los que quieras jugar más tarde haciendo clic en el botón 'Añadir a la biblioteca' en cualquier juego.</p>
                <button className="browse-button">
                    <PlusCircle size={20} />
                    <span>Empezar a buscar</span>
                </button>
            </div>
        </div>
    );
};

export default Library;
