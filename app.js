const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true })
.then(()=> {
  console.log('Database connected');
})
.catch((error)=> {
  console.log('Error connecting to database');
});

const visitorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

app.get('/', (req, res) => {
  const visitor = new Visitor({
    _id: mongoose.Types.ObjectId(),
    name: req.query.name || 'Anónimo',
    date: new Date()
  });
  
  return visitor
  .save()
  .then((visitor) => {
    return res.send("<h1>El visitante fue almacenado con éxito</h1>");
  })
  .catch((error) => {
    res.status(500).json('Server error. Please try again.');
  });
});


app.listen(3000, () => console.log('Listening on port 3000!'));
