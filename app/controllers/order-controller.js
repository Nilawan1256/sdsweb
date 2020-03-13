var async = require("async");
var _ = require("lodash");
var models = require("../models");
var multer	=	require('multer');


var exports = module.exports = {}

exports.index = async function (req, res) {

	try {
		var search = req.query.search;
		console.log(search)
		// const db = req.app.db;
		// const sql = "SELECT *,DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM sdsweb.`order`  WHERE order_name LIKE '%" + search + "%'";
		// await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		// 	.then(order => {
		// 		res.render('order/index', { title: 'เสถียรธรรมสถาน', menu_left: 'stock', page_title: '', data: order });
		// 	})
		// if(search!=""){
		if (!search) {
			const sql_where = [];
			let data = {};
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status_id, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select text from lov where lov.id = `order`.lov_payment_status_id) as lov_payment_status, ';
			sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id, ';
			sql += "(select username from user where user.id = `order`.create_by) as create_by,(select username from user where user.id = `order`.update_by) as update_by FROM `order` " + sql_where;
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.order = res;
					})
			);
			console.log(data);
			res.render('order/index', { title: 'เสถียรธรรมสถาน', menu_left: 'order', page_title: '', data: data });
		} else {
			let data = {};
			const sql_where = "where order_name LIKE '%" + search + "%' ";
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status_id, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select text from lov where lov.id = `order`.lov_payment_status_id) as lov_payment_status, ';
			sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id, ';
			sql += "(select username from user where user.id = `order`.create_by) as create_by,(select username from user where user.id = `order`.update_by) as update_by FROM `order` " + sql_where;
			await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
				.then(ress => {
					data.order = ress;
					res.render('order/index', { title: 'เสถียรธรรมสถาน', menu_left: 'order', page_title: '', data: data });
				})
		}
		// }//if
	}
	catch (err) {
		next();
	}
}

exports.edit = async function (req, res) {

	try {
		const edit_id = req.query.id;
		console.log("id = " + edit_id)
		const name = req.body.fname;
		console.log("name = " + name)


		if (edit_id != 0) {

			let data = {};
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status_id, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select text from lov where lov.id = `order`.lov_payment_status_id) as lov_payment_status, ';
			sql += '(select id from lov where lov.id = `order`.lov_payment_status_id) as lov_payment_status_id, ';
			sql += '(select text from lov where lov.id = `order`.lov_transfer_type_id) as lov_transfer_type, ';
			sql += '(select id from lov where lov.id = `order`.lov_transfer_type_id) as lov_transfer_type_id, ';
			sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point, ';
			sql += '(select text from lov where lov.id = `order`.project) as project, ';
			sql += '(select id from lov where lov.id = `order`.project) as project_id, ';
			sql += '(select id from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id, ';
			sql += '(select name from product_group where product_group.id = `order`.product_group_id) as product_group, ';
			sql += '(select id from product_group where product_group.id = `order`.product_group_id) as product_group_id, ';
			sql += "(select username from user where user.id = `order`.create_by) as create_by,(select username from user where user.id = `order`.update_by) as update_by FROM `order` WHERE id = '" + edit_id + "' ";

			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.order = res;
					})
			);

			let sql_lov_ser_point = "SELECT text ,id  FROM lov where lov.group = 'service_point_id' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_ser_point, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.lov_ser_point = res;
					})
			);

			let sql_lov_product = "SELECT *  FROM product_group";
			console.log(sql_lov_product)
			await (
				models.sequelize.query(sql_lov_product, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_product = ress;
					})
			);

			let sql_lov_payment = "SELECT text ,id  FROM lov where lov.group = 'payment_status' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_payment, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_payment = ress;
					})
			);

			let sql_lov_payment_status_group = "SELECT text ,id  FROM lov where lov.group = 'payment_status_group' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_payment_status_group, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_payment_status_group = ress;
					})
			);

			let sql_lov_project = "SELECT text ,id  FROM lov where lov.group = 'project_id' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_project, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_project = ress;
					})
			);

			data.id = edit_id;
			res.render('order/edit', { title: 'order', menu_left: 'order', page_title: 'Customer Edit', dataedit: data });

		} else {
			let data = {};
			const _data = [{}];
			data.order = _data;

			let sql_lov_ser_point = "SELECT text ,id  FROM lov where lov.group = 'service_point_id' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_ser_point, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.lov_ser_point = res;
					})
			);

			let sql_lov_product = "SELECT * FROM product_group ";
			console.log(sql_lov_product)
			await (
				models.sequelize.query(sql_lov_product, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_product = ress;
					})
			);

			let sql_lov_payment = "SELECT text ,id  FROM lov where lov.group = 'payment_type_group' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_payment, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_payment = ress;
					})
			);

			let sql_lov_payment_status_group = "SELECT text ,id  FROM lov where lov.group = 'payment_status' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_payment_status_group, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_payment_status_group = ress;
					})
			);

			let sql_lov_project = "SELECT text ,id  FROM lov where lov.group = 'project_id' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_project, { type: models.sequelize.QueryTypes.SELECT })
					.then(ress => {
						data.sql_lov_project = ress;
					})
			);
			

			res.render('order/edit', { title: 'order', menu_left: 'order', page_title: 'Customer Edit', dataedit: data, idedit: edit_id});
		}

	}
	catch (err) {
		next();
	}
}

