Blockly.defineBlocksWithJsonArray([
    //Game0 收发室初级
    {
        "type": "game0_pick",
        "message0": "从接收处拿取排在第一的信件",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 315,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "game0_put",
        "message0": "将拿到的信件放到发放处",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 315,
        "tooltip": "",
        "helpUrl": ""
    },
    //Game1 收发室高级
    {
        "type": "game1_pick",
        "message0": "从接收处拿取排在第一的信件",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 315,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "game1_put",
        "message0": "将拿到的信件放到发放处",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 315,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "game1_pick_from_table",
        "message0": "从办公桌上拿取信件",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 100,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "game1_put_to_table",
        "message0": "将拿到的信件放到办公桌上",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 100,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "game1_loop",
        "message0": "重复做 %1 次 %2 %3",
        "args0": [
          {
            "type": "field_number",
            "name": "TIMES",
            "value": 0,
            "min": 0,
            "check": "Number"
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "DO"
          }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      }
]
);
Blockly.JavaScript['game1_loop'] = function(block){
    var loop_content = Blockly.JavaScript.statementToCode(block, 'DO').trim();
    var times  = block.getFieldValue('TIMES');

    let code = "";
    for(let i=0;i<times;i++){
        code += loop_content;
    }
    return code;

}
Blockly.JavaScript['game1_pick'] = function (block) {    
    return '1';
};
Blockly.JavaScript['game1_put'] = function (block) {
    return '2';
};
Blockly.JavaScript['game1_pick_from_table'] = function (block) {
    return '3';
};
Blockly.JavaScript['game1_put_to_table'] = function (block) {
    return '4';
};
//判断结果是否为‘141232’*3遍


Blockly.JavaScript['game0_pick'] = function (block) {
    return '1';
};
Blockly.JavaScript['game0_put'] = function (block) {
    return '0';
};
//判断结果是否为‘101010’
