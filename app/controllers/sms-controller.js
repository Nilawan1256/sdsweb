var async = require("async");
var _ = require("lodash");
var models = require("../models");
var Nexmo = require('nexmo');
var exports = module.exports = {}

var nexmo = new Nexmo({
	apiKey: '75e9a525',
	apiSecret: 'H0ZLLWSQY7YJuFjY',
});

exports.index = async function (req, res) {
	try {
		models.donor.findAll().then(_donor => {
			res.render('sms/index', { title: 'sms', menu_left: 'sms', page_title: '', data: _donor });
		})
	}
	catch (err) {
		next();
	}
}

exports.sends = async function (req, res) {
	try {
		console.log(req.body.data);
		const from = 'Nexmo';
		const to = "66986501046";
		const text = "test sms sdsweb";
		// nexmo.message.sendSms(
		// 	from, to, text, { type: 'unicode' },
		// 	(err, responseData) => {
		// 	  if(err) {
		// 		console.log(err);
		// 	  } else {
		// 		console.log("Test sms = " + JSON.stringify(responseData));
		// 	  }
		// 	}
		// );
		res.redirect('/sms');
		// res.render('index', { title: 'sms', menu_left:'sms', page_title:'', data:null });
	}
	catch (err) {
		next();
	}
}
