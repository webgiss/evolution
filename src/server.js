import config from '../webpack.config';
import express from 'express';
import configureHot from './server/configure/hot';
import configureProd from './server/configure/prod'
import listenApplication from './server/listen';

const app = express();

if (config.mode === 'development') {
    console.log('Application is in development mode');
    configureHot(app, config);
} else {
    console.log('Application is in production mode');
    configureProd(app, config);
}

listenApplication(app);
