/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const app = require('./app');

process.on('uncaughtException', err => {
  console.log('Uncaught Exception! Shutting down...');
  console.log(err);
  process.exit(1);
});

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connect successful.'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}...`)
);

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err);
  server.close(() => process.exit(1));
});
