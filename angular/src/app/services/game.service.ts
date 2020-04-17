import { Injectable } from '@angular/core';
import { IGame } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameList: IGame[];
  constructor() {
    this.gameList = [
      {
        id: 0, name: "收发室初级",
        description: "欢迎来到收发室，你作为新加入的员工，现在有一个任务等待你去完成。\
  你需要将接收处的信件依次放到发放处" ,
        hint: "Hint： 注意手中只能拿一封信件，若再拿一封，则前一封会被丢弃。",
        toobox:"<xml>"+
        "<category name='基本动作' colour='120'>"+
        "<block type='game1_pick'></block>"+
        "<block type='game1_put'></block>"+
        "</category></xml>",
        xmlData: ""
      },
      {
        id: 1, 
        name: "收发室高级", 
        description: "欢迎回到收发室，这次等待着你的是更艰巨的挑战。\n \
  由于你上次的出色表现，科长决定让你来整理这些失序的信件。\n \
  相信你已经注意到了，这些信件中每两个信件之间的顺序被颠倒了，那么希望你借助新置办的办公桌将这些信件在发放处排列好。" , 
        hint: "Hint： 注意手中只能拿一封信件，若再拿一封，则前一封会被丢弃。",
        toobox:"<xml>"+
        "<category name='基本动作' colour='120'>"+
        "<block type='game1_pick'></block>"+
        "<block type='game1_put'></block>"+
        "</category></xml>",
        xmlData: ""
      }
    ];
  }

  getGame(id: number): IGame {
    return this.gameList[id];

  }
}
