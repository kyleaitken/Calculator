// Add button listeners
// respond to click or keyboard input 

let opDisplay = document.querySelector('.op-display');
let currDisplay = document.querySelector('.curr-display');
let tempDisplay = document.querySelector('.temp-display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll('.button');

let prevOp = null;
let isFloat = false;
let resultIsFloat = false;
let prevInput = 'none';
let result = null;
let currNumber = '';

// Add listeners to keys, evaluate if correct key is used 
document.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase();
    if (key === 'enter') {
        evaluate('=');
    } else if (key === '=' || key === '-' || key === '+' || key === '/' || key === 'x' || 
    key === 'c' || key === '.' || (key >= '0' && key <= '9')) {
        evaluate(key);
    }
}); 

// add listeners to button clicks and evaluate 
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        evaluate(e.target.innerText.toLowerCase());
    });
});


// Evaluates the input 
function evaluate(input) {
    console.log("evaluating: " + input);
    if (input === 'c') {
        clearDisplays();
    } else {
        if (checkIfOperation(input)) {
            if (prevInput === 'number') {
                if (input === '=') {
                    // evaluate 
                    // clear display 
                } else {
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
                    prevOp = input;
                    currNumber = '';
                    isFloat = false;
                    currDisplay.innerText = '0';
                    tempDisplay.innerText = result.toString();
                    prevInput = 'operation'; 
                }
            } else {
                console.log(prevInput);
                return; // bad input, two operations in a row
            }

        } else {
            // its a number 
            if (input === '.') {
                if (isFloat === true) {
                    return 
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
            prevInput = 'number';
        }
    }

}



// Checks if the input is an operation value 
function checkIfOperation(input) {
    let isOperation = false;
    for (let i=0; i<operations.length; i++) {
        if (operations[i].innerText.includes(input)) {
            isOperation = true;
            break;
        }
    }
    return isOperation;
}


// adds the operation to displays 
function processOperation() {
    //have result, currNumber, and prevOp
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


function clearDisplays() {
    prevOp = null;
    result = null;
    tempDisplay.innerText = '0';
    currDisplay.innerText = '0';
    opDisplay.innerText = '';
    isFloat = false;
    resultIsFloat = false;
    prevInput = 'none';
}