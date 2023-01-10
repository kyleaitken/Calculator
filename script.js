/**
* DOM Selectors
*/
let opDisplay = document.querySelector('.op-display');
let currDisplay = document.querySelector('.curr-display');
let tempDisplay = document.querySelector('.temp-display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll('.button');

/*
* Global Variables
*/
let prevOp = null;
let prevInputWasOperation = null;
let isFloat = false;
let resultIsFloat = false;
let result = null;
let currNumber = '';

/*
* Valid key inputs 
*/
const validNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const validOps = ['enter', '=', 'c', '+', '-', 'x', '/'];


/*
* Listeners for button clicks or keypresses
*/
document.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase();
    if (key === 'enter') {
        evaluate('=');
    } else if (validNums.includes(key) || validOps.includes(key)) {
        evaluate(key);
    }
}); 

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        evaluate(e.target.innerText.toLowerCase());
    });
});


// evaluate(input) evaluates the the input provided by the user based on it's type as
//   either a number or operand 
function evaluate(input) {
    console.log("evaluating: " + input);
    if (input === 'c') {
        clearDisplays();
    } else {
        if (isOperation(input)) {
            handleOperation(input);
        } else {
            handleNumber(input);
        }
    }
}


// handleOperation(input) processes the input provided if it was an operand. Returns if
//   the previous input was an operand. If operand is '=', allows for next input to also
//   be an operand
function handleOperation(input) {
    if (!prevInputWasOperation) { 
        opDisplay.innerText += (' ' + currNumber + ' ' + input);
        if (result != null) {
            processOperation();
        } else {
            if (isFloat) {
                result = parseFloat(currNumber);
            } else {
                result = parseInt(currNumber);
            }
        }
        // Reset values
        prevOp = input;
        currNumber = '';
        isFloat = false;
        currDisplay.innerText = '0';
        tempDisplay.innerText = result.toString();
        if (input === '=') {
            prevInputWasOperation = false;
        } else {
            prevInputWasOperation = true; 
        }
    } else {
        return; // bad input, two operations in a row
    }
}


// handleNumber(input) processes the input if it's a number value by adding it
//   to the display and parsing it as a float value if needed 
function handleNumber(input) {
    // Handle div by 0
    if (input === '0' && prevInputWasOperation && prevOp === '/') {
        alert("You can't divide by 0");
        return;
    } 

    if (input === '.') {
        if (isFloat === true) {
            return // can't have 2 '.' in a value 
        } else {
            // add to display
            currDisplay.innerText += input;
            currNumber += input;
            isFloat = true; 
        }
    } else {
        // add number to display(s)
        if (currDisplay.innerText === '0') {
            currDisplay.innerText = input;
        } else {
            currDisplay.innerText += input;
        }
        currNumber += input;
    }
    prevInputWasOperation = false;
}


// isOperation(input) checks if the input is an operand. Returns false if 
//   it is a number
function isOperation(input) {
    if (validOps.includes(input)) {
        return true;
    } else {
        return false;
    }
}


// processOperation() performs the operation on the previous number value and the 
//   current number value
function processOperation() {
    var newVal;
    if (isFloat) {
        newVal = parseFloat(currNumber);
    } else {
        newVal = parseInt(currNumber);
    }

    if (prevOp === '+') {
        result += newVal;
    } else if (prevOp === '-') {
        result -= newVal;
    } else if (prevOp === '/') {
        result /= newVal;
    } else if (prevOp === 'x') {
        result *= newVal;
    } 
}



// clearDisplays() resets the values and clears the display 
function clearDisplays() {
    prevOp = null;
    prevInputWasOperation = null;
    result = null;
    tempDisplay.innerText = '0';
    currDisplay.innerText = '0';
    opDisplay.innerText = '';
    isFloat = false;
    resultIsFloat = false;
    currNumber = '';
}