import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GamePage, GameTable } from '../pages'


@IonicPage()
@Component({
  selector: 'page-game-layout',
  templateUrl: 'game-layout.html',
})
export class GameLayout {
  game: any;

  gamePageTab = GamePage;
  gameTableTab = GameTable;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameLayout');
  }

  goHome() {
    //this.navCtrl.push(MyTeams);
    this.navCtrl.popToRoot();
  }

}
