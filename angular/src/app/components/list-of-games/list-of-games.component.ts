import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/models/game';

@Component({
  selector: 'app-list-of-games',
  templateUrl: './list-of-games.component.html',
  styleUrls: ['./list-of-games.component.css']
})
export class ListOfGamesComponent implements OnInit {
  gameList: IGame[];
  displayedColumns: string[] = ['id', 'name', 'type', 'level'];

  constructor(private gameService: GameService) {
    this.gameList=this.gameService.getGameList();
  }

  ngOnInit(): void {
  
  }
}
