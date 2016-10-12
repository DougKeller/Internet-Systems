function nextInvalidCharacter(emailAddress, startIndex) {
  emailAddress = emailAddress.slice(startIndex);
  var regex = /^[^\w\d]/
  var match = emailAddress.match(regex);
  return match;
};

function nextValidSegment(emailAddress, startIndex) {
  emailAddress = emailAddress.slice(startIndex);
  var regex = /^[\w\d.]+/
  var match = emailAddress.match(regex);
  return match;
};

function greenify(string) {
  return '<span class="green">' + string + '</span>';
};

function redify(string) {
  return '<s class="red">' + string + '</s>';
};

function generateErrors(emailAddress) {
  var index = 0;
  var errorHtml = '';
  var hasAtSymbol = false;

  while (index < emailAddress.length) {
    var validSegment = nextValidSegment(emailAddress, index);
    if (validSegment) {
      errorHtml += greenify(validSegment[0]);
      index += validSegment[0].length;
    }

    var invalidCharacter = nextInvalidCharacter(emailAddress, index);
    if (invalidCharacter) {
      if (!hasAtSymbol && invalidCharacter[0] === '@') {
        errorHtml += greenify(invalidCharacter[0]);
        index += 1
        hasAtSymbol = true;
      } else {
        errorHtml += redify(invalidCharacter[0]);
        index += invalidCharacter[0].length;
      }
    }
  }

  return errorHtml;
};

function emailIsValid(emailAddress) {
  var emailRegex = /^[\w\d.]+@[\w\d.]+$/;
  var matches = emailAddress.match(emailRegex);
  return matches;
};

function email1Handler() {
  var element = document.getElementById('email-input1');
  var value = element.value || '';

  if (!emailIsValid(value)) {
    alert('Invalid email address! Check the output for invalid characters.');
  }

  var outputElement = document.getElementById('email-output1');
  outputElement.innerHTML = generateErrors(value);
};

function email2Handler() {
  var element = document.getElementById('email-input2');
  var value = element.value || '';

  var outputElement = document.getElementById('email-output2');
  outputElement.innerHTML = generateErrors(value);
};