var async = require("async");
var _ = require("lodash");
var moment = require('moment');
var models = require("../models");

var exports = module.exports = {}

exports.index = async function (req, res, next) {
	try {
		// const db = req.app.db;
		// const _user = await db.user.findOne({ id:1 });
		// console.log(_user);
		const data = [];
		const Datenow = moment(Date.now()).format('YYYY/MM/DD');
		var
			// Local ip address that we're trying to calculate
			address
			// Provides a few basic operating-system related utility functions (built-in)
			, os = require('os')
			// Network interfaces
			, ifaces = os.networkInterfaces();


		// Iterate over interfaces ...
		for (var dev in ifaces) {

			// ... and find the one that matches the criteria
			var iface = ifaces[dev].filter(function (details) {
				return details.family === 'IPv4' && details.internal === false;
			});

			if (iface.length > 0) address = iface[0].address;
		}

		// Print the result
		console.log(address);

		const sql_count_del= "DELETE FROM counter WHERE DATE != '" + Datenow + "'";
		await (
			models.sequelize.query(sql_count_del, { type: models.sequelize.QueryTypes.DELETE })
				.then(_data => {
					data.sql_count_del = _data;
					// console.log("data.order_pepole_total = " + JSON.stringify(_data));
				})
				.catch(err => {
					console.log("ลบไม่สำเร็จ " + err);
				})
		);

		const sql_count_pepole_total = "INSERT INTO sdsweb.counter (DATE,IP) VALUES ('" + Datenow + "' ,'" + address + "')";
		await (
			models.sequelize.query(sql_count_pepole_total, { type: models.sequelize.QueryTypes.INSERT })
				.then(_data => {
					data.sql_count_pepole_total = _data;
					// console.log("data.order_pepole_total = " + JSON.stringify(_data));
				})
				.catch(err => {
					console.log("เพิ่มไอพีไม่สำเร็จ " + err);
				})
		);


		const sql_order_pepole_total = "SELECT COUNT(DATE) AS CounterToday FROM counter WHERE DATE = '" + Datenow + "' ";
		console.log(sql_order_pepole_total)
		await (
			models.sequelize.query(sql_order_pepole_total, { type: models.sequelize.QueryTypes.SELECT })
				.then(_data => {
					data.sql_order_pepole_total = _data;
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

		res.render('index', { title: 'เสถียรธรรมสถาน ระบบจัดการข้อมูลผู้ร่วมบุญ', menu_left: 'dashboard', page_title: '', data: data });
	}
	catch (err) {
		next();
	}
}

exports.error404 = async function (req, res, next) {
	try {
		res.render('error404', { title: 'Error 404', menu_left: 'dashboard', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}

