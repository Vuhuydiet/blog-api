import crypto from 'crypto';
import fs from 'fs';
import getPath from '../lib/getPath.js';

// Generate RSA key pair
crypto.generateKeyPair(
  'rsa',
  {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // "Privacy-Enhanced Mail"
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  },
  (err, publicKey, privateKey) => {
    if (err) {
      console.error('Error generating key pair: ', err);
      return;
    }

    // Save the public key to a file
    fs.writeFileSync(getPath(import.meta.url, 'public_key.pem'), publicKey);
    console.log('Public key saved to public_key.pem');

    // Save the private key to a file
    fs.writeFileSync(getPath(import.meta.url, 'private_key.pem'), privateKey);
    console.log('Private key saved to private_key.pem');
  },
);
