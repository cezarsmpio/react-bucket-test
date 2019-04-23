import test from 'ava';
import weightedRandomIndex from '../../src/utils/weighted-random';

test('should return -1 when giving an empty list', t => {
  t.is(weightedRandomIndex([]), -1);
});

test('should not throw an error when passing float numbers', t => {
  t.notThrows(() => weightedRandomIndex([3.5, 2.3, 9.0]));
});

test('should return -1 when giving no weights', t => {
  t.is(weightedRandomIndex([0, 0]), -1);
});

test('should return -1 given undefined', t => {
  t.is(weightedRandomIndex(undefined), -1);
});

test('should return the greatest index', t => {
  t.is(weightedRandomIndex([0, 1]), 1);
  t.is(weightedRandomIndex([1, 0]), 0);
});

test('should return 0 when passing only one weight', t => {
  t.is(weightedRandomIndex([100]), 0);
});

test('should throw error when weights is not an array', t => {
  t.throws(() => weightedRandomIndex(null));
  t.throws(() => weightedRandomIndex(0));
  t.throws(() => weightedRandomIndex(1));
  t.throws(() => weightedRandomIndex(-1));
  t.throws(() => weightedRandomIndex(true));
  t.throws(() => weightedRandomIndex('fail'));
});

test('should throw error when given an array containing non number values', t => {
  t.throws(() => weightedRandomIndex([50, 'a', 70]));
  t.throws(() => weightedRandomIndex([50, null, 70]));
  t.throws(() => weightedRandomIndex([50, false, 70]));
  t.throws(() => weightedRandomIndex([50, undefined, 70]));
});
