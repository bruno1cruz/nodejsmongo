module.exports = function(app) {

  var home = app.controllers.principalController;
  var passport = require("passport");

  app.get('/', home.index);

  //app.post('/entrar', home.login);
  
  
	app.post('/entrar', passport.authenticate('local', { successRedirect: '/ciclos',
                                   failureRedirect: '/entrar',failureFlash: true }));
  
  app.get('/entrar', home.entrarFormulario);

  app.get('/sair', home.logout);
  
};