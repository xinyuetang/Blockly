import { Component, OnInit } from '@angular/core';

import * as Blockly from 'blockly';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    Blockly.Blocks['game1_pick'] = {
      init: function () {
        this.jsonInit({
          "type": "game1_pick",
          "message0": "从接收处拿取排在第一的信件",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "",
          "helpUrl": ""
        });
      }
    };
    Blockly.Blocks['game1_put'] = {
      init: function () {
        this.jsonInit({
          "type": "game1_put",
          "message0": "将拿到的信件放到发放处",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 315,
          "tooltip": "",
          "helpUrl": ""
        });
      }
    };
    const blocklyDiv = document.getElementById('blocklyDiv');

    Blockly.inject(blocklyDiv, {
      readOnly: false,
      media: '../media/',
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: `
      <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">
      <category name="基本动作">
        <block type="game1_pick"></block>
        <block type="game1_put"></block>
      </category>  
      </xml>
        `
    } as Blockly.BlocklyOptions);
  }

}
