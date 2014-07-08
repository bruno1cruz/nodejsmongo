module.exports = function(app) {

	var Usuario = app.models.usuario;

	var UsuarioController = {

		novo : function(req, res) {

			res.render('usuario/novo');
		},

		cadastrar : function(req, res) {

			var usuario = new Usuario(req.body.usuario);
			
			console.log("Tentando cadastrar: " + usuario.nome);

			usuario.save(function() {
				res.redirect('/usuarios');
			});

		},

		listar : function(req, res) {

			Usuario.find({},function(err,usuarios){
				
				console.log("Usuarios encontrados: " + usuarios.length);
				
				res.render('usuario/lista',{"usuarios":usuarios});
				
			});
			
		}

	/*
	 * index : function(req, res) { var _id = req.session.usuario._id;
	 * Usuario.findById(_id, function(erro, usuario) { var contatos =
	 * usuario.contatos; var resultado = { contatos : contatos };
	 * res.render('contatos/index', resultado); }); },
	 * 
	 * create : function(req, res) { var _id = req.session.usuario._id;
	 * Usuario.findById(_id, function(erro, usuario) { var contato =
	 * req.body.contato; usuario.contatos.push(contato); usuario.save(function() {
	 * res.redirect('/contatos'); }); }); },
	 * 
	 * show : function(req, res) { var _id = req.session.usuario._id;
	 * Usuario.findById(_id, function(erro, usuario) { var contatoID =
	 * req.params.id; var contato = usuario.contatos.id(contatoID); var
	 * resultado = { contato : contato }; res.render('contatos/show',
	 * resultado); }); },
	 * 
	 * edit : function(req, res) { var _id = req.session.usuario._id;
	 * Usuario.findById(_id, function(erro, usuario) { var contatoID =
	 * req.params.id; var contato = usuario.contatos.id(contatoID); var
	 * resultado = { contato : contato }; res.render('contatos/edit',
	 * resultado); }); },
	 * 
	 * update : function(req, res) { var _id = req.session.usuario._id;
	 * Usuario.findById(_id, function(erro, usuario) { var contatoID =
	 * req.params.id; var contato = usuario.contatos.id(contatoID); contato.nome =
	 * req.body.contato.nome; contato.email = req.body.contato.email;
	 * usuario.save(function() { res.redirect('/contatos'); }); }); },
	 * 
	 * destroy : function(req, res) { var _id = req.session.usuario._id;
	 * Usuario.findById(_id, function(erro, usuario) { var contatoID =
	 * req.params.id; usuario.contatos.id(contatoID).remove();
	 * usuario.save(function() { res.redirect('/contatos'); }); }); }
	 */
	}

	return UsuarioController;
};