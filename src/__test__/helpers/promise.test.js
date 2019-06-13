import {handlePromise, returnData} from "./../../helpers/promise.js";

describe("Promises", () => {
  test('if promise is resolved', () => {
    let someData = [{}, {}];

    return handlePromise(someData)
      .then(data => {
        expect(data).not.toHaveLength(0);
      });
  });

  test('if promise is rejected', () => {
    let someData = [];

    return handlePromise(someData)
      .catch(e => expect(e).toBe(e)
    );
  });
});

test('returnData returns array data on Promise resolved', () => {
  const mockCallback = jest.fn();

  expect(returnData(Promise.resolve([{}, {}]), mockCallback)).toBeDefined();
});

const doAdd = (a, b, callback) => {
  callback(a + b);
};

test("calls callback with arguments added", () => {
  const mockCallback = jest.fn();
  doAdd(1, 2,  mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(3);
});

