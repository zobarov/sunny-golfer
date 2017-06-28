import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Pipe, PipeTransform} from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-game-table',
  templateUrl: 'game-table.html',
})
export class GameTable {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameTable');
  }

   itemSelected(item) {
    console.log('itemSelected for GameTable' + item);
  }

}

@Pipe({name: 'demoNumber'})
export class DemoNumber implements PipeTransform {
  transform(value, args:string[]) : any {
    let res = [];
    for (let i = 0; i < value; i++) {
        res.push(i);
      }
      return res;
  }
}
