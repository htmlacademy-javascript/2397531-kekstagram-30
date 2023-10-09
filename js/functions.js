function isCorrectLength(string, length) {
  return string.length <= length;
}

isCorrectLength('проверяемая строка', 20);

/* Тесты
console.log(isCorrectLength('проверяемая строка', 20));
console.log(isCorrectLength('проверяемая строка', 18));
console.log(isCorrectLength('проверяемая строка', 10));
 */

function isPalindrome(string) {
  return string.replaceAll(' ', '').toLowerCase() === string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');
}

isPalindrome('Лёша на полке клопа нашёл ');

/* Тесты
console.log(isPalindrome('Лёша на полке клопа нашёл '));
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
*/

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

/* Тесты
console.log(getNum('2023 год'));
console.log(getNum('ECMAScript 2022'));
console.log(getNum('1 кефир, 0.5 батона'));
console.log(getNum('агент 007'));
console.log(getNum('а я томат'));
console.log(getNum(2023));
console.log(getNum(-1));
console.log(getNum(1.5));
*/


