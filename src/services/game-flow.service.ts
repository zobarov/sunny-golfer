import { Injectable } from '@angular/core';
//import { Http, Response} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Game, HoleResult } from '../domain/Game';

@Injectable()
export class GameFlowSrv {
  private storage : Storage;
  private game: Game;
  //private holeScoreArray: HoleResult [];

  constructor(storage: Storage) {
    this.storage = storage;
    this.game = new Game();
  }

  saveOneHoleScore(holeIndex: number, scores: string[]) : boolean {
    if(holeIndex < 1) {
      return false;
    }
    //var holeRes = new HoleResult().build(holeIndex, scores);
    this.game.saveHole(holeIndex -1, scores);
    //this.holeScoreArray[holeIndex - 1].update(scores);
    console.log("Saved score for hole:" + holeIndex + " is:", this.game.getScore(holeIndex - 1));
    return true;
  }

  fetchOneHoleScore(holeIndex) : string[] {
    if(holeIndex < 1) {
      return new HoleResult().scores();
    }
    return this.game.getScore(holeIndex - 1);
  }

  isHoleScoreExist(holeIndex : number) : boolean {
    if(holeIndex < 1) {
      return false;
    }
    return this.game.isScoreSet(holeIndex);
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


