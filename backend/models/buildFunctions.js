import dotenv from 'dotenv';
dotenv.config();
import { getPathFromBackend } from '../lib/getPath.js';
import fs from 'fs/promises';

import pg from 'pg';
const { Client } = pg;

function getClient(database) {
  return new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: database,
    port: process.env.DB_PORT,

    client_encoding: 'UTF8',
  });
}

async function buildFunctions(sqlScript = 'models/scripts/functions.sql') {
  try {
    console.log(`INFO: reading '${sqlScript}' file(s)...`);
    const SQL = await fs.readFile(getPathFromBackend(sqlScript), 'utf8');

    console.log('INFO: building functions and procedures...');
    const newClient = getClient(process.env.DB_NAME);
    await newClient.connect();
    await newClient.query(SQL);
    await newClient.end();

    console.log('INFO: done building functions!');
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

buildFunctions();
