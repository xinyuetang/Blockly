Blockly.defineBlocksWithJsonArray([
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
    }
]
);
Blockly.JavaScript['game1_pick'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'this is game1 pick;\n';
    return code;
};
Blockly.JavaScript['game1_put'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'this is game1 put;\n';
    return code;
};