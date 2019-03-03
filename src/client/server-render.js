import fs from 'fs';
import path from 'path';

// eslint-disable-next-line no-sync
const template = fs.readFileSync(path.join(__dirname, '..', 'res', 'index.html'), 'utf8');

function renderApp(path, callback) {
    // const store = configureStore();
    // const state = store.getState();

    // const rendered = renderToString(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );

    // const page = template
    //   .replace('<!-- CONTENT -->', rendered)
    //   // .replace('"-- STORES --"', JSON.stringify(state));

    callback(null, template);
}

module.exports = renderApp;