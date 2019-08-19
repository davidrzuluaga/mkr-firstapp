const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
  let strings = []
  for (let i = 1;i<=50;i++) {
    strings.push(`${i} ${i%2 ? 'Soy Impar!' : 'Soy Par!'}!`) 
  }
  res.render("index", { strings });
});

app.listen(3000, () => console.log('Listening on port 3000!'));
