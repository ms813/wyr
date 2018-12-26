"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_model_1 = require("./player.model");
var question_model_1 = require("./question.model");
var Game = /** @class */ (function () {
    function Game(gameId, io) {
        var _this = this;
        this.gameId = gameId;
        this.io = io;
        this.players = [];
        // private categories: Category[];
        this.questions = [];
        io.on('connect', function (socket) {
            socket.on("PLAYER_JOIN", function (name) {
                console.log(name + " joined game " + gameId);
                //TODO check name is unique
                var player = new player_model_1.default(name);
                _this.players.push(player);
                io.emit('PLAYER_JOIN_SUCCESS', {
                    joiner: player,
                    players: _this.players
                });
            });
            socket.on('GET_PLAYERS', function () { return socket.emit('SEND_PLAYERS', _this.players); });
            socket.on('START_GAME', function () { return io.emit('GAME_STARTED'); });
            socket.on('QUESTION_SUBMITTED', function (_a) {
                var optionA = _a.optionA, optionB = _a.optionB, playerName = _a.playerName;
                var player = _this.getPlayer(playerName);
                var q = new question_model_1.default(playerName, optionA, optionB);
                _this.questions.push(q);
                io.emit('PLAYER_QUESTION_SUBMITTED', { player: player, question: q });
                console.log("Game[" + gameId + "] New question added by " + playerName);
            });
            socket.on('ALL_QUESTIONS_SUBMITTED', function () {
                console.log("All questions submitted for game " + gameId);
                io.emit('ALL_QUESTIONS_SUBMITTED', _this.questions);
            });
            socket.on('ANSWER_SUBMITTED', function (_a) {
                var questions = _a.questions, playerName = _a.playerName;
                console.log("Answers received from " + playerName);
                console.log(questions[0].optionA.votes);
                _this.questions.map(function (serverQ, i) {
                    var newQ = Object.assign({}, serverQ);
                    var incomingQ = questions[i];
                    newQ.optionA.votes = newQ.optionA.votes.concat(incomingQ.optionA.votes);
                    newQ.optionB.votes = newQ.optionB.votes.concat(incomingQ.optionB.votes);
                    console.log(newQ.optionA.text + ": " + newQ.optionA.votes.length + " votes");
                    console.log(newQ.optionB.text + ": " + newQ.optionB.votes.length + " votes");
                    return newQ;
                });
                io.emit('ANSWER_SUBMITTED', playerName);
            });
            socket.on('ALL_ANSWERS_SUBMITTED', function () {
                console.log('All answers submitted');
                io.emit('SEND_ALL_COMPLETED_QUESTIONS', _this.questions);
            });
        });
    }
    Game.prototype.getPlayer = function (name) {
        return this.players.find(function (player) { return player.name === name; });
    };
    return Game;
}());
exports.default = Game;
