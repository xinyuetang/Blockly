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
  你需要将<span class='emphasize'>接收处</span>的信件依次放到<span class='emphasize'>发放处</span>" ,
        hint: "Hint： 注意手中只能拿一封信件，若再拿一封，则前一封会被丢弃。",
        toobox:"<xml>"+
        "<category name='基本动作' colour='240'>"+
        "<block type='game0_pick'></block>"+
        "<block type='game0_put'></block>"+
        "</category></xml>",
        xmlData: "",
        type:"2D",
        level:"简单",
        url:"/game/0",
        run: function(code: string):boolean{
          return (code=="101010");
        }
      },
      {
        id: 1, 
        name: "收发室高级", 
        description: "欢迎回到收发室，这次等待着你的是更艰巨的挑战。\n \
  由于你上次的出色表现，科长决定让你来整理这些<span class='emphasize'>失序的</span>信件。\n \
  相信你已经注意到了，这些信件中<span class='emphasize'>每两个信件之间</span>的顺序被<span class='emphasize'>颠倒</span>了，\
  那么希望你借助新置办的<span class='emphasize'>办公桌</span>将这些信件在发放处排列好。" , 
        hint: "Hint： 注意手中只能拿一封信件，若再拿一封，则前一封会被丢弃。",
        toobox:"<xml>"+
        "<category name='基本动作' colour='240'>"+
        "<block type='game1_pick'></block>"+
        "<block type='game1_put'></block>"+
        "<block type='game1_pick_from_table'></block>"+
        "<block type='game1_put_to_table'></block>"+
        "</category>"+
        "<category name='魔法动作' colour='270'>"+
        "<block type='game1_loop'></block>"+
        "</category>"+
        "</xml>",
        xmlData: "",
        type:"2D",
        level:"中等",
        url:"/game/1",
        run: function(code: string):boolean{
          return (code=="101010");
        }
      }
    ];
  }

  getGame(id: number): IGame {
    return this.gameList[id];
  }
  getGameList():IGame[] {
    return this.gameList;
  }
  // upsertGame(program: IGame): void {
  //   const tmp: IGame = this.getGame(program.id);
  //   if (tmp) {
  //     tmp.xmlData = program.xmlData;
  //   } else {
  //     this.programList.push(program);
  //   }
  // }

}
