import * as types from '../types';

const initialState = {
    list: [],
    favorites: [],
    loading: false,
    error: null,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_GAMES_REQUEST:
            return { ...state, loading: true };
        case types.FETCH_GAMES_SUCCESS:
            return { ...state, loading: false, list: action.payload.results };
        case types.FETCH_GAMES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case types.TOGGLE_FAVORITE:
            const isFav = state.favorites.some(f => f.id === action.payload.id);
            const newFavorites = isFav
                ? state.favorites.filter(f => f.id !== action.payload.id)
                : [...state.favorites, action.payload];
            return { ...state, favorites: newFavorites };
        case types.SET_FAVORITES:
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
};

export default gameReducer;
