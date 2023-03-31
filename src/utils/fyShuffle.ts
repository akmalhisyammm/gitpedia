// Modern Fisher-Yates Shuffle Algorithm
// https://bost.ocks.org/mike/shuffle/
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function fyShuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
