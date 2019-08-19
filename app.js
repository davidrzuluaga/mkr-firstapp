const express = require('express');
const app = express();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get('/makers/:nombre', (req, res) => {
  const nombre = req.params.nombre || 'desconocido'
  res.send(`<h1>Hola ${capitalizeFirstLetter(nombre)}!</h1>`);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
