import getPath from './getPath.js';
import path from 'path';

const envArg = process.argv.find((arg) => arg.startsWith('NODE_ENV='));
const NODE_ENV = envArg ? envArg.split('=')[1] : null;
const servePath = (() => {
  switch (NODE_ENV) {
    case 'production':
      return getPath(import.meta.url, '../../frontend/dist');
    case 'development':
      return getPath(import.meta.url, '../../frontend');
  }
  console.error('NODE_ENV not set');
  process.exit(1);
})();
const serveIndexPath = path.join(servePath, 'index.html');

export default {
  servePath,
  serveIndexPath,
};
