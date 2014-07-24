exports.notFound = function(req, res, next) {
  res.status(404);
  res.render('not-found');
};

exports.serverError = function(error, req, res, next) {
    console.log("## Erro inesperado: " + error);
  res.status(500);
  res.render('server-error', {error: error});
};