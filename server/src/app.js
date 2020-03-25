const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');
require('./tasks/createAdminUser');
const { notFound, errorHandler } = require('./helpers');
const auth = require('./routes/auth');
const notes = require('./routes/api/notes');
const users = require('./routes/api/users');

const { checkTokenSetUser, IsLoogedIn, isAdmin } = require('./routes/auth/auth.middlewares');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origini: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(helmet());
app.use(checkTokenSetUser);

// routes
app.get('/', (req, res) => {
  const { user } = req;
  res.json({
    message: 'Hello World!',
    user,
  });
});


app.use('/auth', auth);
// app.use('/api/v1/notes', IsLoogedIn, notes);
app.use('/user/notes', IsLoogedIn, notes);
app.use('/api/v1/users', IsLoogedIn, isAdmin, users);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
