import React from 'react';
import { NavLink } from 'react-router-dom';
import { Gamepad2, Search, Home, Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar glass-morphism">
            <div className="navbar-container">
                <div className="navbar-brand-wrapper">
                    <NavLink to="/" className="navbar-logo">
                        <Gamepad2 size={32} className="logo-icon" />
                        <span>Games4Girls</span>
                    </NavLink>
                </div>

                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Home size={20} />
                        <span>Inicio</span>
                    </NavLink>
                    <NavLink to="/games" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Search size={20} />
                        <span>Juegos</span>
                    </NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Heart size={20} />
                        <span>Favoritos</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
