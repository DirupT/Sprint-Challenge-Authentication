<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
Middleware have access to req, res, and next. They can be used globally / locally in functions.
Sessions are used to store information on the server.
Bcrypt is used to encrypt / hash passwords.
JWT's are used to authenticate a user by storing it on the client via local storage and sending it back to the server
when needed and authenticating it there..

2.  What does bcrypt do in order to prevent attacks?
It hashes a password and can add salt to prevent rainbow table attacks.

3.  What are the three parts of the JSON Web Token?
Header, payload, signature