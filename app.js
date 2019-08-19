const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render("index");
});

app.post('/', (req, res) => {
  let name = 's'// req.body.name
  console.log(req.body)
  console.log(req.params)
  console.log(req.query)
  res.render("result",{name});
});

app.listen(3000, () => console.log('Listening on port 3000!'));
