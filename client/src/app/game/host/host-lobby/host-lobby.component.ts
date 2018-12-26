import { Component, EventEmitter, Input, Output } from '@angular/core';
import Player from '../../../../../../server/src/model/player.model';

@Component({
  selector: 'wyr-host-lobby',
  templateUrl: './host-lobby.component.html',
  styleUrls: ['./host-lobby.component.css']
})
export class HostLobbyComponent {
  @Input()
  private players: Player[] = [];

  @Input()
  private gameId: string = '';

  @Output()
  private startGame: EventEmitter<any> = new EventEmitter<any>();
}
