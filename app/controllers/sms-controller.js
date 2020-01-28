var async = require("async");
var _ = require("lodash");
var models = require("../models");
var Nexmo = require('nexmo');
var PhoneNumber = require( 'awesome-phonenumber' );
var exports = module.exports = {}

var nexmo = new Nexmo({
	apiKey: '75e9a525',
	apiSecret: 'H0ZLLWSQY7YJuFjY',
});

exports.index = async function (req, res) {
	try {
		const press = req.query.type;
		console.log("asdasdasd = " + press);
		if (!press){
			const sql_where = [];
			const sql = "select id, firstname, lastname, phone, line, email from donor " + sql_where;
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				res.render('sms/index', { title: 'sms', menu_left: 'sms', page_title: '', data: _data });
			})
		}
		else{
			const sql_where = "where firstname LIKE '%"+ press +"%' or lastname LIKE '%"+ press +"%'";
			const sql = "select firstname, lastname,  phone, line, email from donor " + sql_where;
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				res.render('sms/index', { title: 'sms', menu_left: 'sms', page_title: '', data: _data });
			})
		}

	}
	catch (err) {
		console.log("Error is = " + err);
		next();
	}
}

exports.sends = async function (req, res) {
	try {
		const from = 'Nexmo';
		const text = req.body.smstext;

		//convert phone number
		const phone = req.body.data[1];
		console.log(JSON.stringify(phone));
		const newphone = new PhoneNumber( phone, 'TH' );
		const to = newphone.getNumber( 'e164' );

		console.log("from = " + from);
		console.log("text = " + text);
		console.log("to = " + to);

		// nexmo.message.sendSms(
		// 	from, to, text, { type: 'unicode' },
		// 	(err, responseData) => {
		// 	  if(err) {
		// 		console.log(err);
		// 	  } else {
		// 		console.log("SMS Data = " + JSON.stringify(responseData));
		// 	  }
		// 	}
		// );

		res.redirect('/sms');
		// res.render('index', { title: 'sms', menu_left:'sms', page_title:'', data:null });
	}
	catch (err) {
		console.log("Error is = " + err);
		next();
	}
}
