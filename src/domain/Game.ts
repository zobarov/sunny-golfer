import { Injectable } from '@angular/core';

@Injectable()
export class Game {
  private holeScoreArray: HoleResult [];

  private holes : HoleResult[] = [new HoleResult()];

  constructor() {
    console.log("Initializing a game holes=", this.holes);
    this.holeScoreArray = Array(18);
    for(let i=0; i < this.holeScoreArray.length; i++) {
      this.holeScoreArray[i] = new HoleResult();
    }
  }

  saveHole(holeIndex: number, scores: string[]) {
    let hr = new HoleResult().build(holeIndex, scores);
    this.holeScoreArray[holeIndex] = hr;
  }

  isScoreSet(holeIndex: number) : boolean {
    return this.holeScoreArray[holeIndex].isScoreSet();
  }

  getScore(holeIndex : number) : string[] {
    if(this.holeScoreArray[holeIndex].isScoreSet()) {
      return this.holeScoreArray[holeIndex].scores()
    }
    return new HoleResult().scores();
  }
}

export class HoleResult {
  private isFilled: boolean;
  private holeNumber: number;
  private playersScore: string[];

  constructor() {
    this.isFilled = false;
    this.playersScore = ["", ""];
  }

  build(holeNum: number, scores: string[]) : HoleResult {
    this.holeNumber = holeNum;
    this.playersScore = scores;
    this.isFilled = true;
    return this;
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
