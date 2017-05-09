import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Game page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  numberOfHoles: any[];
  players: any[];
  currentHole: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.numberOfHoles =  Array(5).fill().map((x,i)=>i);
    this.numberOfHoles = Array(18).fill(this.currentHole).map((x,currentHole)=>currentHole+1);
    this.players = ['Vlad', 'Alex'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Game: numberOfHoles=' , this.numberOfHoles);
  }

  confirmHoleResult(hole, holeResult) {
    console.log("Confirming hole result:", hole, holeResult);
  }

}
