import { Component, OnInit, ViewEncapsulation, OnDestroy, Inject, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { IGame } from 'src/app/models/game';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationComponent } from '../animation/animation.component';
import {socket,remoteUser} from '../vedio-room/client.js';


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


  @ViewChild('animation')
  animation: AnimationComponent;

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
    };

    this.workspace.addChangeListener(this.onOperate);

    socket.on('SERVER_USER_EVENT', function (msg) {
      const type = msg.type;
      console.log(type);
      if(type== 'OPERATING'){
        console.log("---blocky receive change---");

        console.log(msg);//to display msg

        var content = msg.payload.content;
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(content),
          this.workspace
        );
      }
  });
  }

  onOperate(event) :void{
    var workspace  = Blockly.Workspace.getById(event.workspaceId)
    var tmp = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      var msg = {
        type: 'OPERATING',
        payload: {
            content: tmp,
            target: remoteUser
        }};
      socket.emit('CLIENT_USER_EVENT', JSON.stringify(msg));
      console.log("--- blockly change listener---");

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
    console.log(code);
    let ispass = this.game.run(code);
    //console.log(code);
    this.animation.run(code);//运行动画
    this.openDialog(ispass);//展出结果对话框
    this.gameService.addRecord(this.gameId, ispass).subscribe((data) => {
      console.log(data);
    });//添加游戏记录
  }


  clear(): void {
    this.workspace.clear();
    console.log('cleared');
    this.animation.clear();
  }
  save(): void {
    this.game.xmlData = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.workspace)
    );
    this.gameService.saveHistory(this.gameId, this.game.xmlData).subscribe((data) => {
      if (data != null) console.log('saving the program - ', JSON.stringify(this.game.name));
    });


  }
  last() {
    this.router.navigate(['/game/' + (this.gameId - 1)]);
  }
  next() {
    this.router.navigate(['/game/' + (this.gameId + 1)]);
  }
  openDialog(ispass: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { ispass: ispass }
    });

  }


}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

