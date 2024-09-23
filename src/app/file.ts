import * as fs from 'fs';
import * as path from 'path';

export const readFile = (fileName: string) => {
  const dir = path.dirname(fileName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tasks = fs.readFileSync(fileName, 'utf-8');
  return tasks?.length > 0 ? JSON.parse(tasks) : [];
};

export const writeFile = (fileName: string, data: any) => {
  if (!fs.existsSync(fileName)) {
    console.error('File does not exist: ' + fileName);
  };

  return fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
};