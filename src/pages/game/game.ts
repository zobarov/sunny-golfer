import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


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
   @ViewChild(Slides) slides: Slides;


  numberOfHoles: any[];
  players: any[];
  currentHole: any;

  holeResults: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.numberOfHoles =  Array(5).fill().map((x,i)=>i);
    this.currentHole = 1;
    this.numberOfHoles = Array(18).fill(this.currentHole).map((x,currentHole)=>currentHole+1);
    this.players = ['Vlad', 'Alex'];
    this.holeResults = Array(2).fill(0);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Game: numberOfHoles=' , this.numberOfHoles);
    this.slides.lockSwipeToNext(true);
  }

  confirmHoleResult(hole, holeResultA, holeResultB) {
    console.log("Confirming hole result:", hole, holeResultA, holeResultB);
  }

  change(holeResult, index) {
    //console.log("Applying hole result:", holeResult, index);
    this.holeResults[index] = holeResult;
    console.log("Applying hole result:", this.holeResults);
  }

  changeB(holeResultB) {
    this.holeResults[1] = holeResultB;
  }


  slideChanged($event) {
    if(this.holeResults[0] !== 0 && this.holeResults[1] !== 0) {
      console.log("Unlocking swipe:");
      this.slides.lockSwipeToNext(false);
    } else {
      console.log("Re-lock swipe to next");
      return;
    }


    if($event.direction == 2) {
         console.log("sliding forward ", $event);
         this.currentHole += 1;

    } else if($event.direction == 4) {
         console.log("sliding back ", $event);
         this.currentHole -= 1;
    }

    this.slides.slideNext();

    this.holeResults = Array(2).fill(0);
    this.slides.lockSwipeToNext(true);



  }


}
