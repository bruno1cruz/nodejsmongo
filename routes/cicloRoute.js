module.exports = function(app) {

	var ciclos = app.controllers.cicloController;

	app.get('/ciclo', ciclos.novo);
	app.get('/ciclos', ciclos.listar);
	app.post('/ciclo', ciclos.cadastrar);

};