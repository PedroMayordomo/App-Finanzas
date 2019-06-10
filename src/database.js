const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
//Conexión de base de datos
mongoose.connect('mongodb://localhost/node-notes-db', {
  //Objetos de comunicación
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
