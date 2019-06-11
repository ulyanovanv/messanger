const sum = require('./../helpers/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('null', () => {
  const n = null;
  expect(n).toBeNull(); //true
  expect(n).toBeDefined(); //true
  expect(n).not.toBeUndefined(); //false
  expect(n).not.toBeTruthy(); //false
  expect(n).toBeFalsy(); //true
});

test('zero', () => {
  const z = 0;
  expect(z).toBe(0);
  expect(z).not.toBeNull();
  expect(z).not.toBeUndefined();
  expect(z).toBeDefined();
  expect(z).toBeFalsy()
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/[^0-9]/);
});

const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});