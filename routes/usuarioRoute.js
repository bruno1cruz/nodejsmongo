module.exports = function(app) {

	usuarios = app.controllers.usuarioController;

	app.get('/usuario', usuarios.novo);
	app.get('/usuarios', usuarios.listar);
	app.post('/usuario', usuarios.cadastrar);

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