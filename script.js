const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousValue = null;

document.querySelectorAll('.btn.number').forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.num === '.' && currentInput.includes('.')) return;
    currentInput += button.dataset.num;
    updateDisplay();
  });
});

document.querySelectorAll('.btn.operator').forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '' && previousValue === null) return;
    if (previousValue !== null) calculate();
    else previousValue = parseFloat(currentInput);
    operator = button.dataset.op;
    currentInput = '';
  });
});

document.getElementById('equals').addEventListener('click', () => {
  calculate();
  operator = '';
});

document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  previousValue = null;
  operator = '';
  updateDisplay();
});

function updateDisplay() {
  display.textContent = currentInput || previousValue || '0';
}

function calculate() {
  if (currentInput === '' || operator === '') return;

  let result;
  const currentValue = parseFloat(currentInput);

  switch(operator) {
    case '+':
      result = previousValue + currentValue;
      break;
    case '-':
      result = previousValue - currentValue;
      break;
    case '*':
      result = previousValue * currentValue;
      break;
    case '/':
      if (currentValue === 0) {
        alert("Division by zero is undefined!");
        return;
      }
      result = previousValue / currentValue;
      break;
    default:
      return;
  }

  previousValue = result;
  currentInput = '';
  updateDisplay();
}