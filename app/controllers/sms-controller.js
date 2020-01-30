var async = require("async");
var _ = require("lodash");
var models = require("../models");
var Nexmo = require('nexmo');
var PhoneNumber = require( 'awesome-phonenumber' );
var axios = require('axios')
var exports = module.exports = {}

// var nexmo = new Nexmo({
// 	apiKey: '75e9a525',
// 	apiSecret: 'H0ZLLWSQY7YJuFjY',
// });

exports.index = async function (req, res) {
	try {
		const press = req.query.type;
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

		const username = 'thekingz001';
    	const password = 'K0986501046';
    	const msisdn = req.body.data[1];
    	const message = req.body.text;
    	const sender = 'SPECIAL';
    	const ScheduledDelivery = Date.now();
    	const force = 'Standard';
		// const url = 'http://www.thaibulksms.com/sms_api.php';
		const url1 = 'http://www.thsms.com/api/rest';
	    // const pmeters = 'username=' + username + '&password=' + password + '&msisdn=' + msisdn + '&message=' + message + '&sender=' + sender + '&ScheduledDelivery=' + ScheduledDelivery + '&force=' + force;
	    const pmeters1 = 'method=send&username=' + username + '&password=' + password + '&from=' + sender + '&to=' + msisdn + '&message=' + message;
		
		axios.post(url1, pmeters1)
  		.then(res => {
    		// console.log(`statusCode: ${res.statusCode}`)
    		console.log(res)
  		})
  		.catch(error => {
    		console.error(error)
		})
		
		//convert phone number
		// const phone = req.body.data[1];
		// const newphone = new PhoneNumber( phone, 'TH' );
		// const to = newphone.getNumber( 'e164' );
		// console.log("Phone = " + JSON.stringify(to));

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
