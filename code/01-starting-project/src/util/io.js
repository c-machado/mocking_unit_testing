// built-in method
import path from 'path';
// built-in method
import { promises as fs } from 'fs';


// we want to create a mocke function were we can see if the file name was the expected one,
// since we are not writting the file again in the test we don't need the complete path,
// we just need the filename
export default function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), 'data', filename);
  return fs.writeFile(storagePath, data);
}
