var async = require("async");
var _ = require("lodash");
var models = require("../models");
var multer = require('multer');


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
		let data = {};
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select text from lov where lov.id = `order`.lov_payment_status) as lov_payment_status, ';
			sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id, ';
			sql += "(select username from user where user.id = `order`.create_by) as create_by,(select username from user where user.id = `order`.update_by) as update_by FROM `order` ";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.order = res;
					})
			);
			console.log(data);
			res.render('order/index', { title: 'เสถียรธรรมสถาน', menu_left: 'order', page_title: '', data: data });
// }//if
	}
	catch (err) {
		next();
	}
}

exports.edit = async function (req, res) {

	try {
		const edit_id = req.query.id;
		console.log("id = "+edit_id)

		if (edit_id != 0) {
			// await models.order.findOne({ where: { id: edit_id } })
			// 	.then(_data => {
			// 		res.render('order/edit', { title: 'order', menu_left: 'order', page_title: 'Customer Edit', dataedit: _data, id: edit_id });
			// 	})
			let data = {};
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select text from lov where lov.id = `order`.lov_payment_status) as lov_payment_status, ';
			sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id, ';
			sql += '(select name from product_group where product_group.id = `order`.product_group_id) as product_group_id, ';
			sql += "(select username from user where user.id = `order`.create_by) as create_by,(select username from user where user.id = `order`.update_by) as update_by FROM `order` WHERE id = '"+edit_id+"' ";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.order = res;
					})
			);
			res.render('order/edit', { title: 'order', menu_left: 'order', page_title: 'Customer Edit', dataedit: data, id: edit_id });
		} else {
			let data = {};
				const _data = [{}];
				const ch = 0;
						data.order =_data;
				res.render('order/edit', { title: 'order', menu_left:'order', page_title:'Customer Edit', dataedit: data, ch:ch });
		}
		// var ordername = req.body.ordername;
		// var total = req.body.total;
		// var paymentperiod = req.body.paymentperiod;
		// var comment = req.body.comment;
		// var servicepoint = req.body.servicepoint;
		// var product_group = req.body.product_group;
		// var paymentstatus = req.body.paymentstatus;

		// var paymenttype = req.body.paymenttype;
		// if(id == 0){
		// let data = {}
		// var donor_id = "SELECT firstname,lastname FROM donor ";
		// const db = req.app.db;	
		// 	const sql = "INSERT INTO table_name (donor_id, lov_service_point_id, order_name,total,product_group_id,receipt_file,payment_period,lov_payment_status,comment,create_by)";
		// 	sql += "VALUES ("+donor_id+", "+lov_service_point_id+", "+ordername+","+total+","+product_group+","+receipt_file+","+paymentperiod+","+paymentstatus+","+comment+","+sess.username+")";

		// await models.sequelize.query(donor_id,sql, { type: models.sequelize.QueryTypes.SELECT })
		// .then(donor => {
		// 	data.rows = donor;
		// 	res.render('order/edit', { title: 'order', menu_left: 'order', page_title: 'Customer Edit',donor_id : donor,id : edit_id, s_donor: sess.username,data_edit : data.rows });
		// })

		// var lov_service_point_id = "SELECT text FROM lov WHERE id = "+servicepoint+" ";
		// var receipt_file = req.body.receipt_file;


		// }else{
		// 	console.log("else")
		// 	let db = req.app.db ;
		// db.order.findOne({ where: {id: req.query.id}}).then(orderedit => {
		// res.render('order/edit', { title: 'order', menu_left: 'order', page_title: 'Customer Edit',orderedit:orderedit });
		// })
		// }
	}
	catch (err) {
		next();
	}
}

exports.save = async function (req, res) {
	// 	var ordername = req.body.ordername;
	// 	var total = req.body.total;
	// 	var paymentperiod = req.body.paymentperiod;
	// 	var comment = req.body.comment;
	// 	var servicepoint = req.body.servicepoint;
	// 	var product_group = req.body.product_group;
	// 	var paymentstatus = req.body.paymentstatus;
	// 	var paymenttype = req.body.paymenttype;

	// 	var product1 = req.body.product1;
	// 	var product2 = req.body.product2;
	// 	var product3 = req.body.product3;


	// 	if (product1 == 1) {
	// 		var product = 1
	// 		if (product2 == 2) {
	// 			product = 2
	// 			if (product3 == 3) {
	// 				product = 3
	// 			}
	// 		}
	// 	}

	//  const product_group_id =1;
	// const db = req.app.db;
	try {
		const id = req.query.id;
		console.log("id = " + id)
		const ch = req.body.ch;
		if(ch == 0){
		models.order.create({
			donor_id: req.body.donor_id,
			lov_service_point_id: req.body.name,
			order_name: req.body.ordername,
			total: req.body.total,
			product_group_id: req.body.product_group,
			receipt_file: receive_actual_date_newdate,
			payment_period: req.body.servicepoint,
			lov_payment_status: req.body.paymentstatus,
			comment: req.body.comment,
			create_by: req.body.create_by,
			create_date: req.body.create_date,
			update_by: req.body.update_by,
			update_date: req.body.update_date,
		}).then(result => {
			res.redirect('/order/index')
		})
	}else{
		models.order.update(
			{
				ordername: req.body.ordername,
				total: req.body.total,
				paymentperiod: req.body.paymentperiod,
				comment: req.body.comment,
				servicepoint: req.body.servicepoint,
				product_group: req.body.product_group,
				paymentstatus: req.body.paymentstatus
			},
			{
				where: {
					id: id
				}
			}
		)
			.then(_data => {
				console.log("Updated Successfully !");
			})
			.catch(error => {
				console.log("Update Failed ! +");
			})
		res.redirect('/order/index');
	}
		// db.order.create({ order_name: ordername, total: total, payment_period: paymentperiod, comment: comment, lov_service_point_id: servicepoint, product_group_id: product_group, lov_payment_status: paymentstatus }).then(order => { });
		// db.order_item.create({ product_id: product }).then(orderitem => { });
		// db.order_transfer.create({ lov_payment_status_id: paymenttype }).then(ordertransfer => { });

		// res.render('index', { title: 'เสถียรธรรมสถาน', menu_left: '', page_title: '' });
	}
	catch (err) {
		next();
	}
}

exports.delete = async function (req, res) {
	try {
		res.render('index', { title: 'เสถียรธรรมสถาน', menu_left: '', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}

exports.uploadbulk = async function (req, res) {
	try {
		const db = req.app.db;
		db.lov.findAll({
			attributes: ['id', 'text', 'group'],
			where: { group: 'service_point_group' }
		}).then(_data => {
		res.render('order/uploadbulk', { title: 'uploadbulk', menu_left: 'uploadbulk', page_title: '', data: _data });
	});

	}
	catch (err) {
		next();
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
			if(err) {
				return res.end("Error uploading file.");
			}
			res.end("File is uploaded successfully!");
		});
		// res.render('order/uploadbulksave', { title: 'uploadbulk', menu_left: 'uploadbulk', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}
