function factorial(value) {
  if (value === 0) {
    return 1;
  }
  return value * factorial(value - 1);
};

function decimalToBase256(number) {
  var base = 256;
  var exponent = 0;

  if (number < base) {
    return [number];
  }

  while (number >= Math.pow(base, exponent + 1)) {
    exponent += 1;
  }

  var divisor = Math.pow(base, exponent);
  var digit = Math.floor(number / divisor);
  number -= digit * divisor;

  var digits = [digit];

  while (number < Math.pow(base, exponent - 1) && exponent > 1) {
    exponent -= 1;
    digits.push(0);
  }

  return digits.concat(decimalToBase256(number));
};

function calculateFactorial() {
  var input = prompt('Enter a positive number!', '8');
  var value = parseInt(input);

  if (isNaN(value) || value < 0) {
    alert('Invalid input! Input must be a positive integer.');
    return;
  }
  var result = factorial(value);

  var output = document.getElementById('factorial-result');
  output.innerHTML = result;

  var size = Math.log10(result) + 12;
  output.style['font-size'] = size + 'px';

  var max256 = 256 * 256 * 256 - 1;
  var shifted = result % max256;

  var color = decimalToBase256(shifted);
  while (color.length < 3) {
    color.unshift(0);
  }
  output.style.color = 'rgb(' + color.join(',') + ')';
};