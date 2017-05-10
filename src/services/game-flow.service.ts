import { Injectable, Component } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class GameFlowSrv {
  private storage : Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  saveHoleScores(gameId, holeNumber, playerScores) {
    let key = "hole" + holeNumber;
    let holeScore = {
      gameId: gameId,
      holeNumber: holeNumber,
      playerScores: playerScores
    };
    console.log("Expecting to be stored:", key, holeScore);
    this.storage.set(key, JSON.stringify(holeScore));
  }

  fetchHoleScore(gameId, holeNumber) {
    let key = "hole" + holeNumber;

    let v = this.storage.get(key);
    console.log("Fetching from srv for key:", key, v);
    return v;

  }
}
