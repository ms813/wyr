import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Title } from '@angular/platform-browser';
import Player from '../../../../../../server/src/model/player.model';
import { Subject, Subscription } from 'rxjs';
import Question from '../../../../../../server/src/model/question.model';

@Component({
  selector: 'wyr-host',
  templateUrl: './host-container.component.html',
  styleUrls: ['./host-container.component.css']
})
export class HostContainerComponent {

  state: HostState = HostState.CREATE_GAME;
  hostState = HostState;
  gameId: string = null;
  players: Player[] = [];

  private playerJoinSubscription: Subscription;

  private questionSubmitted: Subject<string> = new Subject();
  private questionSubmittedSubscription: Subscription;
  private answersSubmitted: Subject<string> = new Subject();
  private answersSubmittedSubscription: Subscription;
  private allAnswersSubmittedSubscription: Subscription;
  private completedQuestions: Question[];

  constructor(private socket: SocketService,
              private titleService: Title) {
    titleService.setTitle('[Host] Would you rather...');
  }

  onGameCreated(gameId: string) {
    this.gameId = gameId;
    console.log(gameId);
    this.state = HostState.HOST_LOBBY;

    this.socket.connect(gameId);
    this.playerJoinSubscription = this.socket.onPlayerJoin()
    .subscribe(({players}) => this.players = players);
  }

  onGameStarted() {
    this.playerJoinSubscription.unsubscribe();

    this.state = HostState.WAITING_FOR_QUESTIONS;
    this.socket.startGame();

    this.questionSubmittedSubscription = this.socket.onQuestionSubmitted()
    .subscribe(({question, player}) => {
      console.log(`host container question submitted`, player, question);
      this.questionSubmitted.next(player.name);
    });
  }

  onAllQuestionsSubmitted() {
    this.questionSubmittedSubscription.unsubscribe();
    this.socket.allQuestionsSubmitted();
    this.state = HostState.WAITING_FOR_ANSWERS;

    this.answersSubmittedSubscription = this.socket.onAnswerSubmitted()
    .subscribe((playerName: string) => {
      console.log(`answer submitted by ${playerName}`);
      this.answersSubmitted.next(playerName);
    });
  }

  onAllAnswersSubmitted() {
    console.log(`all answers submitted`);
    this.answersSubmittedSubscription.unsubscribe();
    this.socket.allAnswersSubmitted();
    this.allAnswersSubmittedSubscription = this.socket.onAllAnswersSubmitted()
    .subscribe((questions: Question[]) => {
      console.log("All questions received");
      this.state = HostState.ALL_ANSWERS_RECEIVED;
      this.completedQuestions = questions;
    });
  }

}

export enum HostState {
  CREATE_GAME,
  HOST_LOBBY,
  WAITING_FOR_QUESTIONS,
  WAITING_FOR_ANSWERS,
  ALL_ANSWERS_RECEIVED
}
