import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinGameComponent } from './join-game/join-game.component';
import { PlayerLobbyComponent } from './player-lobby/player-lobby.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatButtonToggleModule, MatInputModule, MatListModule } from '@angular/material';
import { PlayerClientContainerComponent } from './player-client-container/player-client-container.component';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  declarations: [
    JoinGameComponent,
    PlayerLobbyComponent,
    CreateCategoryComponent,
    CreateQuestionComponent,
    PlayerClientContainerComponent,
    PlayerLobbyComponent,
    CreateQuestionComponent,
    CreateCategoryComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule
  ],
  exports: [AnswerComponent],
  providers: []
})
export class PlayerClientModule {}
