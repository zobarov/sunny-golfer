import { Injectable } from '@angular/core';
//import { Http, Response} from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class GameFlowSrv {
  private storage : Storage;

  private holeScoreArray: HoleResult [];

  constructor(storage: Storage) {
    this.storage = storage;
    this.holeScoreArray = Array(18);
    for(let i=0; i < this.holeScoreArray.length; i++) {
      this.holeScoreArray[i] = new HoleResult();
    }
    console.log("holeScoreArray:", this.holeScoreArray);
  }

  saveOneHoleScore(holeIndex: number, scores: string[]) : boolean {
    if(holeIndex < 1) {
      return false;
    }
    this.holeScoreArray[holeIndex - 1].update(scores);
    console.log("Saved score for hole:" + holeIndex + " is:", this.holeScoreArray[holeIndex - 1].scores());
    return true;
  }

  fetchOneHoleScore(holeIndex) : string[] {
    if(holeIndex < 1) {
      return new HoleResult().scores();
    }
    if(this.holeScoreArray[holeIndex - 1].isScoreSet()) {
      return this.holeScoreArray[holeIndex - 1].scores();
    } else {
      return new HoleResult().scores();
    }
  }

  isHoleScoreExist(holeIndex : number) : boolean {
    if(holeIndex < 1) {
      return false;
    }
    return this.holeScoreArray[holeIndex].isScoreSet();
  }

  saveHoleScores(gameId, holeNumber, playerScores) {
    let key = gameId + "__h_" + holeNumber;
    let holeScore = {
      gameId: gameId,
      holeNumber: holeNumber,
      playerScores: playerScores
    };
    console.log("Expecting to be stored:", key, holeScore);
    this.storage.set(key, JSON.stringify(holeScore));
  }

  fetchHoleScore(gameId, holeNumber) {
    let key = gameId + "__h_" + holeNumber;

    let v = this.storage.get(key);
    console.log("Fetching from srv for key:", key, v);
    return v;

  }


}

class HoleResult {
  private isFilled: boolean;
  private playersScore: string[];

  constructor() {
    this.isFilled = false;
    this.playersScore = ["", ""];
  }

  update(scores: string[]) {
    this.playersScore = scores;
    this.isFilled = true;
  }

  isScoreSet() {
    return this.isFilled;
  }

  scores() {
    return this.playersScore;
  }
}
