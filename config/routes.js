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
  // Checks if the username provided already exists in the database
  db('users')
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].username.toLowerCase() === user.username.toLowerCase()) {
          return res.status(400).json({ error: 'There is already a user with that name.' })
        }
      }
      // Hashes the user password with bcrypt then sets the hashed password onto user 
      const hash = bcrypt.hashSync(user.password, 14);
      user.password = hash;
      // Inserts the hashed user into the database and returns the user / token
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
    // Looks for a user that is lowercased (case sensitive by default)
    .whereRaw('LOWER("username") = ?', credentials.username.toLowerCase()).first()
    .then(response => {
      // If no user is found, returns an error
      if (!response) return res.status(401).json({ error: "The username you entered doesn't belong to an account. Please check your username and try again." })
      // If the password provided doesn't match the one in the database, returns an error. 
      if (!bcrypt.compareSync(credentials.password, response.password)) return res.status(401).json({ error: 'Invalid password' });
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
      db('users')
        .where('id', req.decoded.userId).first()
        .then(user => res.status(200).json({ user, jokes: response.data }))
        .catch(err => res.status(500).json({ error: "Couldn't retrieve the user information", err }));
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
