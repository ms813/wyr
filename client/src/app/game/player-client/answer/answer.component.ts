import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Question from '../../../../../../server/src/model/question.model';

@Component({
  selector: 'wyr-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input()
  playerName: string;

  @Input()
  questions: Question[];

  @Output()
  submitAnswers = new EventEmitter<Question[]>();

  answers: string[];

  ngOnInit() {
    this.answers = Array(this.questions.length).fill('A', 0);
  }

  onSubmitClick() {
    this.answers.forEach((answer: string, i: number) =>
      this.questions[i][`option${answer}`].votes.push(this.playerName)
    );
    this.submitAnswers.emit(this.questions);
  }
}
