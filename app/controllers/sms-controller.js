var async = require("async");
var _ = require("lodash");
var models = require("../models");
var moment = require('moment');
var axios = require('axios')
var exports = module.exports = {}

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
		const receiver = req.body.id;
    	const message = req.body.text;
    	const sender = 'SPECIAL';
    	const ScheduledDelivery = moment(Date.now()).format('YYYY/MM/DD');
		const force = 'Standard';
		
		// const url = 'http://www.thaibulksms.com/sms_api.php';
		// const pmeters = 'username=' + username + '&password=' + password + '&msisdn=' + msisdn + '&message=' + message + '&sender=' + sender + '&ScheduledDelivery=' + ScheduledDelivery + '&force=' + force;
		const url1 = 'http://www.thsms.com/api/rest';
	    const pmeters1 = 'method=send&username=' + username + '&password=' + password + '&from=' + sender + '&to=' + msisdn + '&message=' + message;
		
		const sql = "insert into sms (sender, receiver, send_date, message)\
		values ('1', '" + receiver + "', '" + ScheduledDelivery + "', '" + message + "')";
			await(
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
				.then(_data => {
					console.log("เพิ่มข้อมูลสำเร็จ");
				})
				.catch(err => {
					console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
				})
			);

		axios.post(url1, pmeters1)
  		.then(res => {
    		console.log(`statusCode: ${res.statusCode}`)
    		// console.log(res)
  		})
  		.catch(error => {
    		console.error(error)
		})

		res.redirect('/sms');
		// res.render('index', { title: 'sms', menu_left:'sms', page_title:'', data:null });
	}
	catch (err) {
		console.log("Error is = " + err);
		next();
	}
}
