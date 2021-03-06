const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DB_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('db connected'));

express()
  .use(cors({ origin: 'http://localhost:3000' }))
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  .use('/auth', authRoutes)

  .listen(PORT, () => {
    console.info(`🌍 Listening on port ${PORT}`);
  });
