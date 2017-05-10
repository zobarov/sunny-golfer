import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { GameFlowSrv } from '../../services/services';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public gameFlowSrv: GameFlowSrv) {
    //this.numberOfHoles =  Array(5).fill().map((x,i)=>i);
    this.currentHole = 1;
    this.numberOfHoles = Array(18).fill(this.currentHole).map((x,currentHole)=>currentHole+1);
    this.players = ['Vlad', 'Alex'];
    this.holeResults =[];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Game: numberOfHoles=' , this.numberOfHoles);
    this.slides.lockSwipeToNext(true);
  }

  confirmHoleResult(hole, holeResultA, holeResultB) {
    console.log("Confirming hole result:", hole, holeResultA, holeResultB);
  }

  slideChanged($event) {
    if(this.holeResults[0] !== "" && this.holeResults[1] !== "") {
      console.log("Unlocking swipe: Res:", this.holeResults[0], this.holeResults[1]);
      this.slides.lockSwipeToNext(false);
    } else {
      console.log("Re-lock swipe to next");
      return;
    }

    let holeN = this.currentHole;
    let slideNextHole = true;

    if($event.direction == 2) {
         console.log("sliding forward ", $event);
         this.currentHole += 1;
    } else if($event.direction == 4) {
         console.log("sliding back ", $event);
         this.currentHole -= 1;
         slideNextHole = false;
    }

    this.gameFlowSrv.saveHoleScores(0, holeN, this.holeResults);
    //sliding after save to avoid screen corruption:
    if(slideNextHole) {
      this.holeResults = [];
      this.slides.slideNext();
      this.slides.lockSwipeToNext(true);
    } else {
      let tempHoleRes: any;
      this.getPrevValue(holeN).then(
          value => {
            console.log("Promise value", value);
            this.holeResults = value;
          }
    );

      //console.log("Fetched res for prev hole:", tempHoleRes);
      //this.holeResults.join(tempHoleRes);
      this.slides.slidePrev();
    }
    //this.slides.slideNext();

  }

  getPrevValue(holeN) : any {
    return this.gameFlowSrv.fetchHoleScore(0, holeN - 1).then(data => {
        var value =  JSON.parse(data);
        return value.playerScores;
      });
  }


}
