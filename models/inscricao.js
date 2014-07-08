module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var inscricao = Schema({
      usuario: { email: { type: String, required: true } },
      data: { type: Date, "default": Date.now },
      campanha :{ id: {type : String } }
  });
  

  return db.model('inscricoes', inscricao);
};