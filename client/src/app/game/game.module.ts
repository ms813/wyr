import { NgModule } from '@angular/core';
import { SocketIoConfig } from 'ngx-socket-io';
import { HostModule } from './host/host.module';
import { PlayerClientModule } from './player-client/player-client.module';

const config: SocketIoConfig = {url: 'http://localhost:8080', options: {}};

@NgModule({
  imports: [
    HostModule,
    PlayerClientModule
  ]
})
export class GameModule {}
