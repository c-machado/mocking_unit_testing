import { it, expect, describe } from 'vitest'
import { HttpError } from './errors'

describe('Http error tests ', () => {
  it('should validate the http request response code', () => {
    const testStatusCode = 1;
    const testMessage = 'Test';
    const testData = {'hey': 'testData'};

    const testHttpError = new HttpError(testStatusCode, testMessage, testData);

    expect(testHttpError.statusCode).toBe(testStatusCode);
    expect(testHttpError.message).toBe(testMessage);
    expect(testHttpError.data).toBe(testData);
  })

  it('should contain undefined as data if not data is provided', () => {
    const testStatusCode = 1;
    const testMessage = 'Test';

    const testHttpError = new HttpError(testStatusCode, testMessage);

    expect(testHttpError.data).toBeUndefined();

  })
})

describe('Validate error', () => {
  it('should ')
})