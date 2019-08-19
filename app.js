const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send(req.header('User-Agent'));
});

app.get('/form', (req, res) => {
  res.render("form");
});

app.post('/form', (req, res) => {
  let name = req.body.name
  res.render("result",{name});
});

app.listen(3000, () => console.log('Listening on port 3000!'));
