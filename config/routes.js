const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate, postCheck, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', postCheck, login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
}

function login(req, res) {
  const credentials = { username: req.username, password: req.password }
  db('users')
    .whereRaw('LOWER("username") = ?', credentials.username.toLowerCase()).first()
    .then(response => {
      if (!response || !bcrypt.compareSync(credentials.password, response.password)) return res.status(401).json({ error: 'You shall not pass!' });
      const token = generateToken(response);
      return res.send(token);
    })
    .catch(err => res.status(500).json({ error: "Couldn't save the user to the database." }))
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
