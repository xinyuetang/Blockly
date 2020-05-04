import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../../services/game.service';
import { IGame } from 'src/app/models/game';

// import * as Blockly from 'blockly';
declare var Blockly: any;

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css'],
  styles: ['.emphasize {\
    border:1px solid gainsboro;\
    color: #FF3399;     \
    background-color: #F8F8F8;  \
    border-radius: 5px;\
}'],
  template: '<p class="emphasize" [innerHTML]="someHtmlCode"></p>',
  encapsulation: ViewEncapsulation.None,
})
export class BlocklyComponent implements OnInit {
  gameId: number;
  game: IGame;
  workspace: any;
  private someHtmlCode = '';

  
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location)
    {
      this.getGame();
      this.someHtmlCode= '<p [innerHTML]="game.description">';
  }


  ngOnInit(): void {
    this.workspace = Blockly.inject('blocklyDiv', {
      readOnly: false,
      media: '../media/',
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: this.game.toobox,
    });

    //若有历史记录
    if (this.game.xmlData) {
      this.workspace.clear();
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.game.xmlData),
        this.workspace
      );
    }

    let bt_run = document.getElementById('bt_run');
    let bt_clear = document.getElementById('bt_clear');
    let bt_save  = document.getElementById('bt_save');

    bt_run.addEventListener('click', () => {
      let code = Blockly.JavaScript.workspaceToCode(this.workspace);
      console.log(code);
      this.game.run(code);
      this.saveGame();
    });

    bt_clear.addEventListener('click',()=>{
      this.workspace.clear();
      this.saveGame();
    });

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
  saveGame(): void {
    this.game.xmlData = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.workspace)
    );
    console.log(this.game.xmlData);
    console.log('saving the program - ', JSON.stringify(this.game.name));
    //this.programService.upsertOne(this.program);
  
  }
}


