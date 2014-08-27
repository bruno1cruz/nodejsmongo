module.exports = function(app) {

	var usuarios = app.controllers.usuarioController;
	var passport = require("passport");
	
	require("../middleware/passport");// configurando passport

	app.get('/usuario', usuarios.novo);
	app.get('/usuarios', usuarios.listar);
	app.post('/usuario', usuarios.cadastrar);
	
	app.get('/usuario/entrar', usuarios.entrar);
	
	app.post('/usuario/entrar', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/usuario/entrar',failureFlash: true }));

	/*
	app.get('/usuarios', usuarios.index);
	app.get('/usuario/:id', usuarios.show);
	app.post('/usuario', usuarios.create);
	app.get('/usuario/:id/editar', usuarios.edit);
	app.put('/usuario/:id', usuarios.update);
	app.del('/usuario/:id', usuarios.destroy);
	
	
	
	https://github.com/visionmedia/express/blob/master/examples/route-map/index.js
*/
};