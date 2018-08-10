const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate, postCheck, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', postCheck, register);
  server.post('/api/login', postCheck, login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const user = { username: req.username, password: req.password }
  db('users')
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].username.toLowerCase() === user.username.toLowerCase()) {
          return res.status(400).json({ error: 'There is already a user with that name.' })
        }
      }
      const hash = bcrypt.hashSync(user.password, 14);
      user.password = hash;
      db('users')
        .insert(user)
        .then(insertResponse => {
          const token = generateToken({ id: insertResponse[0], ...user });
          return res.status(201).json({ id: insertResponse[0], ...user, token });
        })
        .catch(err => res.status(500).json({ error: "Couldn't save the user to the database." }))
    })
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
