module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var campanha = Schema({
      nome: { type: String, required: true },
      ranking :  [{ type: Schema.Types.ObjectId, ref: 'usuario' }],
      contador: {type:Number, "default":0},
      vouchers: {type:Number, "default":1},
      inicio: { type: Date },
      url: {type:String, unique:true}
  });
  

  return db.model('campanhas', campanha);
};