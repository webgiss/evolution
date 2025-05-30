import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import store from './redux/store';
import { init } from './redux/index';

export default () => {
    const rootElement = document.body.children[0];
    const root = createRoot(rootElement);

    // console.log({ rootElement, store })

    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    init(store)
}