import { createServer, Server } from 'http';
import * as express from 'express';
import * as SocketIo from 'socket.io';
import Game from './model/game.model';
import { SocketService } from '../../client/src/app/game/services/socket.service';
import * as path from 'path';

export default class WouldYouRatherServer {

    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIo.Server;
    private port: string | number;


    private games: { [id: string]: Game } = {};
    private gameCounter: number = 0;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.routes();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || WouldYouRatherServer.PORT;
    }

    private sockets(): void {
        this.io = SocketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: SocketIo.Socket) => {
            console.log('Connected client on port %s.', this.port);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }

    private routes(): void {
        let router = express.Router();
        // placeholder route handler
        router.get('/creategame', (req, res, next) => {

            const id = (this.gameCounter++).toString();

            const socketNamespace = this.io.of(`/socket/${id}`);

            this.games[id] = new Game(id, socketNamespace);

            console.log('new game created by client, id = ' + id);

            return res.json({
                message: 'new game created',
                id: id
            });

        });

        router.get('/game/:gameId', (req, res, next) => {
            const exists = !!this.games[req.params.gameId];
            return res.json({exists: exists});
        });

        router.get('*', (req, res) => {
            if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                res.sendFile(path.resolve(`dist/client/${req.url}`));
            } else {
                res.sendFile(path.resolve('dist/client/index.html'));
            }
        });

        this.app.use('/', router);
    }
}

const allowedExt = [
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