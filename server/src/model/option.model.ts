import Player from './player.model';

export default class Option {
    votes: string[] = []; //player names

    constructor(public readonly text: string) { }
}