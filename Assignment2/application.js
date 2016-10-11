'use-strict!';

function factorial(value) {
  if (value === 0) {
    return 1;
  }
  return value * factorial(value - 1);
};

function calculateFactorial() {
  var element = document.getElementById('factorial-text');
  var value = parseInt(element.value);

  if (value === NaN) {
    return;
  }

  var result = factorial(value);
  var resultElement = document.getElementById('factorial-result');

  resultElement.innerHTML = result;

  var fontSize = result / value;
  resultElement.style['font-size'] = fontSize + 'px';
};

function verifyEmail2() {
  var element = document.getElementById('email-text2');
  var input = element.value;

  var errors = '';
  input.split('').forEach(function(character) {
    if (['a', 'b', 'c', 'd', 'e', 'f', 'g'].indexOf(character) > -1) {
      errors += '<s class="red">' + character + '</s>';
    } else {
      errors += character;
    }
  });

  var resultElement = document.getElementById('email-result2');
  resultElement.innerHTML = errors;
};