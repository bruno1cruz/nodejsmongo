module.exports = function(app) {

	var ciclos = app.controllers.cicloController;

	app.get('/ciclo', ciclos.novo);
	app.get('/ciclos', ciclos.listar);
	app.post('/ciclo', ciclos.cadastrar);
	app.post('/ciclo/:cicloURL/ativar', ciclos.ativar);
	app.post('/ciclo/:cicloURL/desativar', ciclos.desativar);

};