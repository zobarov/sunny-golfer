import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { GameFlowSrv, GameSetupSrv } from '../../services/services';

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

  currentGameId : string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public gameFlowSrv: GameFlowSrv,
              private gameSetupSrv: GameSetupSrv) {
    //this.numberOfHoles =  Array(5).fill().map((x,i)=>i);
    this.currentHole = 1;
    this.numberOfHoles = Array(18).fill(this.currentHole).map((x,currentHole)=>currentHole+1);
    this.players = ['Vlad', 'Alex'];
    this.holeResults =["", ""];

    this.currentGameId = gameSetupSrv.generateGameId();
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
    console.log("Game ID=", this.currentGameId);
  }

  isAvailableToGoNextHole() : boolean {
    let warning = false;
    if(this.holeResults[0] === "" || this.holeResults[0] === "0") {
      warning = true;
    }
    if(this.holeResults[1] === "" || this.holeResults[1] === "0") {
      warning = true;
    }
    //TODO: higlighting here:
    return !warning;
  }

  slideChanged($event) {
    let slideNextHole = true;
    if(this.isAvailableToGoNextHole()) {
      this.slides.lockSwipeToNext(false);
        if($event.direction == 2) {
          if(this.currentHole == 18) {
            return; //to prevent sliding fwd on the last hole
          }
          let nextHoleIsSet = this.gameFlowSrv.isHoleScoreExist(this.currentHole + 1);
          let lockNext = false;
          if(nextHoleIsSet) {
              this.holeResults = this.gameFlowSrv.fetchOneHoleScore(this.currentHole + 1);
          } else {
              this.gameFlowSrv.saveOneHoleScore(this.currentHole, this.holeResults);
              this.holeResults = ["", ""];
              lockNext = true;
          }
          this.currentHole += 1;
          this.slides.slideNext();
          this.slides.lockSwipeToNext(lockNext);
        }
        return;
    }
    if($event.direction == 4) {
      if(this.currentHole == 1) {
        return; //to prevent sliding back on first hole
      }
      this.currentHole -= 1;
      slideNextHole = false;
      this.holeResults = this.gameFlowSrv.fetchOneHoleScore(this.currentHole);
      this.slides.slidePrev();
    }
  }
}
