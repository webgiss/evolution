import http from 'http';

export default (app) => {
    const server = http.createServer(app);

    const port = process.env.PORT || "3000";
    const host = process.env.HOST || "0.0.0.0";


    server.listen(port, host, (err) => {
        if (err) {
            throw err;
        }

        const addr = server.address();

        console.log('Listening at http://%s:%d', addr.address, addr.port);
    });
};