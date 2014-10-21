module.exports = function(app) {

	var campanhas = app.controllers.campanhaController;

	app.get('/:cicloURL/campanha', campanhas.novo);
	app.get('/ciclo/:cicloURL/campanhas', campanhas.listar);
	app.get('/:cicloURL/campanha/:campanhaURL', campanhas.get);
	app.post('/:cicloURL/campanha', campanhas.cadastrar);
	app.post('/:cicloURL/campanha/imagem', campanhas.carregar_imagem);
	app.put('/:cicloURL/campanha', campanhas.atualizar);
	
};