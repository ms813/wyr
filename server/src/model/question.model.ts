import Player from './player.model';
import Option from './option.model';
import { Vote } from './vote.enum';

export default class Question {

    funnyVotes: Player[];

    optionA: Option;
    optionB: Option;



    constructor(private author: Player, optionA: string, optionB: string) {
        // this.author = author;
        this.optionA = new Option(optionA);
        this.optionB = new Option(optionB);
    }
}