import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wyr-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {

  @Input()
  playerName: string;

  optionAText: string;
  optionBText: string;
  submitted: boolean = false;

  @Output()
  private questionSubmitted = new EventEmitter<QuestionSubmittedEvent>();

  submitQuestion() {
    const question: QuestionSubmittedEvent = {
      playerName: this.playerName,
      optionA: this.optionAText,
      optionB: this.optionBText
    };
    this.questionSubmitted.emit(question);

    this.submitted = true;
  }
}

export interface QuestionSubmittedEvent {
  playerName: string,
  optionA: string,
  optionB: string
}
