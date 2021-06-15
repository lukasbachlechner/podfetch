import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('The hyena ate 1234');
});

export default {
  path: '/api/',
  handler: app,
};
