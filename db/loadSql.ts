import fs from 'fs';
import path from 'path';

export function loadSql(fileName: string): string {
  const filePath = path.join(__dirname, fileName);
  return fs.readFileSync(filePath, 'utf8');
}
