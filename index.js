const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

function mapSymbolToJS(s) {
    if (s === '×') return '*';
    if (s === '÷') return '/';
    return s;
}

function evaluateExpression() {
    const expr = display.value.trim();
    if (!expr) return;
    try {
        const result = eval(expr);
        display.value = result;
        // add flash animation
        display.classList.add('result-flash');
        setTimeout(() => display.classList.remove('result-flash'), 400);
    } catch (err) {
        display.value = 'Error';
        setTimeout(() => { display.value = ''; }, 900);
    }
}

// buttons click
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const valueAttr = e.target.dataset.value;

        if (action === 'clear') {
            display.value = '';
            display.focus();
            return;
        }

        if (action === 'equals') {
            evaluateExpression();
            display.focus();
            return;
        }

        // normal value button
        const toAdd = mapSymbolToJS(valueAttr || e.target.innerText);
        display.value += toAdd;
        display.focus();
    });
});

// keyboard support
document.addEventListener('keydown', (e) => {
    const allowed = '0123456789+-*/().%';
    if (e.key === 'Enter') {
        e.preventDefault();
        evaluateExpression();
        return;
    }
    if (e.key === 'Backspace') return;
    if (e.key.toLowerCase() === 'c') {
        display.value = '';
        return;
    }

    if (!allowed.includes(e.key)) return;
    if (document.activeElement !== display) {
        e.preventDefault();
        display.value += e.key;
    }
});