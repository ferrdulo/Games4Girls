import * as types from '../types';
import * as eventService from '../../services/events';

export const fetchEvents = () => async (dispatch) => {
    dispatch({ type: types.FETCH_EVENTS_REQUEST });
    try {
        const data = await eventService.fetchEvents();
        dispatch({ type: types.FETCH_EVENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: types.FETCH_EVENTS_FAILURE, payload: error.message });
    }
};

export const joinEvent = (event) => (dispatch, getState) => {
    dispatch({ type: types.JOIN_EVENT, payload: event });
    const { events } = getState();
    localStorage.setItem('g4g_joined_events', JSON.stringify(events.joinedEvents));
};

export const cancelEvent = (eventId) => (dispatch, getState) => {
    dispatch({ type: types.CANCEL_EVENT, payload: eventId });
    const { events } = getState();
    localStorage.setItem('g4g_joined_events', JSON.stringify(events.joinedEvents));
};

export const loadJoinedEvents = () => (dispatch) => {
    const saved = localStorage.getItem('g4g_joined_events');
    if (saved) {
        dispatch({ type: types.SET_JOINED_EVENTS, payload: JSON.parse(saved) });
    }
};
