import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import Player from '../../../../../../server/src/model/player.model';
import { Observable, Subscription } from 'rxjs';
import { QuestionSubmittedEvent } from '../create-question/create-question.component';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import Question from '../../../../../../server/src/model/question.model';

@Component({
  selector: 'app-player-client-container',
  templateUrl: './player-client-container.component.html',
  styleUrls: ['./player-client-container.component.css']
})
export class PlayerClientContainerComponent implements OnInit {
  private gameId: string;
  private playerName: string;
  private state: PlayerState = PlayerState.JOIN;
  private playerState = PlayerState;

  private players: Player[] = [];

  private getPlayers$: Observable<Player[]>;
  private onGameStart$: Observable<any>;
  private onAllQuestionsSubmittedSubscription: Subscription;
  private questions: Question[];
  private playerJoinedSubscription: Subscription;

  constructor(private socket: SocketService,
              private titleService: Title) {
    titleService.setTitle('[Player] Would you rather...');
  }

  ngOnInit() {}

  joinGame({playerName, gameId}) {

    this.playerName = playerName;
    this.gameId = gameId;

    this.socket.connect(gameId);
    this.socket.joinGame(playerName);

    this.getPlayers$ = this.socket.getPlayers();
    this.playerJoinedSubscription = this.socket.onPlayerJoin()
    .subscribe(({joiner}) => {
      this.players.push(joiner);

      if(joiner.name === this.playerName){
        this.onJoinLobby();
      }
    });

    this.onGameStart$ = this.socket.onGameStarted();
  }

  onJoinLobby() {
    console.log(`Successfully joined ${this.gameId}`);
    this.state = PlayerState.LOBBY;

    const allPlayersSubscription = this.getPlayers$.subscribe((players: Player[]) => {
      this.players = players;
    });

    const gameStartSubscription = this.onGameStart$.subscribe(() => {
      this.onGameStart(allPlayersSubscription, gameStartSubscription);
    });
  }

  onGameStart(allPlayersSubscription: Subscription, gameStartSubscription: Subscription) {
    allPlayersSubscription.unsubscribe();
    gameStartSubscription.unsubscribe();
    this.playerJoinedSubscription.unsubscribe();
    this.state = PlayerState.WRITING_QUESTION;

    this.onAllQuestionsSubmittedSubscription = this.socket.onAllQuestionsSubmitted()
    .subscribe((questions) => this.onAllQuestionsSubmitted(questions));
  }

  onQuestionSubmitted(question: QuestionSubmittedEvent) {
    this.socket.submitQuestion(question);
    this.state = PlayerState.WAITING_FOR_QUESTIONS;
  }

  onAllQuestionsSubmitted(questions: Question[]) {
    this.questions = questions;
    console.log('all questions submitted');
    console.log(questions);
    this.onAllQuestionsSubmittedSubscription.unsubscribe();
    this.state = PlayerState.WRITING_ANSWERS;
  }

  onAnswered(questions: Question[]) {
    console.log(`${this.playerName} has answered the questions`);
    this.socket.submitAnswer(questions, this.playerName);
    this.state = PlayerState.WAITING_FOR_ANSWERS;
  }
}

export enum PlayerState {
  JOIN,
  LOBBY,
  WRITING_QUESTION,
  WAITING_FOR_QUESTIONS,
  WRITING_ANSWERS,
  WAITING_FOR_ANSWERS
}
