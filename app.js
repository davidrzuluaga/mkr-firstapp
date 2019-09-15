const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

app.set('view engine', 'pug');
app.set('users', 'users');
app.set('newuser', 'newuser');

app.use(express.urlencoded());

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
    user = await Users.find();
    res.render('users', { users: user });
  }
  showAllUsers();
});

app.get('/register', (req, res) => {
  res.render('newuser');
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
      res.redirect('/');
    } else {
      res.render('newuser', { msg: 'Bad Request' });
    }
  }
  createUser();
});

app.listen(3000, () => console.log('Listening on port 3000!'));
