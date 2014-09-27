var 
  flash = require('connect-flash')
  , express = require('express')
  , passport = require('passport')
  , app = express()
  , load = require('express-load')
  , server = require('http').createServer(app)
  , error = require('./middleware/error')
  , cfg = require('./config.json')
  , io = require('socket.io').listen(server)
;

app.configure(function() {
  app.use(express.logger('dev'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //app.use(express.json());
  //app.use(express.urlencoded());
  
  app.use(express.compress(cfg.GZIP_LVL));

  app.use(app.router);
  app.use(express.static(__dirname + '/public', cfg.MAX_AGE));

  app.use(error.notFound);
  app.use(error.serverError);
  
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(flash());
  

});

io.enable('browser client cache');
io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);
//io.set('store', new SocketStore);


load('models')
  .then('controllers')
  .then('routes')
  .into(app,io);

load('sockets')
.into(io);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP ||  "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

server.listen(port,ipaddress, function(){
  console.log("Tempo de Ofertas - Online");
});


app.on('campanha:started',function(campanha){
	console.log(campanha.nome);
	io.sockets.emit("campanha:started",campanha);
});

module.exports = app;