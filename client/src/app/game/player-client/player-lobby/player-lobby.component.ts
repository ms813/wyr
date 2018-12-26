import { Component, Input } from '@angular/core';
import Player from '../../../../../../server/src/model/player.model';

@Component({
  selector: 'wyr-player-lobby',
  templateUrl: './player-lobby.component.html',
  styleUrls: ['./player-lobby.component.css']
})
export class PlayerLobbyComponent {

  @Input()
  public playerName: string = '';

  @Input()

  public gameId: string = '';

  @Input()
  public players: Player[] = [];

}
