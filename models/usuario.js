module.exports = function(app) {

  var db = require('../lib/db_connect')(),
      Schema = require('mongoose').Schema,
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10;

  var usuario = Schema({
      nome: { type: String, required: true },
      cpf: { type: String, required: true, index: {unique : true} },
      email: { type: String, required: true, index: {unique: true} },
      senha: { type: String, required: true }
  });
  
  usuario.pre('save', function(next) {
    var user = this;
    
    if (!user.isModified('senha')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      
      bcrypt.hash(user.senha, salt, function(err, hash) {
      
      if (err) return next(err);
 
      user.senha = hash;
      next();
      });
    });
  });
  
  return db.model('usuarios', usuario);
};