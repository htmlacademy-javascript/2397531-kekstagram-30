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

const convertsHoursToMinutes = (string) => {
  string = string.split(':');

  return +string[0] * 60 + +string[1];
};

const checkTimeMeeting = (startWork, endWork, startMeeting, durationMeeting) => {
  startWork = convertsHoursToMinutes(startWork);
  endWork = convertsHoursToMinutes(endWork);
  startMeeting = convertsHoursToMinutes(startMeeting);
  const endMeeting = startMeeting + durationMeeting;

  return (startWork <= startMeeting && endWork >= endMeeting);
};

checkTimeMeeting('08:00', '17:30', '14:00', 90);
