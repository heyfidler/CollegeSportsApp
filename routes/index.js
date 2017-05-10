var express = require('express');
var router = express.Router();

var states = [ "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
		"GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME",
		"MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
		"NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA",
		"VT", "WA", "WI", "WV", "WY" ];

router.get('/', function(req, res, next) {
	res.render('index', {
		title : 'College Sports',
		states : states
	});
});

module.exports = router;
