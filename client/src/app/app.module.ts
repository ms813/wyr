import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material';
import { SocketService } from './game/services/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GameModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [SocketService]
})
export class AppModule {}
