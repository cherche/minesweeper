// https://bost.ocks.org/mike/shuffle/
export function shuffle (array) {
  let m = array.length, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    [array[m], array[i]] = [array[i], array[m]]
  }

  return array;
}

export function splitInto2dArray (arr, len) {
  const copy = arr.slice()
  const output = []

  while (copy.length > 0) {
    output.push(copy.splice(0, len))
  }

  return output
}
