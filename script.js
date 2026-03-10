let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach(button => {

button.addEventListener("click", () => {

let value = button.textContent;

if(value === "C"){
display.value = "";
}

else if(value === "="){
try {
let expr = display.value;
let result = eval(expr);
display.value = result;
addToHistory(expr, result);
} catch {
display.value = "Error";
}
}

else if(value === "←"){
display.value = display.value.slice(0, -1);
}

else if(value === "x²"){
display.value += "**2";
}

else if(value === "%"){
display.value += "%";
}

else if(value === "^"){
display.value += "**";
}

else if(value === "log"){
display.value += "Math.log("; 
}

else if(value === "("){
display.value += "(";
}

else if(value === ")"){
display.value += ")";
}

else{
display.value += value;
}

});

});

// history handling
let history = [];
const historyDiv = document.getElementById('history');
const historyList = document.getElementById('historyList');
const historyToggle = document.getElementById('historyToggle');
const closeHistory = document.getElementById('closeHistory');

function addToHistory(expr, result) {
    history.unshift(`${expr} = ${result}`);
    renderHistory();
}
function renderHistory() {
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}
function toggleHistory(show) {
    historyDiv.style.display = show ? 'block' : 'none';
}

historyToggle.addEventListener('click', () => toggleHistory(true));
closeHistory.addEventListener('click', () => toggleHistory(false));

// Keyboard support
document.addEventListener("keydown", (e) => {
let key = e.key;

if (key >= '0' && key <= '9') {
display.value += key;
} else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '.') {
display.value += key;
} else if (key === 'Enter') {
    e.preventDefault();
    try {
        let expr = display.value;
        let result = eval(expr);
        display.value = result;
        addToHistory(expr, result);
    } catch {
        display.value = "Error";
    }
} else if (key === 'Escape') {
display.value = "";
} else if (key === 'Backspace') {
display.value = display.value.slice(0, -1);
} else if (key === '(') {
display.value += '(';
} else if (key === ')') {
display.value += ')';
} else if (key === 'l' || key === 'L') {
    display.value += "Math.log(";
} else if (key === '^') {
    display.value += "**";
} else if (key === 'h' || key === 'H') {
    // toggle history with shortcut
    toggleHistory(historyDiv.style.display !== 'block');
}
// Ignore other keys
});