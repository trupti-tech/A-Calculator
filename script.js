let textarea = document.getElementById('textarea');
let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let clearButton = document.getElementById('clear');
let clearAllButton = document.getElementById('clearAll');
let equalsButton = document.getElementById('equals');
let historyContainer = document.getElementById("container");
let clearHistory = document.getElementById("clearHistory");
let shouldClear = false;

clearHistory.addEventListener('click', () => {
    historyContainer.innerHTML = '';
})
const setText = (e) => {
    textarea.value = e.innerText.split("=")[0].trim();
}


const clearOne = () => {
    textarea.value = textarea.value.slice(0, -1);
    shouldClear = false;
}

const clearAll = () => {
    textarea.value = '';
    shouldClear = false;
}

const evaluateExpression = () => {
    historyContainer.innerHTML += 
    `<div class='c' onclick="setText(this)"><p class='cal'>${textarea.value} = <strong>${eval(textarea.value)} </strong></p></div>`
    textarea.value = eval(textarea.value);
    shouldClear = true;
    calculations = document.querySelectorAll('.cal');
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        if(textarea.value === ''){
            return;
        }
        evaluateExpression();
    }
    else if(e.key === 'Backspace') {
        e.preventDefault()
        clearOne();
    }
    else if(e.key === 'Escape'){
        e.preventDefault()
        clearAll();
    }
    else{
        if(['+', '-', '*', '/'].includes(e.key))
        {
            e.preventDefault()
            if(['+', '-', '*', '/'].includes(textarea.value[textarea.value.length - 1])) {
                textarea.value = textarea.value.slice(0, -1);
            }
            else if(textarea.value[textarea.value.length - 1] === '.'){
                textarea.value = textarea.value.slice(0, -2);
            }
            else {
                shouldClear = false;
            }
            textarea.value += e.key;
        }
        else if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
            e.preventDefault()
            if(shouldClear) {
                textarea.value = '';
                shouldClear = false;
            }
            textarea.value += e.key;
        }
        else {
            return
        }
    }
})

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(shouldClear) {
            textarea.value = '';
            shouldClear = false;
        }
        textarea.value += number.innerText;
    })
})
operations.forEach(operation => {
    operation.addEventListener('click', () => {
        if(['+', '-', '*', '/'].includes(textarea.value[textarea.value.length - 1])) {
            textarea.value = textarea.value.slice(0, -1);
            textarea.value += operation.innerText;
        }
        else if(textarea.value[textarea.value.length - 1] === '.'){
            textarea.value = textarea.value.slice(0, -2);
            textarea.value += operation.innerText;
        }
        else {
            textarea.value += operation.innerText;
            shouldClear = false;
        }
    })
})