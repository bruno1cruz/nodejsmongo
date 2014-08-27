var mongoose = require('mongoose')
  , single_connection
  , env_url = {
    "test": "mongodb://localhost/megatip-ofertas-test",
    "development": "mongodb://localhost/megatip-ofertas-dev",
    "approval" :  "mongodb://homologacao:homoMtip@kahana.mongohq.com:10061/megatip-homologacao"
  }
;

module.exports = function() {
  var url = env_url[process.env.NODE_ENV] || env_url.approval;
  
  if(!single_connection) {
    single_connection = mongoose.connect(url);
  }
  
  return single_connection;
};
