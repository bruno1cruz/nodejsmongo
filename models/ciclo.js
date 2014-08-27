module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var ciclo = Schema({
      nome: { type: String, required: true },
      campanhas :  [{ type: Schema.Types.ObjectId, ref: 'campanha' }],
      inicio: {type:Date},
      fim: {type:Date},
      ativo: { type: Boolean, default : false },
      url: {type:String, unique:true},
  });
  

  return db.model('ciclos', ciclo);
};