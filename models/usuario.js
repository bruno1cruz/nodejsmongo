module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var usuario = Schema({
      nome: { type: String, required: true },
      email: { type: String, required: true , index: {unique: true} }
  });

  return db.model('usuarios', usuario);
};