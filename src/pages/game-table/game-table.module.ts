import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameTable } from './game-table';

@NgModule({
  declarations: [
    GameTable,
  ],
  imports: [
    IonicPageModule.forChild(GameTable),
  ],
  exports: [
    GameTable
  ]
})
export class GameTableModule {}
