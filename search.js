var AWS = require("aws-sdk");

AWS.config.update({
	region : 'us-east-1'
});

var ddb = new AWS.DynamoDB.DocumentClient();
var jade = require('jade');
var fs = require('fs');

var getColleges = function(req, callback) {

	var params = {
		TableName : "CollegeSportsSpending",
		IndexName : "state_cd-index",
		KeyConditionExpression : "#state_cd = :STATE",
		ExpressionAttributeNames : {
			"#state_cd" : "state_cd"
		},
		ExpressionAttributeValues : {
			":STATE" : req.query.stateSel
		},
		ProjectionExpression : "unitid,institution_name"
	};

	var items = [];
	scanExecute(params, items, callback);
};

var scanExecute = function(params, items, callback) {
	ddb.query(params, function(err, result) {

		if (err) {
			console.log(err);
			callback(err, items);
		}

		if (!result) {
			console.log("Empty result");
			return;
		}

		items = items.concat(result.Items);
		if (result.LastEvaluatedKey) {
			params.ExclusiveStartKey = result.LastEvaluatedKey;
			scanExecute(params, items, callback);
		} else {
			callback(err, items);
		}
	});

}

exports.search = function(req, res) {
	getColleges(req, function(err, items) {
		if (err) {
			console.log(err);
			response.write(err);
		}
		var html;
		fs.readFile('views/table.jade', 'utf8', function(err, data) {
			if (err) {
				console.log(err);
				response.write(err);
			}
			var fn = jade.compile(data);
			html = fn({
				colleges : items
			});
			respond(html);
		});
	});

	var respond = function(html) {
		res.header('Content-type', 'application/json');
		res.header('Charset', 'utf8');

		res.send(html);
	}
};
