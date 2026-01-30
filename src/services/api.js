import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = import.meta.env.VITE_RAWG_API_URL;

const rawgApi = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

export const getPopularGames = async (page = 1) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                page,
                page_size: 12,
                ordering: '-added',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener juegos populares:', error);
        throw error;
    }
};

export const searchGames = async (query, page = 1) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                search: query,
                page,
                page_size: 12,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al buscar juegos:', error);
        throw error;
    }
};

export const getGameDetails = async (id) => {
    try {
        const response = await rawgApi.get(`/games/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener detalles del juego:', error);
        throw error;
    }
};

export const getGamesByCategory = async (category, page = 1) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                genres: category,
                page,
                page_size: 12,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener juegos por categoría:', error);
        throw error;
    }
};

export const getGameScreenshots = async (id) => {
    try {
        const response = await rawgApi.get(`/games/${id}/screenshots`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener capturas del juego:', error);
        throw error;
    }
};

export const getCoopGames = async () => {
    try {
        // Lista seleccionada manualmente
        const slugs = ['overcooked-2', 'a-way-out', 'stardew-valley', 'cult-of-the-lamb', 'league-of-legends'];

        const gamesData = await Promise.all(
            slugs.map(async (slug) => {
                try {
                    const res = await rawgApi.get(`/games/${slug}`);
                    return res.data;
                } catch (err) {
                    console.error(`Error al obtener el juego ${slug}:`, err);
                    return null;
                }
            })
        );

        const filteredGames = gamesData.filter(game => game !== null);

        if (filteredGames.length > 0) {
            return { results: filteredGames };
        }

        throw new Error('No se pudieron obtener los juegos seleccionados');
    } catch (error) {
        console.error('Error al obtener la selección de juegos:', error);
        // Si falla la selección personalizada, volver a juegos populares
        const response = await rawgApi.get('/games', {
            params: {
                ordering: '-rating',
                page_size: 5,
            },
        });
        return response.data;
    }
};

export const getRelatedGames = async (genreIds, currentId) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                genres: genreIds,
                page_size: 6,
                exclude_add_to_series: true,
            },
        });
        // Excluir el juego actual
        return { results: response.data.results.filter(g => g.id !== parseInt(currentId)) };
    } catch (error) {
        console.error('Error al obtener juegos relacionados:', error);
        return { results: [] };
    }
};

export default rawgApi;
