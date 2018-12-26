import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import Player from '../../../../../server/src/model/player.model';
import Question from '../../../../../server/src/model/question.model';
import { QuestionSubmittedEvent } from '../player-client/create-question/create-question.component';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  public connect(gameId: string): void {
    if (!this.socket) {
      console.log(`connecting to game ${gameId}`);
      this.socket = io(`/socket/${gameId}`);
    }

    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }

  public joinGame(playerName: string) {
    this.socket.emit(`PLAYER_JOIN`, playerName);
  }

  public onPlayerJoin(): Observable<{ joiner: Player, players: Player[] }> {
    return new Observable(obs =>
      this.socket.on('PLAYER_JOIN_SUCCESS', data => obs.next(data))
    );
  }

  public getPlayers(): Observable<Player[]> {
    this.socket.emit('GET_PLAYERS');
    return new Observable<Player[]>(obs =>
      this.socket.on('SEND_PLAYERS', (players: Player[]) => obs.next(players)));
  }

  public startGame(): void {
    this.socket.emit('START_GAME');
  }

  public onGameStarted(): Observable<any> {
    return new Observable(obs =>
      this.socket.on('GAME_STARTED', () => obs.next())
    );
  }

  public submitQuestion(question: QuestionSubmittedEvent): void {
    console.log('socket service submitting:', question);
    this.socket.emit('QUESTION_SUBMITTED', question);
  }

  public allQuestionsSubmitted(): void {
    this.socket.emit('ALL_QUESTIONS_SUBMITTED');
  }

  public onAllQuestionsSubmitted(): Observable<Question[]> {
    return new Observable(obs =>
      this.socket.on('ALL_QUESTIONS_SUBMITTED', (questions: Question[]) => obs.next(questions))
    );
  }

  public onQuestionSubmitted(): Observable<{ player: Player, question: Question }> {
    return new Observable(obs =>
      this.socket.on('PLAYER_QUESTION_SUBMITTED', (data) => obs.next(data))
    );
  }

  public submitAnswer(questions: Question[], playerName: string) {
    this.socket.emit('ANSWER_SUBMITTED', {
      questions: questions,
      playerName: playerName
    });
  }

  public onAnswerSubmitted(): Observable<string> {
    return new Observable(obs => this.socket.on('ANSWER_SUBMITTED',
      (playerName: string) => obs.next(playerName))
    );
  }

  public allAnswersSubmitted(): void {
    this.socket.emit('ALL_ANSWERS_SUBMITTED');
  }

  public onAllAnswersSubmitted(): Observable<Question[]> {
    return new Observable(obs => this.socket.on('SEND_ALL_COMPLETED_QUESTIONS',
      (questions: Question[]) => {
        obs.next(questions);
        console.log('all answers are in');
        console.log(questions);
      }));
  }
}
