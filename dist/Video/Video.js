"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const videoController_1 = require("./videoController");
class Video {
    constructor() {
        this.router = express.Router();
        this.configureRouter();
    }
    getRouterInstance() {
        return this.router;
    }
    configureRouter() {
        this.router.get('/video', videoController_1.videoController);
    }
}
exports.default = Video;
