function isCorrectLength(string, length) {
  return string.length <= length;
}

isCorrectLength('проверяемая строка', 20);

function isPalindrome(string) {
  return string.replaceAll(' ', '').toLowerCase() === string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');
}

isPalindrome('Лёша на полке клопа нашёл ');

function getNum(string) {
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!(Number.isNaN(parseInt(string[i], 10)))) {
      result += string[i];
    }
  }

  return +result || NaN;
}

getNum(-1);
