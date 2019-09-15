const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

require('dotenv').config();

app.set('view engine', 'pug');
app.set('users', 'users');
app.set('newuser', 'newuser');

app.use(express.urlencoded());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.log('Error connecting to database');
  });

const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const Users = mongoose.model('Users', usersSchema);

app.get('/', (req, res) => {
  let user;
  async function showAllUsers() {
    const { session } = req.cookies;
    if (session) {
      const current = await Users.findOne({ email: session }, function(err) {
        if (err) return console.error(err);
      });
      if (current) {
        user = await Users.find();
        res.render('users', { users: user });
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  }
  showAllUsers();
});

app.get('/register', (req, res) => {
  res.render('newuser');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  async function createUser() {
    if (name && email && password) {
      console.log(name, email, password);
      await Users.create(
        { _id: mongoose.Types.ObjectId(), name, email, password },
        function(err) {
          if (err) return console.error(err);
        }
      );
      res.cookie('session', email);
      res.redirect('/');
    } else {
      res.render('newuser', {
        msgs: [{ msg: 'Todos los campos son obligatorios' }]
      });
    }
  }
  createUser();
});

app.post('/login', (req, res) => {
  const { password, email } = req.body;
  async function login() {
    if (email && password) {
      const user = await Users.findOne({ email, password }, function(err) {
        if (err) return console.error(err);
      });
      if (user) {
        res.cookie('session', user.email);
        res.redirect('/');
      } else {
        res.render('login', { msgs: [{ msg: 'contraseña incorrecta' }] });
      }
    } else {
      res.render('login', {
        msgs: [{ msg: 'Todos los campos son obligatorios' }]
      });
    }
  }
  login();
});

app.get('/logout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/login');
});

app.listen(3000, () => console.log('Listening on port 3000!'));
