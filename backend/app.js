import dotenv from 'dotenv';
dotenv.config();
import serveInfo from './lib/getServeInfo.js';

import express from 'express';
const app = express();
import cors from 'cors';
import { optionalAuth } from './lib/utils.js';

// import routes
import registerRoute from './routes/registerRoute.js';
import loginRoute from './routes/loginRoute.js';
import usersRoute from './routes/usersRoute.js';
import postsRoute from './routes/postsRoute.js';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(optionalAuth);

// static assets
app.use(express.static(serveInfo.servePath));
app.get('/', (req, res) => {
  res.sendFile(serveInfo.serveIndexPath);
});

// routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
