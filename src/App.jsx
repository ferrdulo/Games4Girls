import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Games from './pages/Games';
import Publishers from './pages/Publishers';
import GameDetails from './pages/GameDetails';
import PublisherDetails from './pages/PublisherDetails';
import Favorites from './pages/Favorites';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import { loadFavorites } from './redux/actions/gameActions';
import { loadJoinedEvents } from './redux/actions/eventActions';
import './App.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFavorites());
        dispatch(loadJoinedEvents());
    }, [dispatch]);

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/publishers" element={<Publishers />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/mis-favoritos" element={<Favorites />} />
                    <Route path="/eventos" element={<Events />} />
                    <Route path="/mis-eventos" element={<MyEvents />} />

                    <Route path="/game/:id" element={<GameDetails />} />
                    <Route path="/publisher/:id" element={<PublisherDetails />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
