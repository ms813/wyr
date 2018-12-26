import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostContainerComponent } from './game/host/host-container/host-container.component';
import { HomeComponent } from './home/home.component';
import { PlayerClientContainerComponent } from './game/player-client/player-client-container/player-client-container.component';
import { TestWrapperComponent } from './game/host/test-wrapper/test-wrapper.component';

const routes: Routes = [
  {path: 'host', component: HostContainerComponent},
  {path: 'play', component: PlayerClientContainerComponent},
  {path:'test', component: TestWrapperComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
