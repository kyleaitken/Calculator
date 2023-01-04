// Add button listeners
// respond to click or keyboard input 

const opDisplay = document.querySelector('.op-display');
const currValue = document.querySelector('.curr-display');
const tempDisplay = document.querySelector('.temp-display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll('.button');

// let opDisplayNum = '';
//let currDisplayNum = '';
let isFloat = false;
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
        evaluate(e.target.innerText);
    });
});


// Evaluates the input 
function evaluate(input) {
    if (checkIfOperation(input)) {
        //its an operation
        if (prevInput === 'number') {
            // good to go, process
            if (input === '=') {
                // evaluate 
                // clear display 
            } else {
                opDisplay += (input + ' ');
                if (result != null) {
                    processOperation(input);
                } else {
                    if (isFloat) {
                        result = parseFloat(currNumber);
                    } else {
                        result = parseInt(currNumber);
                    }
                }
                currNumber = '';
                isFloat = false;
                currValue = '';
                tempDisplay = result.toString();
                prevInput === 'operation'; 
            }
        } else {
            return; // bad input, two operations in a row
        }

    } else {
        // its a number 
        if (input === '.') {
            if (isFloat === true) {
                return // bad input, already has a dot, dont add 
            } else {
                // add to display
                currDisplayNum += input;
                currNumber += input;
                isFloat = true; 
            }
        } else {
            // add number to display(s)
            currDisplayNum += input;
            currNumber += input;
        }
        prevInput = 'number';
    }


}



// Checks if the input is an operation value 
function checkIfOperation(input) {
    let isOperation = false;
    for (let i=0; i<operations.length; i++) {
        if (operations[i].innerHTML.includes(input)) {
            isOperation = true;
            break;
        }
    }
    return isOperation;
}


// adds the operation to displays 
function processOperation(input) {
    var newVal;
    if (isFloat) {
        newVal = parseFloat(currNumber);
    } else {
        newVal = parseInt(currNumber);
    }

    if (input === '+') {
        result += currNumber;
    } else if (input === '-') {
        result -= currNumber;
    } else if (input === '/') {
        result / currNumber;
    } else if (input === 'x') {
        result * currNumber;
    } else if (input === 'c') {
        clearDisplays();
    }

}


function clearDisplays() {
    result = 0;
    tempDisplay = '0';
    currValue = '';
    opDisplay = '';
    isFloat = false;
    prevInput = 'none';
}