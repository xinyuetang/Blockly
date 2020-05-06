import { Component, OnInit, ViewEncapsulation, OnDestroy,Inject } from '@angular/core';
import { Location } from '@angular/common';
import { GameService } from '../../services/game.service';
import { IGame } from 'src/app/models/game';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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


export class BlocklyComponent implements OnInit, OnDestroy {
  gameId: number;
  game: IGame;
  workspace: any;
  gameList: IGame[];
  private someHtmlCode = '';
  navigationSubscription: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    public dialog: MatDialog) {
    this.someHtmlCode = '<p [innerHTML]="game.description">';

    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.refresh();
      }
    });

  };

  refresh() {
    this.getGame();
    if (this.workspace) {
      this.workspace.clear();
      this.workspace.updateToolbox(this.game.toobox);
    }
    
    //若有历史记录
    if (this.game.xmlData) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.game.xmlData),
        this.workspace
      );
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


  ngOnInit(): void {
    this.gameList = this.gameService.gameList;
    this.getGame();
    this.workspace = Blockly.inject('blocklyDiv', {
      readOnly: false,
      media: '../media/',
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      maxBlocks: 20,
      toolbox: this.game.toobox
    });
    //若有历史记录
    if (this.game.xmlData) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.game.xmlData),
        this.workspace
      );
    }


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
    this.gameService.getHistory(this.gameId).subscribe((data) => {
      this.game.xmlData = data.history;
    });
  }

  run() {
    let code = Blockly.JavaScript.workspaceToCode(this.workspace);
    let ispass = this.game.run(code);
    this.openDialog(ispass);
    console.log(code);
  }
  clear(): void {
    this.workspace.clear();
    console.log("cleared")
  }
  save(): void {
    this.game.xmlData = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.workspace)
    );
    this.gameService.saveHistory(this.gameId, this.game.xmlData);
    console.log('saving the program - ', JSON.stringify(this.game.name));

  }
  last() {
    this.router.navigate(['/game/' + (this.gameId - 1)]);
  }
  next() {
    this.router.navigate(['/game/' + (this.gameId + 1)]);
  }
  openDialog(ispass:boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {ispass:ispass}
    });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent {
  constructor(
    // public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}