exports.save = async function (req, res) {
	try {
		const _id = req.body.id;
		console.log("id = " + _id)

		var fname = req.body.fname;
		var lname = req.body.lname;
		var servicepoint = req.body.servicepoint;
		var ordername = req.body.ordername;
		var total = req.body.total;
		var project = req.body.project;
		var product = req.body.product;
		var paymenttype = req.body.paymenttype;
		var paymentperiod = req.body.paymentperiod;
		var paymentstatus = req.body.paymentstatus
		var comment = req.body.comment;

		var receipt_file = req.body.receipt_file;
		var create_by = 1;
		var update_by = 1;




		console.log("fname " + fname)
		console.log("lname " + lname)
		console.log("servicepoint " + servicepoint)
		console.log("ordername " + ordername)
		console.log("total " + total)
		console.log("project " + project)
		console.log("product " + product)
		console.log("paymenttype " + paymenttype)
		console.log("paymentperiod " + paymentperiod)
		console.log("paymentstatus " + paymentstatus)
		console.log("comment " + comment)





		if (!_id) {

			const sql = "insert into sdsweb.order (donor_id, lov_service_point_id, order_name, total, project, product_group_id,lov_transfer_type_id, payment_period, lov_payment_status_id, comment, create_by, update_by) values ((select id from donor where firstname = '" + fname + "'and lastname = '" + lname + "' ), '" + servicepoint + "', '" + ordername + "', '" + total + "', '" + project + "' , '" + product + "' , '" + paymenttype + "', '" + paymentperiod + "', '" + paymentstatus + "' , '" + comment + "' , 1 , 1)";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
					.then(_data => {
						console.log("เพิ่มข้อมูลสำเร็จ");
					})
					.catch(err => {
						console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
					})
			);
			res.redirect('/order');

		} else {
			await (
				models.order.update(
					{
						lov_service_point_id: req.body.servicepoint,
						order_name: req.body.ordername,
						total: req.body.total,
						project: req.body.project,
						product_group_id: req.body.product,
						lov_transfer_type_id: req.body.paymenttype,
						payment_period: req.body.paymentperiod,
						lov_payment_status_id: req.body.paymentstatus,
						comment: req.body.comment,
					},
					{
						where: {
							id: _id
						}
					}
				)
					.then(_data => {
						console.log("Updated Successfully !");
					})
					.catch(error => {
						console.log("Update Failed ! +");
					})
			);
			res.redirect('/order');
		}

	}
	catch (err) {
		next();
	}
}

exports.delete = async function (req, res) {
	try {
		models.order.destroy({
			where: { id: req.body.id }
		})
			.then(del => {
				console.log("Deleted successfully " + del);
			})
		res.redirect(req.get('order'));
	} catch (err) {
		next();
	}
}

exports.uploadbulk = async function (req, res) {
	try {
		let db = req.app.db;
		let data = {};
		await (		db.lov.findAll({
			attributes: ['id', 'text'],
			where: { group: 'service_point_id' }
		
		}).then(res => {
			data.service_point_id = res;
			// console.log(JSON.stringify(data.service_point_id));
	}));

		let sql_lov_donor_verify_status_id = "SELECT text ,id  FROM lov WHERE lov.group = 'donor_verify_status_id' AND lov.delete_flag = 0";
		await (models.sequelize
		.query(sql_lov_donor_verify_status_id, {type: models.sequelize.QueryTypes.SELECT})
		.then(res => {
			data.sql_lov_donor_verify_status_id = res;
			// console.log(JSON.stringify(res));
		}));

		let sql_lov_order_verify_status_id = "SELECT text ,id  FROM lov WHERE lov.group = 'order_verify_status_id' AND lov.delete_flag = 0";
		await (models.sequelize
		.query(sql_lov_order_verify_status_id, {type: models.sequelize.QueryTypes.SELECT})
		.then(res => {
			data.sql_lov_order_verify_status_id = res;
			// console.log(JSON.stringify(res));
		}));
		console.log(JSON.stringify(data));
	res.render('order/uploadbulk', { title: 'uploadbulk', menu_left: 'uploadbulk', page_title: '', data: data });
	}
	
	catch (err) {
		console.log(err);
		// next();
	}
}

exports.uploadbulksave = async function (req, res) {
	try {
		var storage	=	multer.diskStorage({
			destination: function (req, file, callback) {
			  callback(null, './app/public/upload');
			},
			filename: function (req, file, callback) {
			  callback(null, file.originalname);
			}
		});
		var upload = multer({ storage : storage}).array('myfile', 50);
		upload(req,res,function(err) {
			// let db = req.app.db;
			// db.order_upload.create({
			// 	lov_service_point_id: req.body.point,
			// 	lov_donor_verify_status_id: req.body.donor_status,
			// 	lov_order_verify_status_id: req.body.order_status
			// });
			if(err) {
				return res.end("Error uploading file.");
			}
			res.end("File is uploaded successfully!");
		});
		// res.render('order/uploadbulksave', { title: 'uploadbulk', menu_left: 'uploadbulk', page_title: '', data: null });
	console.log(req.body.id);
	}
	catch (err) {
		console.log(err);
		// next();
	}
}
