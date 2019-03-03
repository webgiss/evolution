import ReactReduxInit from './init/reactRedux';
import initView from './init/view';
import initRedux from './init/redux';

import actions from './actions';
import reducer from './reducers/app';
import Routes from './views/routes/index';
import configDao from './dao/config';

import * as evoActions from './actions/evoActions';

import DebugService from './service/debug';
import StorageService from './service/storage';
import ServiceWorkerService from './service/serviceWorker';

Object.assign(actions, { evoActions });
const reactReduxInit = new ReactReduxInit(initView, initRedux);

reactReduxInit.rootElement = document.getElementsByTagName('body')[0].children[0];
reactReduxInit.baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
reactReduxInit.reducer = reducer;
reactReduxInit.routes = Routes;

[
    DebugService, 
    StorageService, 
    ServiceWorkerService,
].map( (serviceClass) => new serviceClass(reactReduxInit) );

reactReduxInit.init();

if (module.hot) {
    module.hot.accept('./reducers/app', () => {
        const nextReducer = require('./reducers/app');
        StorageEvent.replaceReducer(nextReducer);    
    });
}

window.config = configDao.config;
