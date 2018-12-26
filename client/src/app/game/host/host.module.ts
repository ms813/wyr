import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostContainerComponent } from './host-container/host-container.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatListModule } from '@angular/material';
import { HostLobbyComponent } from './host-lobby/host-lobby.component';
import { HostWaitingComponent } from './host-waiting/host-waiting.component';
import { HostRevealComponent } from './host-reveal/host-reveal.component';
import { TestWrapperComponent } from './test-wrapper/test-wrapper.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HostContainerComponent,
    CreateGameComponent,
    HostLobbyComponent,
    HostWaitingComponent,
    HostRevealComponent,
    TestWrapperComponent
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
    FlexLayoutModule
  ]
})
export class HostModule {}
