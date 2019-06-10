const mongoose = require('mongoose');
 
const { Schema } = mongoose;

var ArticuloSchema = mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  } });

const ItemSchema = new Schema({
   
  id_user: {
    type: String,
    required: true
  },
  item:{
    type : Schema.Types.ObjectId, ref : 'Articulo' 
  },
  cantidad: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Item = mongoose.model('Item', ItemSchema);
var Articulo = mongoose.model('Articulo', ArticuloSchema);

module.exports = {
  Item: Item,
  Articulo: Articulo 
};