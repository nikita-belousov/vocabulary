export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function stringToArray(string) {
  return string.replace(/ +/g, '')
    .split(',')
    .filter(word => word !== '');
}

export function getRandomArbitrary(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

export function shuffleArray(originalArray) {
  var array = [].concat(originalArray);
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function getStringBase(string) {
  return string
    .replace(/\s/g, '')
    .toLowerCase()
}

export function areArraysEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length)
    return false

  let equal = true
  const copy = arrayTwo.slice()

  arrayOne.forEach(item => {
    let found = false

    copy.forEach((copyItem, index) => {
      if (item === copyItem) {
        copy.splice(index, 1)
        found = true
      }
    })

    if (!found) equal = false
  })

  return equal
}
