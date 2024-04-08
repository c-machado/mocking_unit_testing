import { describe, it, expect, vi } from "vitest";
import { generateReportData } from "./data";

// spy example
describe('generateReportData()', () => {
  it('should execute log() if provided', () =>{
    // create empty function
    const logger = vi.fn();

    // const logger = vi.fn(() => {});
    // you can also pass a function to vi.fn()
    // to emulate some specific bahavior

    generateReportData(logger);

    // you pass a function to see either was called or not 
    // or how many times toBeCalledTimes()
    // toBeCalledWith() to check which parameters were passed

    expect(logger).toBeCalled();
  });

})