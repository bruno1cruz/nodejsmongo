var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var Usuario = mongoose.model('usuarios');

passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'senha',passReqToCallback : true },
    function(email, senha, done) {
      
      console.log("Autennticando: " + email);
      
      
      Usuario.findOne({ email: email }, function (err, usuario) {
        
        if (err) { return done(err); }
        
        if (!usuario) {
          return done(null, false, { message: 'Credenciais inválidas' });
        }
        
        return done(null, usuario);
      });
    }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Usuario.findOne({"id" : id},function(err,usuario){
    done(err, usuario);
  });
});