const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const name = req.params.name || 'desconocido'
  res.send(`<h1>Hola ${name}!</h1>`);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
