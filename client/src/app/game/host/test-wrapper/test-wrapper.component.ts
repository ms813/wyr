import { Component, OnInit } from '@angular/core';
import Question from '../../../../../../server/src/model/question.model';
import Player from '../../../../../../server/src/model/player.model';

@Component({
  selector: 'app-test-wrapper',
  templateUrl: './test-wrapper.component.html',
  styleUrls: ['./test-wrapper.component.css']
})
export class TestWrapperComponent implements OnInit {

  questions: Question[];
  players: Player[];

  ngOnInit() {
    const claire = new Player('Claire');
    const sausage = new Player('sausage');
    this.players = [claire, sausage];

    const claireQ = new Question(claire, 'x', 'y');
    const sausageQ = new Question(sausage, '100', 'one hundred');
    this.questions = [claireQ, sausageQ];

    claireQ.optionA.votes.push(claire.name);
    claireQ.optionA.votes.push(sausage.name);
    sausageQ.optionA.votes.push(claire.name);
    sausageQ.optionB.votes.push(sausage.name);

  }
}
