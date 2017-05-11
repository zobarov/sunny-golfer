import { Injectable, Component } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class GameSetupSrv {

  private storage : Storage;

  private gameNumber: any;

  constructor(storage: Storage) {
    this.storage = storage;
    this.gameNumber = 0;
  }

  generateGameId() {
    return "game_" + new Date();
  }

  generateGameIdPromise() : string {
    let lastGameSettings :any;
    this.storage.get("last_game_settings");
   /* .then(settings => {
      if(settings != null) {
        lastGameSettings = settings;
        return settings.gameId;
      }
    });*/
    console.log("Fetch game settings=", lastGameSettings);

    if(lastGameSettings == null) {
      console.log("No last game settings...");
      this.gameNumber++;
      let gameId = "game_" + this.gameNumber;

      let settings = {
        name: "last_game_settings",
        gameNumber: this.gameNumber,
        gameId : gameId
      }
      this.storage.set("last_game_settings", JSON.stringify(settings));
      return "game_" + this.gameNumber;
    } else {
      //return lastGameSettings.gameId;
    }

  }
}
