import * as types from '../types';

const initialState = {
    list: [],
    joinedEvents: [],
    loading: false,
    error: null,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_EVENTS_REQUEST:
            return { ...state, loading: true };
        case types.FETCH_EVENTS_SUCCESS:
            return { ...state, loading: false, list: action.payload };
        case types.FETCH_EVENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case types.JOIN_EVENT:
            return { ...state, joinedEvents: [...state.joinedEvents, action.payload] };
        case types.CANCEL_EVENT:
            return { ...state, joinedEvents: state.joinedEvents.filter(e => e.id !== action.payload) };
        case types.SET_JOINED_EVENTS:
            return { ...state, joinedEvents: action.payload };
        default:
            return state;
    }
};

export default eventReducer;
