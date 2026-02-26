import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon, X } from 'lucide-react';
import { fetchGames } from '../redux/actions/gameActions';
import * as api from '../services/service';

import GameCard from '../components/GameCard/GameCard';
import './Games.css';

const Games = () => {
    const dispatch = useDispatch();
    const { list: games, loading: reduxLoading } = useSelector(state => state.games);

    const [searchParams, setSearchParams] = useSearchParams();
    // ... rest of useSearchParams logic
    const genreFilter = searchParams.get('genre');
    const tagFilter = searchParams.get('tag');
    const genreName = searchParams.get('genreName');
    const tagName = searchParams.get('tagName');
    const queryParam = searchParams.get('search');
    const pageParam = parseInt(searchParams.get('page')) || 1;

    const [searchTerm, setSearchTerm] = useState(queryParam || '');
    const [localGames, setLocalGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultsFor, setResultsFor] = useState('Juegos Populares');
    const [currentPage, setCurrentPage] = useState(pageParam);
    const [totalPages, setTotalPages] = useState(0);

    const fetchGamesData = async (page = pageParam) => {
        setLoading(true);
        try {
            let data;
            const searchVal = queryParam || '';

            if (genreFilter) {
                data = await api.getFilteredGames({ genres: genreFilter }, page);
                setResultsFor(`Género: ${genreName || genreFilter}`);
                setLocalGames(data.results);
            } else if (tagFilter) {
                data = await api.getFilteredGames({ tags: tagFilter }, page);
                setResultsFor(`Etiqueta: ${tagName || tagFilter}`);
                setLocalGames(data.results);
            } else if (searchVal.trim().length > 2) {
                data = await api.searchGames(searchVal, page);
                setResultsFor(`Resultados para "${searchVal}"`);
                setLocalGames(data.results);
            } else {
                // For popular games, we use Redux
                dispatch(fetchGames(page));
                // We'll sync localGames with Redux list in a separate effect
                setResultsFor('Juegos Populares');
                return;
            }

            const pageSize = 12;
            setTotalPages(Math.ceil(data.count / pageSize));
            setCurrentPage(page);
        } catch (error) {
            console.error("Error al obtener juegos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!genreFilter && !tagFilter && !(queryParam && queryParam.trim().length > 2)) {
            setLocalGames(games);
            setLoading(reduxLoading);
            // Assuming total count for popular games is fixed or we don't care about it for now
            // In a real app, FETCH_GAMES_SUCCESS would also return totalPages
            setTotalPages(500); // RAWG default
        }
    }, [games, reduxLoading, genreFilter, tagFilter, queryParam]);

    // Efecto para reaccionar a cambios en URL (filtros, búsqueda o página)
    useEffect(() => {
        fetchGamesData(pageParam);
    }, [genreFilter, tagFilter, queryParam, pageParam]);

    // Sincronizar campo de búsqueda con la URL
    useEffect(() => {
        setSearchTerm(queryParam || '');
    }, [queryParam]);

    // Efecto para búsqueda con debounce (solo si no hay filtros aplicados)
    useEffect(() => {
        if (!genreFilter && !tagFilter) {
            const delayDebounceFn = setTimeout(() => {
                // Si el término de búsqueda cambia, reseteamos a página 1 en la URL si ya teníamos una búsqueda
                if (searchTerm.trim().length > 2 || searchTerm === '') {
                    updateParams({ page: 1, search: searchTerm || undefined });
                }
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (!loading && currentPage > 1) {
            const section = document.querySelector('.games-content');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, currentPage]);

    const updateParams = (newParams) => {
        const params = Object.fromEntries(searchParams.entries());
        const updated = { ...params, ...newParams };

        // Limpiar parámetros indefinidos o vacíos
        Object.keys(updated).forEach(key => {
            if (updated[key] === undefined || updated[key] === '') {
                delete updated[key];
            }
        });

        setSearchParams(updated);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateParams({ page: 1, search: searchTerm });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            updateParams({ page: currentPage + 1 });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            updateParams({ page: currentPage - 1 });
        }
    };

    const handleGoToStart = () => {
        updateParams({ page: 1 });
    };

    const handleGoToEnd = () => {
        updateParams({ page: totalPages });
    };

    const clearFilters = () => {
        setSearchParams({});
        setSearchTerm('');
    };

    return (
        <div className="games-page fade-in">
            <header className="games-header">
                <h1 className="page-title">Biblioteca de Juegos</h1>
                <form className="search-bar-container glass-morphism" onSubmit={handleSearch}>
                    <SearchIcon className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Busca cualquier juego..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </header>

            <main className="games-content">
                <div className="content-meta">
                    <h2 className="results-label">{resultsFor}</h2>
                    {(genreFilter || tagFilter || searchTerm) && (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            <X size={16} />
                            Limpiar filtros
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="loading-container mini">
                        <div className="loader mini"></div>
                    </div>
                ) : (
                    <>
                        <div className="games-grid">
                            {localGames.length > 0 ? (
                                localGames.map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))
                            ) : (
                                <p className="no-results">No encontramos nada. Prueba con otra búsqueda.</p>
                            )}
                        </div>

                        {games.length > 0 && (
                            <div className="pagination-container">
                                <span className="page-info">
                                    Página <span className="current-page">{currentPage}</span> de <span className="total-pages">{totalPages}</span>
                                </span>

                                <div className="pagination-actions">
                                    <div className="pagination-group back">
                                        {currentPage > 1 && (
                                            <>
                                                <button
                                                    className="pagination-btn first"
                                                    onClick={handleGoToStart}
                                                >
                                                    <span className="btn-icon">↞</span>
                                                    Ir al Principio
                                                </button>
                                                <button
                                                    className="pagination-btn prev"
                                                    onClick={handlePrevPage}
                                                >
                                                    <span className="btn-icon">←</span>
                                                    Página Anterior
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="pagination-group forward">
                                        {currentPage < totalPages && (
                                            <>
                                                <button
                                                    className="pagination-btn next"
                                                    onClick={handleNextPage}
                                                >
                                                    Siguiente Página
                                                    <span className="btn-icon">→</span>
                                                </button>
                                                <button
                                                    className="pagination-btn end"
                                                    onClick={handleGoToEnd}
                                                >
                                                    Ir al Final
                                                    <span className="btn-icon">↠</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Games;
