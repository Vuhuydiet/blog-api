import dotenv from 'dotenv';
dotenv.config();
import getPath from './lib/getPath.js';

import express from 'express';
const app = express();
import cors from 'cors';

// import routes


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(getPath(import.meta.url, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(getPath(import.meta.url, '../client/dist/index.html'));
  });
} else {
  app.use(express.static(getPath(import.meta.url, '../client')));
  app.get('*', (req, res) => {
    res.sendFile(getPath(import.meta.url, '../client/index.html'));
  });
}


// routes

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
