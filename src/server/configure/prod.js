import router from '../router';
import fs from 'fs';
import path from 'path';
import express from 'express';

export default (app, config) => {
    app.use(router);

    const files = [['','index.html']];
    const distDir = path.join(__dirname, '..', '..', '..', 'dist');

    const getServeFile = (filename) => function (req, res, next) {
        fs.readFile(path.join(distDir, filename), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        });
    }

    files.forEach(resProp => {
        let resName = resProp[0];
        let resFile = resName;
        if (resProp.length > 1) {
            resFile = resProp[1];
        }
        app.get('/'+resName, getServeFile(resFile));
    });
    app.use(express.static(distDir));
    app.get('*',  getServeFile('index.html'));
};