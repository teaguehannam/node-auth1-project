const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const UserRouter = require('../users/user-router');
const AuthRouter = require('../auth/auth-router');
const restricted = require('../auth/restricted');

const server = express();

const sessionConfig = {
  name: "monster",
  secret: "i stole ur cookies",
  cookie: {
    maxAge: 1000 * 60 * 60, // 10 min
    secure: false, // true in production to send only over https
    httpOnly: true, // true means no access from JS
  },
  resave: false,
  saveUninitialized: true, // GDPR laws require to check with client
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

//restricted applies to whole router
server.use('/api/users', restricted, UserRouter);
server.use('/api', AuthRouter);

server.get('/', (req, res) => {
  res.json({ "message": "It works!" });
});

module.exports = server; 