import * as types from '../types';
import * as service from '../../services/service';

export const fetchGames = (page = 1) => async (dispatch) => {
    dispatch({ type: types.FETCH_GAMES_REQUEST });
    try {
        const data = await service.getPopularGames(page);
        dispatch({ type: types.FETCH_GAMES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: types.FETCH_GAMES_FAILURE, payload: error.message });
    }
};

export const toggleFavorite = (game) => (dispatch, getState) => {
    const minimalGame = {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        parent_platforms: game.parent_platforms,
        released: game.released,
        genres: game.genres
    };

    dispatch({ type: types.TOGGLE_FAVORITE, payload: minimalGame });
    const { games } = getState();
    localStorage.setItem('g4g_favorites', JSON.stringify(games.favorites));
};

export const loadFavorites = () => (dispatch) => {
    const saved = localStorage.getItem('g4g_favorites');
    if (saved) {
        dispatch({ type: types.SET_FAVORITES, payload: JSON.parse(saved) });
    }
};
