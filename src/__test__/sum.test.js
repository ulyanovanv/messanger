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
