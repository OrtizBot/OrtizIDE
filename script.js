   // Function to be called when the "Run Code" button is clicked
function runCode() {
    // Your code to run the generated Python code goes here
    console.log("Running Python Code...");
}


// Function to be called when the "Export Python Code" button is clicked
function exportPythonCode() {
    // Generate Python code from Blockly workspace
    var code = Blockly.Python.workspaceToCode(workspace);

    // Display the generated Python code (you can modify this part as needed)
    console.log("Generated Python Code:\n" + code);
    alert(code);
    // You can use 'code' for further processing or send it to your Python environment.
    runCode(); // Call the runCode function after exporting Python code
}

// Define the custom "Move Motors" block
Blockly.Blocks['move_motors'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Move Motors")
            .appendField("Left Motor:")
            .appendField(new Blockly.FieldNumber(0, -100, 100), "left_motor_speed")
            .appendField("%, Right Motor:")
            .appendField(new Blockly.FieldNumber(0, -100, 100), "right_motor_speed")
            .appendField("%");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Move motors with specified speeds.");
        this.setHelpUrl("");
    }
};

// Define the Python code generator for the "Move Motors" block
Blockly.Python['move_motors'] = function (block) {
    var leftMotorSpeed = block.getFieldValue('left_motor_speed');
    var rightMotorSpeed = block.getFieldValue('right_motor_speed');
    var code = 'move_motors(' + leftMotorSpeed + ', ' + rightMotorSpeed + ')\n';
    return code;
};


Blockly.Blocks['controls_simple_for'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("repeat")
            .appendField(new Blockly.FieldNumber(10, 0), "TIMES")
            .appendField("times");
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Simple loop that repeats a specific number of times.");
        this.setHelpUrl("");
    }
};

Blockly.Python['controls_simple_for'] = function (block) {
    var times = block.getFieldValue('TIMES');
    var branch = Blockly.Python.statementToCode(block, 'DO');
    var code = 'for _ in range(' + times + '):\n' + branch;
    return code;
};

var workspace = Blockly.inject('blocklyDiv', {
    media: 'https://unpkg.com/blockly/media/',
    toolbox: '<xml>' +
        '<category name="Control">' +
        '<block type="controls_if"></block>' +
        '<block type="controls_whileUntil"></block>' +
        '<block type="move_motors"></block>' +
        '</category>' +
        '<category name="Math">' +
        '<block type="math_number"></block>' +
        '<block type="math_arithmetic"></block>' +
        '</category>' +
        '<category name="Compare">' +
        '<block type="logic_compare"></block>' +
        '<block type="logic_operation"></block>' +
        '</category>' +
        '<category name="Variables">' +
        '<block type="variables_get"></block>' +
        '<block type="variables_set"></block>' +
        '<block type="procedures_defnoreturn"></block>' +
        '<block type="procedures_callnoreturn"></block>' +
        '</category>' +
        '<category name="Lists">' +
        '<block type="lists_create_empty"></block>' +
        '<block type="lists_repeat"></block>' +
        '<block type="lists_length"></block>' +
        '<block type="lists_getIndex"></block>' +
        '<block type="lists_setIndex"></block>' +
        '</category>' +
        '<category name="Misc">' +
        '<block type="text"></block>' +
        '</category>' +
        '</xml>',
    grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    trashcan: true
});
