import { it, expect, vi, test } from 'vitest';

import writeData from './io';
import {promises as fs, writeFile} from 'fs';
//mock example.
// we can moke the built-in methods to make the test simple
vi.mock('fs');
// this is how you can add your own implementation of the functions
vi.mock('path', () => {
  return{
    // we need to use default because of the import. e.g: import path from 'path';
    default: {
      // ...args returns all arguments that get into one array
      join: (...args) => {
        // return the last element on the list / filename /> storagePath
        return args[args.length - 1]
      }
    }
  }
});

it('should execute the writeFile method', () => {
  const testData = 'Test';
  const testFilename = 'test.txt';
  
  writeData(testData, testFilename)

  // expect(fs.writeFile).toBeCalled();

  // we may want to test which arguments were passed to writeFile
  expect(fs.writeFile).toBeCalledWith(testFilename, testData)
  // we want to make sure that our test data was passed
  // we want to make sure the file name is test.txt

  // Keys
  // How you can keep your tests simple?
  // How you can create code that allows you to test what you want to test
});


it('should return a promise that resolves to no value if called correctly', () => {
  const testData = 'Test';
  const testFilename = 'test.txt';
  
  writeData(testData, testFilename)

  return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  // expect(fs.writeFile).toBeCalled();

  // we may want to test which arguments were passed to writeFile
  expect(fs.writeFile).toBeCalledWith(testFilename, testData)
  // we want to make sure that our test data was passed
  // we want to make sure the file name is test.txt

  // Keys
  // How you can keep your tests simple?
  // How you can create code that allows you to test what you want to test
});
