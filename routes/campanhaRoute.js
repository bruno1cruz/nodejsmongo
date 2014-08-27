module.exports = function(app) {

	var campanhas = app.controllers.campanhaController;

	app.get('/:cicloURL/campanha', campanhas.novo);
	app.get('/campanhas', campanhas.listar);
	app.get('/:cicloURL/campanha/:campanhaURL', campanhas.get);
	app.post('/:cicloURL/campanha', campanhas.cadastrar);
	
};