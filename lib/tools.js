/**
 * data deve estar no padra dd/MM/yyyy HH:mm
 */
exports.toDate = function(string_date) {

	var _date = string_date.split(" ")[0].split("/");
	var _time = string_date.split(" ")[1].split(":");

	return new Date(_date[2], _date[1] - 1, _date[0], _time[0], _time[1]);

};