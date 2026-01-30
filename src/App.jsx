import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
    return (
        <Router>
            <FavoritesProvider>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/game/:id" element={<GameDetails />} />
                    </Routes>
                </MainLayout>
            </FavoritesProvider>
        </Router>
    );
}

export default App;
