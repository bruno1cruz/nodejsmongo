module.exports = function(io) {

	var sockets = io.sockets;
	var mongoose = require('mongoose');
	var Inscricao = mongoose.model('inscricoes');
	var Campanha = mongoose.model('campanhas');
//	var CampanhaController =require('../controllers/campanhas');
	
	sockets.on('connection', function(client) {
		
		var onlines = sockets.clients();
		
		client.broadcast.emit('notify-new-online', onlines.length);
		client.emit('notify-new-online', onlines.length);
		
		client.on('send-subscription', function(data) {
			
			var inscricao = new Inscricao({
										"usuario":{ "email" : data.email},
										"campanha":{"id" : data.campanha}
										});

			inscricao.save(function() {
				
				client.broadcast.emit('notify-new-substription', 1);

				Campanha.update({ "_id" : inscricao.campanha.id }, { "$inc" : { "contador" : 1 } });

			});
			
			
		});
		

	});
	
};