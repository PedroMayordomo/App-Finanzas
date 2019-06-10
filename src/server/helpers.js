const moment = require('moment');//Dependencia 
const helpers = {};
//Toma una fecha y devuelve tiempo atras 
helpers.timeago = timestamp => {
  //Definición de idioma librería moment
  moment.locale('es'); //definimos idioma
  return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;
