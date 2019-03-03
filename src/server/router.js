import { Router, json } from 'express';
import { join } from 'path';
import Log from './app/service/log';

let config = require('./app/config').default;

config.dirname = __dirname;
config.datadir = join(__dirname, '..', '..', 'data');
config.log = new Log({
    pathname: join(config.datadir, 'logs'), 
    filename: 'app.log',
});

const { apiRouter } = require('./app/api/router');

const router = Router();
router.use(json());
router.use('/api', apiRouter);

export default router;
