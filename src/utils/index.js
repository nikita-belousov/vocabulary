export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function stringToArray(string) {
  return string
    .split(',')
    .filter(word => word !== '')
    .map(word => getStringBase(word))
}

export function getRandomArbitrary(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

export function getStringBase(string) {
  return string.trim().toLowerCase()
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
