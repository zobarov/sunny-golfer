import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameLayout } from './game-layout';

@NgModule({
  declarations: [
    GameLayout,
  ],
  imports: [
    IonicPageModule.forChild(GameLayout),
  ],
  exports: [
    GameLayout
  ]
})
export class GameLayoutModule {}
