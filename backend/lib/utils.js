import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import getPath from './getPath.js';


const PRIV_KEY = fs.readFileSync(getPath(import.meta.url, '../config/private_key.pem'), 'utf8');

const saltLength = 16;
const iterations = 10000;
const keyLength = 64;
const digest = 'sha512';

function hashPassword(password) {
  const salt = crypto.randomBytes(saltLength).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString('hex');
  console.log(salt + hash);
  return `${salt}:${hash}`;
}

function invalidatePassword(inputPassword, storedHash) {
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto
    .pbkdf2Sync(inputPassword, salt, iterations, keyLength, digest)
    .toString('hex');
  return hash === originalHash;
}
function issueJWT(user_id) {
  const expiresIn = '1d';
  const payload = {
    sub: user_id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: 'RS256',
  });
  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
}

export {
  getPath,
  hashPassword,
  invalidatePassword,
  issueJWT,
};
