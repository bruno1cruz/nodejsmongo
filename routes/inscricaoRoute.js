module.exports = function(app) {

	inscricoes = app.controllers.inscricaoController;

	app.post('/campanha/:campanhaId/inscrever', inscricoes.cadastrar);

};