var async = require("async");
var _ = require("lodash");
var moment = require('moment');
var models = require("../models");
var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		models.product.findAll({
			include: [
				{ model: models.stock, as: 'fk_stock_product_id' }
			] 
		}).then(_data => {			
			res.render('stock/index', { title: 'stock', menu_left:'stock', page_title:'', data: _data});
		})
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}

exports.edit = async function(req,res){	
	try{
		const _id = req.query.id;
		models.product.findOne({ where: {id: _id}, include: [
			{ model: models.stock, as: 'fk_stock_product_id' }
		] })
		.then(_data => {
			res.render('stock/edit', { title: 'stock Edit', menu_left:'stock', page_title:'', data: _data });
		})
		.catch(err => {
			console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
		})
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}

exports.save = async function(req,res){	
	try{
		models.stock.update(
			{ qty: req.body.qty },
			{ where: { product_id: req.body.id }}
		)
		.then(_data => {
			console.log("แก้ไขข้อมูลสำเร็จ");
		})
		.catch(err => {
			console.log(err + " แก้ไขข้อมูลไม่สำเร็จ");
		})
		res.redirect('/stock');
		// res.render('stock/index', { title: 'stock', menu_left:'stock', page_title:'', data: null});
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}

exports.stockcard = async function(req,res){	
	try{		
		const press = req.query.type;
		if (!press){
			const sql_where = [];
			const sql = "select name, qty_instock,\
			qty_receive, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date,\
			(select qty from stock where stock.product_id = stock_fulfill.product_id) as qty\
			from stock_fulfill " + sql_where;
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				res.render('stock/stockcard', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: _data });
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		}
		else{
			// Set format date //
			const f_date_olddate = moment(req.query.f_date, 'DD/MM/YYYY');
			const l_date_olddate = moment(req.query.l_date, 'DD/MM/YYYY');

			const f_date_newdate = f_date_olddate.format('YYYY/MM/DD');
			const l_date_newdate = l_date_olddate.format('YYYY/MM/DD');

			const sql_where = "WHERE purchase_date between '" + f_date_newdate + "' and '" + l_date_newdate + "'";
			const sql = "select name, qty_instock,\
			qty_receive, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date,\
			(select qty from stock where stock.product_id = stock_fulfill.product_id) as qty\
			from stock_fulfill " + sql_where;
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				res.render('stock/stockcard', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: _data });
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		}
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}

exports.stockfulfill = async function(req,res){	
	try{
		const data = [];
		const sql = "select id, product_id, name, qty_instock, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date, \
		DATE_FORMAT(receive_plan_date, \"%d/%m/%Y\") as receive_plan_date, \
		DATE_FORMAT(receive_actual_date, \"%d/%m/%Y\") as receive_actual_date, \
		(select qty from stock where stock.product_id = stock_fulfill.product_id) as qty \
		from stock_fulfill";
		await (
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				data.stock_fulfill = _data;
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		);

		await (
			models.lov.findAll({where: {group: "stock_status"}})
			.then(_data => {
				data.lov = _data;
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		);
		res.render('stock/stockfulfill', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: data });
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}

exports.stockfulfilledit = async function(req,res){	
	try{
		const _id = req.query.id;
		if(!_id){
			const _data = [{}];
			const _type = "เพิ่มการรับเข้าสต๊อก";			
			res.render('stock/stockfulfilledit', { title: 'stock Edit', menu_left:'stock', page_title:'', data: _data, type: _type });
		}
		else{
			const sql = "select id, product_id, name, qty_instock, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date, \
			DATE_FORMAT(receive_plan_date, \"%d/%m/%Y\") as receive_plan_date, \
			DATE_FORMAT(receive_actual_date, \"%d/%m/%Y\") as receive_actual_date \
			from stock_fulfill where id = " + _id + "";
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
				console.log("asdasdas =" + JSON.stringify(_data));
			  	const _type = "แก้ไขจำนวนรับเข้าสต๊อก";
			  	res.render('stock/stockfulfilledit', { title: 'stock Edit', menu_left:'stock', page_title:'', data: _data, type: _type });
			})
			.catch(err => {
				console.log("ค้นหาข้อมูลไม่สำเร็จ " + err);
			})
		}
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}

exports.stockfulfillsave = async function(req,res){	
	try{
		const type = req.body.type;
		if (type == "เพิ่มการรับเข้าสต๊อก"){
			const name = req.body.name;
			const qty_instock = req.body.qty_instock;
			// Set format date //
			const purchase_date_olddate = moment(req.body.purchase_date, 'DD/MM/YYYY');
			const receive_plan_date_olddate = moment(req.body.receive_plan_date, 'DD/MM/YYYY');
			const receive_actual_date_olddate = moment(req.body.receive_actual_date, 'DD/MM/YYYY');
			
			const purchase_date_newdate = purchase_date_olddate.format('YYYY/MM/DD')
			const receive_plan_date_newdate = receive_plan_date_olddate.format('YYYY/MM/DD')
			const receive_actual_date_newdate = receive_actual_date_olddate.format('YYYY/MM/DD')

			const sql = "insert into stock_fulfill (product_id, name, qty_instock, purchase_date, \
			receive_plan_date, receive_actual_date) values \
			((select id from product where name = '" + name + "'), \
			'" + name + "', '" + qty_instock + "', '" + purchase_date_newdate + "', \
			'" + receive_plan_date_newdate + "', '" + receive_actual_date_newdate + "')";
			await(
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
				.then(_data => {
					console.log("เพิ่มข้อมูลสำเร็จ");
				})
				.catch(err => {
					console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
				})
			);
			res.redirect('/stockfulfill');
			//res.render('stock/stockfulfill', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: null });
		}
		else{
			const _id = req.body.id
			// Set format date //
			const purchase_date_olddate = moment(req.body.purchase_date, 'DD/MM/YYYY');
			const receive_plan_date_olddate = moment(req.body.receive_plan_date, 'DD/MM/YYYY');
			const receive_actual_date_olddate = moment(req.body.receive_actual_date, 'DD/MM/YYYY');

			const purchase_date_newdate = purchase_date_olddate.format('YYYY/MM/DD')
			const receive_plan_date_newdate = receive_plan_date_olddate.format('YYYY/MM/DD')
			const receive_actual_date_newdate = receive_actual_date_olddate.format('YYYY/MM/DD')

			models.stock_fulfill.update(
				{ 	name: req.body.name,
					qty_instock: req.body.qty_instock,
					purchase_date: purchase_date_newdate,
					receive_plan_date: receive_plan_date_newdate,
					receive_actual_date: receive_actual_date_newdate 
				}, { where: { id: _id }}
			)
			.then(_data => {
				console.log("แก้ไขข้อมูลสำเร็จ");
			})
			.catch(err => {
				console.log(err + " แก้ไขข้อมูลไม่สำเร็จ");
			})
			res.redirect('/stockfulfill');
			//res.render('stock/stockfulfill', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: null });
		}	
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}
