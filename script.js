   // Function to be called when the "Run Code" button is clicked
function runCode() {
    // Your code to run the generated Python code goes here
    console.log("Running Python Code...");
}
// Function to be called when the "Export Arduino Code" button is clicked
function exportArduinoCode() {
    // Generate Arduino code from Blockly workspace
    var code = generateArduinoCode();

    // Open a new window to display the code
    var codeWindow = window.open('', '_blank');
    codeWindow.document.write('<pre>' + code + '</pre>');
}

// Function to generate Arduino code from Blockly workspace
function generateArduinoCode() {
    // Generate Arduino code from Blockly workspace
    var arduinoCode = '';

    // Iterate through all blocks in the workspace
    var blocks = workspace.getAllBlocks();
    blocks.forEach(function (block) {
        // Check if the block has a corresponding Arduino code generator
        if (Blockly.Python[block.type]) {
            // Generate Arduino code for the block and append it to the overall code
            arduinoCode += Blockly.Python[block.type](block) + '\n';
        }
    });

    return arduinoCode;
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

// Define the custom "Move Forward" block
Blockly.Blocks['move_forward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Move Forward")
            .appendField("Duration:")
            .appendField(new Blockly.FieldNumber(3000), "duration")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Move forward for a specified duration.");
        this.setHelpUrl("");
    }
};

// Define the Python code generator for the "Move Forward" block
Blockly.Python['move_forward'] = function (block) {
    var duration = block.getFieldValue('duration');
    var code = 'moveForward(' + duration + ');\n';
    return code;
};

// Define the custom "Move Backward" block
Blockly.Blocks['move_backward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Move Backward")
            .appendField("Duration:")
            .appendField(new Blockly.FieldNumber(3000), "duration")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Move backward for a specified duration.");
        this.setHelpUrl("");
    }
};

// Define the Python code generator for the "Move Backward" block
Blockly.Python['move_backward'] = function (block) {
    var duration = block.getFieldValue('duration');
    var code = 'moveBackward(' + duration + ');\n';
    return code;
};

// Define the custom "Turn Left" block
Blockly.Blocks['turn_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Turn Left")
            .appendField("Duration:")
            .appendField(new Blockly.FieldNumber(2000), "duration")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Turn left for a specified duration.");
        this.setHelpUrl("");
    }
};

// Define the Python code generator for the "Turn Left" block
Blockly.Python['turn_left'] = function (block) {
    var duration = block.getFieldValue('duration');
    var code = 'turnLeft(' + duration + ');\n';
    return code;
};

// Define the custom "Turn Right" block
Blockly.Blocks['turn_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Turn Right")
            .appendField("Duration:")
            .appendField(new Blockly.FieldNumber(2000), "duration")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Turn right for a specified duration.");
        this.setHelpUrl("");
    }
};

// Define the Python code generator for the "Turn Right" block
Blockly.Python['turn_right'] = function (block) {
    var duration = block.getFieldValue('duration');
    var code = 'turnRight(' + duration + ');\n';
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
        '<block type="move_forward"></block>' +
        '<block type="move_backward"></block>' +
        '<block type="turn_left"></block>' +
        '<block type="turn_right"></block>' +
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
