module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;
  
  var item = new Schema({
      nome     : String,
      descricao : String
  },{_id: false});

  var campanha = Schema({
      nome: { type: String, required: true },
      ciclo : { 
          url : {type : String}
      },
      ranking :  [{ type: Schema.Types.ObjectId, ref: 'usuario' }],
      contador: {type:Number, "default":0},
      vouchers: {type:Number, "default":1},
      inicio: { type: Date },
      url: {type:String, unique:true},
      itens : [item]
  });
  
  
  campanha.index({ 'ciclo.url': 1, url: 1 }, { unique: true });

  return db.model('campanhas', campanha);
};