import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import CursorFollower from '../components/CursorFollower/CursorFollower';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <CursorFollower />
            <main className="main-content">
                {children}
            </main>
            <footer className="footer animate-on-scroll">
                <div className="footer-container">
                    <div className="footer-brand">
                        <h2 className="text-gradient">Games4Girls</h2>
                        <p>El rincón más glamuroso, diverso y divertido para gamers con estilo.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Navegación</h4>
                            <a href="/">Inicio</a>
                            <a href="/games">Biblioteca</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} <span className="text-gradient">Games4Girls</span>. Creado con cariño y un toque de glamour.</p>
                    <p className="powered-by">Datos proporcionados por <a href="https://rawg.io" target="_blank" rel="noreferrer">RAWG</a></p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
