import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Gamepad2, Search, Home, Heart, Users, User, Calendar } from 'lucide-react';

import './Navbar.css';

const Navbar = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);

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
                    <NavLink to="/publishers" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Users size={20} />
                        <span>Distribuidores</span>
                    </NavLink>
                    <NavLink to="/eventos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Calendar size={20} />
                        <span>Eventos</span>
                    </NavLink>

                    <div className="user-profile-menu">
                        <button
                            className="nav-item user-btn"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <User size={24} />
                        </button>

                        {showUserMenu && (
                            <div className="user-dropdown glass-morphism">
                                <NavLink to="/mis-favoritos" onClick={() => setShowUserMenu(false)}>
                                    <Heart size={18} />
                                    <span>Mis Favoritos</span>
                                </NavLink>
                                <NavLink to="/mis-eventos" onClick={() => setShowUserMenu(false)}>
                                    <Calendar size={18} />
                                    <span>Mis Eventos</span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
