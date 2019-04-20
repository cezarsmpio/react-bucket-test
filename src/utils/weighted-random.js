function sum(prev, curr) {
  return prev + curr;
}

function hasOnlyNumbers(arr) {
  return arr.every(Number.isInteger);
}

/**
 * It returns a random index of a given weights array.
 *
 * @param {number[]} weights A list of numbers.
 * @returns {number} An index based on the given weights.
 */
export default function weightedRandomIndex(weights = []) {
  if (!Array.isArray(weights)) {
    throw Error('`weights` should be an array of integers.');
  }

  if (!hasOnlyNumbers(weights)) {
    throw Error(
      '`weights` contains non number values. It should be an array of integers only.'
    );
  }

  const totalWeight = weights.reduce(sum, 0);
  const randomWeight = Math.random() * totalWeight;

  return weights.findIndex(function(_, index) {
    const previousWeightsSum = weights.slice(0, index + 1).reduce(sum, 0);

    return previousWeightsSum > randomWeight;
  });
}
