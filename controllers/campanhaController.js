module.exports = function(app) {

	var ObjectId = require('mongoose').Types.ObjectId;
	var Campanha = app.models.campanha;
	var Ciclo = app.models.ciclo;
	var CronJob = require('cron').CronJob;
	var tools = require('../lib/tools');
	var EventEmitter = require('events').EventEmitter;
	var eventEmitter = new EventEmitter();

	var CampanhaController = {

		novo : function(req, res) {
			
			Ciclo.findOne({url : req.params.cicloURL},function(err, ciclo){
			
				if(req.query.id){
					
					Campanha.findOne({_id : new ObjectId(req.query.id)},function(err, campanha) {
						res.render('campanha/formulario', {"ciclo":ciclo, "campanha" : campanha });
					});
					
				} else {
					res.render('campanha/formulario', {"ciclo":ciclo });
				}
			
			})
		},

		get : function(req, res) {
			
			Campanha.findOne({"ciclo.url" : req.params.cicloURL,"url" : req.params.campanhaURL},function(err,campanha){
				res.render('campanha/visao', {"campanha": campanha});
			});
			
		},

		listar : function(req, res) {
			
			Ciclo.findOne({url : req.params.cicloURL},function(err, ciclo){
				
				Campanha.find({"ciclo.url" : req.params.cicloURL},function(err,campanhas){
					res.render('campanha/lista', {"ciclo":ciclo , "campanhas": campanhas});
				}).sort('-inicio');
			
			})
			
		},
		cadastrar : function(req, res) {
			
			var campanha = req.body.campanha;

			campanha.inicio = tools.toDate(campanha.inicio);
			campanha.url = tools.slug(campanha.nome);
			
			campanha = new Campanha(req.body.campanha);

			campanha.save(function() {
				
				eventEmitter.emit("campanha:created",campanha);
				
				res.json({
						mensagem :'Campanha ' + campanha.nome + ' criada com sucesso.', 
						redireciona:'/'+campanha.ciclo.url+'/campanha/'+campanha.url
					
				});
			});

		},
		
		atualizar : function(req, res) {

			var campanha = req.body.campanha;

			campanha.inicio = tools.toDate(campanha.inicio);
			campanha.url = tools.slug(campanha.nome);
			
			campanha = new Campanha(req.body.campanha);

			campanha.save(function() {
				
				eventEmitter.emit("campanha:created",campanha);
				
				res.json({
					mensagem :'Campanha ' + campanha.nome + ' criada com sucesso.', 
					redireciona:'/'+campanha.ciclo.url+'/campanha/'+campanha.url
				});
			});

		},
		carregar_imagem : function(req, res) {
			
			
			var multiparty = require('multiparty');
			
			var form = new multiparty.Form();

		    form.parse(req, function(err, fields, files) {
		    	
		    	var imagem = files.imagem[0];
		    	
		    	if (imagem.size > 0){
		    		
		    		tools.upload({
			      		fileName : "mkt/" + fields.cicloURL + "/" + fields.campanhaURL + "/" + fields.campanhaURL,
			      		filePath : imagem.path,
			      		contentType : imagem.headers["content-type"]
		      		}, function(status){
						res.render("util/callback_iframe", {status: status});
		      		});
		    		
		    	} else {
		    		res.render("util/callback_iframe", {status: {ok: false, "mensagem" : "Nenhuma imagem selecionada"}});
		    	}
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
		
		tools.mail("cruzbruno2000@yahoo.com.br","campanha iniciada", "Campanha " + campanha.nome + " iniciada.")
		
		
	});

	return CampanhaController;
};