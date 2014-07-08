module.exports = function(app) {

  var home = app.controllers.principalController;

  app.get('/', home.index);

  app.post('/entrar', home.login);

  app.get('/sair', home.logout);
  
};