 import { it, vi, expect } from 'vitest';

import { HttpError } from './errors';
import { sendDataRequest } from './http';

const testResponseData = { testKey: 'testData' };

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== 'string') {
      return reject('Not a string.');
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal('fetch', testFetch);

it('should return any available response data', () => {
  const testData = { key: 'test' };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

// it('should convert the provided data to JSON before sending the request 1', async () => {
//   const testData = { key: 'test' };
//   // this return a promise, if correct it resolves instead of rejecting
//   // this checks for not rejecting with this string, but it still expects that this rejects
//   //  not to not reject. if you use reject it expects to reject
//   // it expect it to no reject to this value
//   // not to not reject overall
//   // Error: promise resolved "[object Object]" instead of rejecting
//   return expect(sendDataRequest(testData)).not.rejects.toBe('Not a string.');
// });

it('should convert the provided data to JSON before sending the request', async () => {
  // async is added to wait the response of calling sendDataRequest
  const testData = { key: 'test' };
  // error message is undefined
  let errorMessage;
  // wrapping of sendDataRequest calling with this try-catch
  try {
    await sendDataRequest(testData);
    // catch if the promise rejects
  } catch (error) {
    // error message if the promise was rejected
    // this will only be store if we have an error
    errorMessage = error;
  }
  // we can validate if it is not a string 
  // AssertionError: expected 'Not a string.' not to be 'Not a string.' // Object.is equality
  expect(errorMessage).not.toBe('Not a string.');
});

// simulate we get a bad response
it('should throw an HttpError in case of non-ok responses', () => {
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });  
  const testData = { key: 'test' };
  // check if my promise rejects
  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
