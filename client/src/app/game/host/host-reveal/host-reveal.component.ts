import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Player from '../../../../../../server/src/model/player.model';
import Question from '../../../../../../server/src/model/question.model';
import { Title } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'wyr-host-reveal',
  templateUrl: './host-reveal.component.html',
  styleUrls: ['./host-reveal.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('2000ms ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('2000ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class HostRevealComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  players: Player[];

  @Input()
  completedQuestions: Question[];

  @Output()
  endGame = new EventEmitter<any>();

  private currentQuestionIndex: number = 0;
  private currentQuestion: Question;

  constructor(private titleService: Title) {}

  revealNext(): void {
    if (this.currentQuestionIndex >= this.completedQuestions.length - 1) {
      this.endGame.emit();
      console.log('All answers revealed');
    }

    this.currentQuestionIndex++;
    this.currentQuestion = this.completedQuestions[this.currentQuestionIndex];
  }

  getPlayerVote(player: Player): string {
    const a = this.currentQuestion.optionA.votes.find(name => name === player.name);
    return a ? 'A' : 'B';
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.currentQuestion = this.completedQuestions[this.currentQuestionIndex];
  }
}
