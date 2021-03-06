import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Player from '../../../../../../server/src/model/player.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'wyr-host-waiting',
  templateUrl: './host-waiting.component.html',
  styleUrls: ['./host-waiting.component.css']
})
export class HostWaitingComponent implements OnInit {
  @Input()
  players: Player[] = [];

  @Input()
  title: string = 'Remember to set a title';

  playersResponded: string[] = [];

  @Input()
  responseSubmitted: Observable<string>;

  @Output()
  allResponsesSubmitted = new EventEmitter();

  ngOnInit() {
    this.responseSubmitted.subscribe((playerName: string) => {
      this.playersResponded.push(playerName);
    });
  }
}
