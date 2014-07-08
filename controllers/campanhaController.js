module.exports = function(app) {

	var Campanha = app.models.campanha;
	var CronJob = require('cron').CronJob;
	var tools = require('../lib/tools');
	var EventEmitter = require('events').EventEmitter;
	var eventEmitter = new EventEmitter();

	var CampanhaController = {

		novo : function(req, res) {
			res.render('campanha/novo');
		},
		
		get : function(req, res) {
			
			Campanha.findOne({"url" : req.params.campanhaURL},function(err,campanha){
				
				res.render('campanha/visao', {"campanha": campanha});
			});
			
		},

		cadastrar : function(req, res) {

			var campanha = req.body.campanha;

			campanha.inicio = tools.toDate(campanha.inicio);
			
			campanha = new Campanha(req.body.campanha);
			
			console.log("Tentando cadastrar: " + campanha.nome);

			campanha.save(function() {
				
				eventEmitter.emit("campanha:created",campanha);
				
				res.redirect('/campanha/'+campanha.url);
			});

		}

	};
	
	
	// ativando SCHEDULER
	eventEmitter.on("campanha:created", function(campanha){
		
		console.log("Ativando Scheduler para a campanha " + campanha.nome);
		
		var inicio = new Date();
		
		inicio.setMinutes(inicio.getMinutes() + 1);
		
		new CronJob(inicio, function() {
			console.log("Campanha " + campanha.nome + " foi iniciada!!");
			app.emit("campanha:started",campanha);
			this.stop();
		}, function() {
			console.log(campanha);
		}, true);
		
	});

	return CampanhaController;
};