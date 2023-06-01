export function fyShuffle<T>(array: T[]): T[] {
  // Declare variables
  let range = array.length;
  let roll = 0;
  const scratch = [...array];
  const result = [];

  // While there remain elements to shuffle
  while (range !== 0) {
    // Randomly pick a number from 0 to range
    roll = Math.floor(Math.random() * range);

    // Pick the element at the index of roll from scratch and put it into result
    result.push(scratch[roll]);

    // Replace the picked element with the last element in scratch
    if (roll < range - 1) {
      scratch[roll] = scratch[range - 1];
      scratch.pop();
    } else {
      scratch.pop();
    }

    // Decrement range
    range--;
  }

  // Return the shuffled array
  return result;
}
