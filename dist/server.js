"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import * as bodyParser from 'body-parser';
const path = require("path");
const Video_1 = require("./Video/Video");
const port = 8080;
class Server {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.configureServer();
        this.configureRoutes();
    }
    configureServer() {
        this.app.use(express.static(__dirname));
    }
    configureRoutes() {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '/index.html'));
        });
        this.app.use(new Video_1.default().getRouterInstance());
        this.app.all('*', (req, res) => {
            res.write('ooops...something went wrong');
            res.end();
        });
    }
    runServer(port) {
        this.app.listen(port, () => {
            console.log(`listen on ${port}`);
        });
    }
}
const serverInstace = new Server();
serverInstace.runServer(8080);
