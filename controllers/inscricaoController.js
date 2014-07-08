module.exports = function(app) {

	var Inscricao = app.models.inscricao;

	var InscricaoController = {

		cadastrar : function(req, res) {

			var inscricao = new Inscricao(req.body.inscricao);

			inscricao.campanha.id = req.params.campanhaId;

			inscricao.save(function() {

				var Campanha = app.models.campanha;

				Campanha.update({ "_id" : inscricao.campanha.id }, { "$inc" : { "contador" : 1 } }, function(err) {

					console.log(err);
					
					Campanha.findOne({ "_id" : inscricao.campanha.id }, function(err, campanha) {

						res.redirect('/campanha/' + campanha.url);

					});
				});

			});

		}

	};

	return InscricaoController;
};