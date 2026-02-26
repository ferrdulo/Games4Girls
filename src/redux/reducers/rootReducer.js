import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
    games: gameReducer,
    events: eventReducer,
});

export default rootReducer;
