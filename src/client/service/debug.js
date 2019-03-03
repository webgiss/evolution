import configDao from '../dao/config';
import actions from '../actions';
import { bindActionCreators } from 'redux';

export default class DebugService {
    constructor(reactReduxInit) {
        reactReduxInit.addProvider(this);
    }

    onStartApplication({store, dispatch, history}) {
        if (configDao.config.useDebug) {
            window.dispatch = store.dispatch;
            window.store = store;
            window.rhistory = history;
            window.go = (url) => history.push(url);

            window.actions = actions;
            window.dactions = {};
            for (let categorie in actions) {
                window.dactions[categorie] = bindActionCreators(actions[categorie], dispatch);
            }
        }
    }

    onNewState(state, {store, dispatch, history}) {
        if (configDao.config.useDebug) {
            window.state = state;
            console.log('state', state);
        }
   }
}

