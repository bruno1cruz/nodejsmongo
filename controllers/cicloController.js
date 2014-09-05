module.exports = function(app) {

	var Ciclo = app.models.ciclo;
	var tools = require('../lib/tools');

	var CicloController = {

		novo : function(req, res) {

			res.render('ciclo/formulario');
		},

		cadastrar : function(req, res) {
			
			var ciclo = req.body.ciclo;
			
			ciclo.inicio = tools.toDate(ciclo.inicio);
			ciclo.fim = tools.toDate(ciclo.fim);
			ciclo.url = tools.slug(ciclo.nome);
			
			ciclo = new Ciclo(ciclo);
			
			ciclo.save(function() {
				res.redirect('/ciclos');
			});

		},

		listar : function(req, res) {

			Ciclo.find({},function(err,ciclos){
				
				res.render('ciclo/lista',{"ciclos":ciclos});
				
			});
			
		}
	}

	return CicloController;
};