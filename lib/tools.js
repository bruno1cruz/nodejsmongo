/**
 * data deve estar no padra dd/MM/yyyy HH:mm ou dd/MM/yyyy
 */
exports.toDate = function(string_date) {

	var hasTime = string_date.split(" ").length > 1;
	
	if (hasTime){
		var _date = string_date.split(" ")[0].split("/");
		var _time = string_date.split(" ")[1].split(":");
		
		return new Date(_date[2], _date[1] - 1, _date[0], _time[0], _time[1]);
	} else {
		var _date = string_date.split("/");
		return new Date(_date[2], _date[1] - 1, _date[0]);
	}
};

/**
 * transforma uma "string" em MD5
 */

exports.md5 = function(string) {
	var crypto = require('crypto');
	return crypto.createHash('md5').update(string).digest('hex');
}

exports.slug = function(text) {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};