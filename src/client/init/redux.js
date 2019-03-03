import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export default (baseUrl, initialState, reducerCreator) => {
    // Create browser history to use in the Redux store
    const history = createBrowserHistory({ basename: baseUrl });
    const reducer = reducerCreator(history);

    const middleware = [
        thunk,
        routerMiddleware(history),
    ]

    const enhancers = []

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return { history, store };
};


