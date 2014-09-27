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

exports.upload =function(fileInfo){
	
	var AWS = require('aws-sdk');
	var config = require('../config.json').AWS;
	
	AWS.config = {"accessKeyId": config.accessKeyId, "secretAccessKey": config.secretAccessKey, "region": config.region};
	
	var s3 = new AWS.S3();
	
	require('fs').readFile(fileInfo.filePath, function (err, data) {
		if (err) throw err;
		
		var params = {
			Bucket: config.bucketName,
			Key: fileInfo.fileName, 
			Body: data,
			ACL: 'public-read',
			ContentType: fileInfo.contentType
		};
		
		console.log(params);
		
		s3.putObject(params, function(err, data) {
			if (err) console.log(err)
			else
				console.log("Successfully uploaded data to myBucket/myKey");
				
			console.log(data);
		
		});
	});
	
}