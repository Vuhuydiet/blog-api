import { fileURLToPath } from 'url';
import path from 'path';


function getPath(url, filepath) {
  return path.join(path.dirname(fileURLToPath(url)), filepath);
}

export default getPath;