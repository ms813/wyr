"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var SocketIo = require("socket.io");
var game_model_1 = require("./model/game.model");
var path = require("path");
var WouldYouRatherServer = /** @class */ (function () {
    function WouldYouRatherServer() {
        this.games = {};
        this.gameCounter = 0;
        this.createApp();
        this.config();
        this.createServer();
        this.routes();
        this.sockets();
        this.listen();
    }
    WouldYouRatherServer.prototype.createApp = function () {
        this.app = express();
    };
    WouldYouRatherServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    WouldYouRatherServer.prototype.config = function () {
        this.port = process.env.PORT || WouldYouRatherServer.PORT;
    };
    WouldYouRatherServer.prototype.sockets = function () {
        this.io = SocketIo(this.server);
    };
    WouldYouRatherServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    WouldYouRatherServer.prototype.getApp = function () {
        return this.app;
    };
    WouldYouRatherServer.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // placeholder route handler
        router.get('/creategame', function (req, res, next) {
            var id = (_this.gameCounter++).toString();
            var socketNamespace = _this.io.of("/socket/" + id);
            _this.games[id] = new game_model_1.default(id, socketNamespace);
            console.log('new game created by client, id = ' + id);
            return res.json({
                message: 'new game created',
                id: id
            });
        });
        router.get('/game/:gameId', function (req, res, next) {
            var exists = !!_this.games[req.params.gameId];
            return res.json({ exists: exists });
        });
        router.get('*', function (req, res) {
            if (allowedExt.filter(function (ext) { return req.url.indexOf(ext) > 0; }).length > 0) {
                res.sendFile(path.resolve("dist/client/" + req.url));
            }
            else {
                res.sendFile(path.resolve('dist/client/index.html'));
            }
        });
        this.app.use('/', router);
    };
    WouldYouRatherServer.PORT = 8080;
    return WouldYouRatherServer;
}());
exports.default = WouldYouRatherServer;
var allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg'
];
