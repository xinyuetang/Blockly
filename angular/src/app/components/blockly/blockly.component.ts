import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../../services/game.service';
import { IGame } from 'src/app/models/game';

// import * as Blockly from 'blockly';
declare var Blockly: any;

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {
  gameId: number;
  game: IGame;
  workspace: any;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location){
      this.getGame();
  }

  ngOnInit(): void {
    // this.workspace = Blockly.inject('blocklyDiv', {
    //   readOnly: false,
    //   media: '../media/',
    //   trashcan: true,
    //   move: {
    //     scrollbars: true,
    //     drag: true,
    //     wheel: true
    //   },
    //   toolbox: this.game.toobox,
    // });

    // tslint:disable-next-line: prefer-const
    // let bt = document.getElementById('bt');
    // bt.addEventListener('click', () => {
    //   console.log('the code:\n');
    //   console.log(Blockly.JavaScript.workspaceToCode(this.workspace));
    // });
    /*resizable */
    // const blocklyArea = document.getElementById('blocklyArea');
    // const blocklyDiv = document.getElementById('blocklyDiv');
    // var onresize = function() {
    //   // Compute the absolute coordinates and dimensions of blocklyArea.
    //   var element :HTMLElement=blocklyArea;
    //   var x = 0;
    //   var y = 0;
    //   // do {
    //     x += element.offsetLeft;
    //     y += element.offsetTop;
    //     // element =  element.offsetParent;
    //   // } while (element!=null);
    //   // Position blocklyDiv over blocklyArea.
    //   blocklyDiv.style.left = x + 'px';
    //   blocklyDiv.style.top = y + 'px';
    //   blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    //   blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    //   Blockly.svgResize(this.workspace);
    // };
    //  window.addEventListener('resize', onresize, false);
  }
  getGame(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id');
    this.game = this.gameService.getGame(this.gameId);
  }
}


