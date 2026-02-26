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
    const response = await rawgApi.get('/games', {
        params: {
            page,
            page_size: 12,
            ordering: '-added',
        },
    });
    return response.data;
};

export const searchGames = async (query, page = 1) => {
    const response = await rawgApi.get('/games', {
        params: {
            search: query,
            page,
            page_size: 12,
        },
    });
    return response.data;
};

export const getGameDetails = async (id) => {
    const response = await rawgApi.get(`/games/${id}`);
    return response.data;
};

export const getFilteredGames = async (filters, page = 1) => {
    const response = await rawgApi.get('/games', {
        params: {
            ...filters,
            page,
            page_size: 12,
        },
    });
    return response.data;
};

export const getGameScreenshots = async (id) => {
    const response = await rawgApi.get(`/games/${id}/screenshots`);
    return response.data;
};

export const getCoopGames = async () => {
    const slugs = ['overcooked-2', 'a-way-out-2018', 'stardew-valley', 'cult-of-the-lamb', 'league-of-legends'];
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
    return { results: gamesData.filter(game => game !== null) };
};

export const getPublishers = async (search = '', page = 1) => {
    const response = await rawgApi.get('/publishers', {
        params: {
            search: search || undefined,
            page,
            page_size: 15,
        },
    });
    return response.data;
};

export const getPublisherDetails = async (id) => {
    const response = await rawgApi.get(`/publishers/${id}`);
    return response.data;
};

export const getGamesByCategory = async (category, page = 1) => {
    return getFilteredGames({ genres: category }, page);
};

export const getPublisherGames = async (id, page = 1) => {
    return getFilteredGames({ publishers: id }, page);
};
