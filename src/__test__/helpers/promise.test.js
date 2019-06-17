import { handlePromise, returnData } from '../../helpers/promise';

describe('Promises', () => {
  test('if promise is resolved', () => {
    const someData = [{}, {}];

    return handlePromise(someData)
      .then((data) => {
        expect(data).not.toHaveLength(0);
      });
  });

  test('if promise is rejected', () => {
    const someData = [];

    return handlePromise(someData)
      .catch(e => expect(e).toBe(e));
  });
});

test('returnData returns array data on Promise resolved', () => {
  const testData = '123123123';
  const promice = new Promise((res) => {
    res(testData);
  });

  const testFunc = (data) => {
    expect(data).toEqual(testData);
  };

  returnData(promice, testFunc);
});

test('returnData returns array data on Promise rejected', () => {
  const error1 = 'error';

  jest.spyOn(window, 'alert').mockImplementation((err) => {
    expect(err).toMatch(error1);
  });

  const promice = new Promise((res, rej) => {
    rej(error1);
  });

  const testFunc = () => {};
  returnData(promice, testFunc);
});


const doAdd = (a, b, callback) => {
  callback(a + b);
};

test('calls callback with arguments added', () => {
  const mockCallback = jest.fn();
  doAdd(1, 2, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(3);
});
