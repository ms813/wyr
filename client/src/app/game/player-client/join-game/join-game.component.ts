import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'wyr-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  @Output()
  private join = new EventEmitter<{ playerName: string, gameId: string }>();
  public playerName: string;
  public gameId: string = null;
  public error: string = null;

  public matcher = new EmptyErrorMatcher();
  public playerNameFormControl = new FormControl('',
    [Validators.required]
  );

  constructor(private socket: SocketService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  onJoinClick(): void {
    //check if game exists before attempting to connect
    this.http.get<any>(`/game/${this.gameId}`).subscribe(({exists}) => {

      console.log(`Attempting to join game ${this.gameId}`);
      if (exists) {
        this.join.emit({
          playerName: this.playerName,
          gameId: this.gameId
        });

        this.error = null;
      } else {
        this.error = `Error when attempting to connect to game ${this.gameId}`;
      }
    });
  }
}

class EmptyErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
