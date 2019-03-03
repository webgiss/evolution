import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import debug from './debug';
import evoMap from './evoMap';

export default (history) => combineReducers({
    router: connectRouter(history),
    evoMap,
    debug,
});

