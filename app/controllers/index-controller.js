var async = require("async");
var _ = require("lodash");
var moment = require('moment');
var models = require("../models");

var exports = module.exports = {}

exports.index = async function(req, res, next){	
	try{
		// const db = req.app.db;
		// const _user = await db.user.findOne({ id:1 });
		// console.log(_user);
		const data = [];

		const Datenow = moment(Date.now()).format('YYYY/MM/DD');
		const sql_order_pepole_total = "select COUNT(id) as total from sdsweb.order where create_date = '" + Datenow + "'";
		await (
			models.sequelize.query(sql_order_pepole_total, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				data.order_pepole_total = _data;
				// console.log("data.order_pepole_total = " + JSON.stringify(_data));
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		);

		// const sql_order_pepole_total = "select COUNT(id) as total from sdsweb.order where create_date = '" + Datenow + "'";
		// await (
		// 	models.sequelize.query(sql_order_pepole_total, { type: models.sequelize.QueryTypes.SELECT })
		// 	.then(_data => {
		// 		data.order_pepole_total = _data;
		// 		// console.log("data.order_pepole_total = " + JSON.stringify(_data));
		// 	})
		// 	.catch(err => {
		// 		console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
		// 	})
		// );

		const sql_order = "select id, donor_id, (select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, (select `text` from lov where lov.id = `order`.lov_payment_status_id) as lov_payment_status_id, `comment`, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, (select username from user where user.id = `order`.create_by) as create_by,(select username from user where user.id = `order`.update_by) as update_by, DATE_FORMAT(update_date, \"%d/%m/%Y\") as update_date from sdsweb.order";
		await (
			models.sequelize.query(sql_order, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				data.order = _data;
				// console.log("data.order = " + JSON.stringify(_data));
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		);

		res.render('index', { title: 'เสถียรธรรมสถาน ระบบจัดการข้อมูลผู้ร่วมบุญ', menu_left:'dashboard', page_title:'', data:data });
	}
	catch(err){
		next();
	}
}

exports.error404 = async function(req,res,next){
	try{
		res.render('error404', { title: 'Error 404', menu_left:'dashboard', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

