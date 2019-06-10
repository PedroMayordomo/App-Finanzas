const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');//Como respuesta renderiza el archivo llamado index
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
