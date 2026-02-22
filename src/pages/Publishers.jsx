import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { getPublishers } from '../services/api';
import PublisherCard from '../components/PublisherCard/PublisherCard';
import './Publishers.css';

const Publishers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('search');
    const pageParam = parseInt(searchParams.get('page')) || 1;

    const [searchTerm, setSearchTerm] = useState(queryParam || '');
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultsFor, setResultsFor] = useState('Nuestros Distribuidores');
    const [currentPage, setCurrentPage] = useState(pageParam);
    const [totalPages, setTotalPages] = useState(0);

    const fetchPublishersData = async (page = pageParam) => {
        setLoading(true);
        try {
            const data = await getPublishers(queryParam || '', page);
            setPublishers(data.results);
            const pageSize = 15;
            setTotalPages(Math.ceil(data.count / pageSize));
            setCurrentPage(page);

            const sVal = queryParam || '';
            if (sVal.trim().length > 2) {
                setResultsFor(`Resultados para "${sVal}"`);
            } else {
                setResultsFor('Nuestros Distribuidores');
            }
        } catch (error) {
            console.error("Error al obtener distribuidores", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublishersData(pageParam);
    }, [pageParam, queryParam]);

    useEffect(() => {
        setSearchTerm(queryParam || '');
    }, [queryParam]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.trim().length > 2 || searchTerm === '') {
                updateParams({ page: 1, search: searchTerm || undefined });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const updateParams = (newParams) => {
        const params = Object.fromEntries(searchParams.entries());
        const updated = { ...params, ...newParams };
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

    const handlePageChange = (newPage) => {
        updateParams({ page: newPage });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSearchParams({});
    };

    return (
        <div className="publishers-page fade-in">
            <header className="publishers-header">
                <h1 className="page-title">Explora Distribuidores</h1>
                <form className="search-bar-container glass-morphism" onSubmit={handleSearch}>
                    <SearchIcon className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Busca por nombre (Nintendo, EA...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </header>

            <main className="publishers-content">
                <div className="content-meta">
                    <h2 className="results-label">{resultsFor}</h2>
                    {(queryParam || searchTerm) && (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            <X size={16} />
                            Limpiar
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="loading-container mini">
                        <div className="loader mini"></div>
                    </div>
                ) : (
                    <>
                        <div className="publishers-grid">
                            {publishers.length > 0 ? (
                                publishers.map(pub => (
                                    <PublisherCard key={pub.id} publisher={pub} />
                                ))
                            ) : (
                                <p className="no-results">No se encontraron distribuidores con ese nombre.</p>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination-container">
                                <span className="page-info">
                                    Página <span className="current-page">{currentPage}</span> de <span className="total-pages">{totalPages}</span>
                                </span>
                                <div className="pagination-actions">
                                    {currentPage > 1 && (
                                        <button className="pagination-btn prev" onClick={() => handlePageChange(currentPage - 1)}>
                                            Anterior
                                        </button>
                                    )}
                                    {currentPage < totalPages && (
                                        <button className="pagination-btn next" onClick={() => handlePageChange(currentPage + 1)}>
                                            Siguiente
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Publishers;
