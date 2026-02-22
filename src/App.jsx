import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Games from './pages/Games';
import Publishers from './pages/Publishers';
import GameDetails from './pages/GameDetails';

import PublisherDetails from './pages/PublisherDetails';
import Favorites from './pages/Favorites';

import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <FavoritesProvider>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/publishers" element={<Publishers />} />
                        <Route path="/favorites" element={<Favorites />} />

                        <Route path="/game/:id" element={<GameDetails />} />
                        <Route path="/publisher/:id" element={<PublisherDetails />} />
                    </Routes>

                </MainLayout>
            </FavoritesProvider>
        </Router>
    );
}

export default App;
