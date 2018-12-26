import Player from './player.model';
import { Namespace, Socket } from 'socket.io';
import Question from './question.model';

export default class Game {

    private players: Player[] = [];

    // private categories: Category[];

    private questions: Question[] = [];

    constructor(private gameId: string,
                private io: Namespace) {

        io.on('connect', (socket: Socket) => {
            socket.on(`PLAYER_JOIN`, (name: string) => {
                console.log(`${name} joined game ${gameId}`);
                //TODO check name is unique
                const player: Player = new Player(name);
                this.players.push(player);

                io.emit('PLAYER_JOIN_SUCCESS', {
                    joiner: player,
                    players: this.players
                });
            });

            socket.on('GET_PLAYERS', () => socket.emit('SEND_PLAYERS', this.players));

            socket.on('START_GAME', () => io.emit('GAME_STARTED'));

            socket.on('QUESTION_SUBMITTED', ({optionA, optionB, playerName}) => {
                const player = this.getPlayer(playerName);


                const q: Question = new Question(playerName, optionA, optionB);

                this.questions.push(q);

                io.emit('PLAYER_QUESTION_SUBMITTED', {player: player, question: q});
                console.log(`Game[${gameId}] New question added by ${playerName}`);
            });

            socket.on('ALL_QUESTIONS_SUBMITTED', () => {
                console.log(`All questions submitted for game ${gameId}`);
                io.emit('ALL_QUESTIONS_SUBMITTED', this.questions);
            });

            socket.on('ANSWER_SUBMITTED', ({questions, playerName}: { questions: Question[], playerName: string }) => {
                console.log(`Answers received from ${playerName}`);

                console.log(questions[0].optionA.votes);
                this.questions.map((serverQ: Question, i: number) => {
                    const newQ = Object.assign({}, serverQ);
                    const incomingQ: Question = questions[i];
                    newQ.optionA.votes = newQ.optionA.votes.concat(incomingQ.optionA.votes);
                    newQ.optionB.votes = newQ.optionB.votes.concat(incomingQ.optionB.votes);

                    console.log(`${newQ.optionA.text}: ${newQ.optionA.votes.length} votes`);
                    console.log(`${newQ.optionB.text}: ${newQ.optionB.votes.length} votes`);

                    return newQ;
                });

                io.emit('ANSWER_SUBMITTED', playerName);
            });

            socket.on('ALL_ANSWERS_SUBMITTED', () => {
                console.log('All answers submitted');
                io.emit('SEND_ALL_COMPLETED_QUESTIONS', this.questions);
            });
        });
    }

    getPlayer(name: string): Player {
        return this.players.find(player => player.name === name);
    }
}
