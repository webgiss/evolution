import chokidar from 'chokidar';
import cssModulesRequireHook from 'css-modules-require-hook';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import express from 'express';

export default (app, config) => {
    const compiler = webpack(config);
    cssModulesRequireHook({ generateScopedName: '[path][name]-[local]' });

    // Serve hot-reloading bundle to client
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));

    // Include server routes as a middleware
    app.use((req, res, next) => require('../router').default(req, res, next));

    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watcher = chokidar.watch('./src/server');

    const regexpCache = {};
    const getPathMatch = name => {
        if (regexpCache[name] !== undefined) {
            return regexpCache[name];
        }
        regexpCache[name] = new RegExp(`[/\\\\]${name}[/\\\\]`);
        return regexpCache[name];
    };

    const clearRequireCacheForPath = (name) => {
        console.log(`Clearing /${name}/ module cache from server`);
        Object.keys(require.cache).forEach((id) => {
            if (getPathMatch(name).test(id)) {
                delete require.cache[id];
            }
        });
    };

    watcher.on('ready', () => watcher.on('all', () => clearRequireCacheForPath('server')));

    // Anything else gets passed to the client app's server rendering
    app.get('*', function (req, res, next) {
        require('../../client/server-render')(req.path, (err, page) => {
            if (err) {
                return next(err);
            }
            res.send(page);
        });
    });

    // Do "hot-reloading" of react stuff on the server
    // Throw away the cached client modules and let them be re-required next time
    compiler.plugin('done', () => clearRequireCacheForPath('client'));

    app.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')));
}