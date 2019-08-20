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
  visits: {
    type: String,
    required: true,
  }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

app.get('/', (req, res) => {
  async function createVisitor() {
    let existentVisitor
    if (req.query.name) {
      existentVisitor = await Visitor.findOne({name: req.query.name})
    } else {
      await Visitor.create({ _id: mongoose.Types.ObjectId(), name: "Anónimo", visits: "1" }, function(err, visitor) {
        if (err) return console.error(err);
        showAllVisits()
      });
    }
    if (existentVisitor) {
      await Visitor.updateOne({name: req.query.name}, { visits: parseInt(existentVisitor.visits) + 1 }, function(err) {
        if (err) return console.error(err);
        showAllVisits()
      });
    } else if (req.query.name) {
      await Visitor.create({_id: mongoose.Types.ObjectId(), name: req.query.name, visits: "1" }, function(err, newVisitor) {
        if (err) return console.error(err);
        showAllVisits(newVisitor)
      });
    }
    function showAllVisits(newVisitor = {}) {
      Visitor.find()
      .then((visitor) => {
        res.render("visits", { visitor: [...newVisitor, ...visitor] });
      })
    }
  }
  createVisitor()
});

app.get('/deleteall', (req, res) => {
  Visitor.deleteMany()
  .then((visitor) => {
    res.send("Deleted");
  })
});
app.listen(3000, () => console.log('Listening on port 3000!'));
