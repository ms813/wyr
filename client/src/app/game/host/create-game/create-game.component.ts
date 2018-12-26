import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wyr-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {

  @Output()
  private createGame: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  onCreateGameClicked() {
    const url = '/creategame';

    this.http.get(url).subscribe((response: CreateGameResponse) => {
      console.log('game successfully created on server', response);

      this.createGame.emit(response.id);
    });
  }
}

interface CreateGameResponse {
  message: string,
  id: string
}
