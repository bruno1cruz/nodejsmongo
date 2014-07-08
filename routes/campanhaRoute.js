module.exports = function(app) {

	campanhas = app.controllers.campanhaController;

	app.get('/campanha', campanhas.novo);
	app.get('/campanha/:campanhaURL', campanhas.get);
	app.post('/campanha', campanhas.cadastrar);
	
};