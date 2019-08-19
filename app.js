const express = require('express');
const app = express();


app.get('/', (req, res) => {
  let strings = []
  for (let i = 1;i<=50;i++) {
    strings.push(`<p>${i} ${i%2 ? 'Soy Impar!' : 'Soy Par!'}!</p>`) 
  }
  res.send(`${strings.map(e=>e)}`);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
