module.exports = function(app) {

	var usuarios = app.controllers.usuarioController;
	
	
	require("../middleware/passport");// configurando passport

	app.get('/usuario', usuarios.novo);
	app.get('/usuario/:usuarioId', usuarios.get);
	app.get('/usuario/:usuarioId/editar', usuarios.getAtualizar);
	app.get('/usuarios', usuarios.listar);
	app.post('/usuario', usuarios.cadastrar);
	app.put('/usuario', usuarios.atualizar);

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