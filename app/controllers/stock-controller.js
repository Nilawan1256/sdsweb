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
	}
	catch(err){
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
		  console.log("Updated Successfully !");
		})
		.catch(error => {
		  console.log("Update Failed ! +");
		})
		res.redirect('/stock');
		// res.render('stock/index', { title: 'stock', menu_left:'stock', page_title:'', data: null});
	}
	catch(err){
		next();
	}
}

exports.stockcard = async function(req,res){	
	try{
		const sql = "select product_id, name, qty_instock, qty_receive, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date, (select qty from stock where stock.product_id = stock_fulfill.product_id) as qty from stock_fulfill";
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(_data => {
			res.render('stock/stockcard', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: _data });
		})
	}
	catch(err){
		next();
	}
}

exports.stockfulfill = async function(req,res){	
	try{
		const sql = "select id, name, qty_instock, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date, DATE_FORMAT(receive_plan_date, \"%d/%m/%Y\") as receive_plan_date, DATE_FORMAT(receive_actual_date, \"%d/%m/%Y\") as receive_actual_date, (select qty from stock where stock.product_id = stock_fulfill.product_id) as qty from stock_fulfill";
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(_data => {
			models.lov.findAll({where: {group: "stock_status"}})
			.then(_lov => {	
				res.render('stock/stockfulfill', { title: 'เสถียรธรรมสถาน', menu_left:'stock', page_title:'', data: _data, lov: _lov });
			})
		})
	}
	catch(err){
		next();
	}
}

exports.stockfulfilledit = async function(req,res){	
	try{
		const _id = req.query.id;
		if(_id == null){
			const _data = [{}];
			const _type = "เพิ่มการรับเข้าสต๊อก";			
			res.render('stock/stockfulfilledit', { title: 'stock Edit', menu_left:'stock', page_title:'', data: _data, type: _type });
		}
		else{
			const sql = "select id, name, qty_instock, DATE_FORMAT(purchase_date, \"%d/%m/%Y\") as purchase_date, DATE_FORMAT(receive_plan_date, \"%d/%m/%Y\") as receive_plan_date, DATE_FORMAT(receive_actual_date, \"%d/%m/%Y\") as receive_actual_date from stock_fulfill where id = " + _id + "";
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_data => {
			  const _type = "แก้ไขจำนวนรับเข้าสต๊อก";
			  res.render('stock/stockfulfilledit', { title: 'stock Edit', menu_left:'stock', page_title:'', data: _data, type: _type });
			})
		}
	}
	catch(err){
		next();
	}
}

exports.stockfulfillsave = async function(req,res){	
	try{
		const _id = req.body.id;
		if (_id == null){
			// Set format date //
			const purchase_date_olddate = moment(req.body.purchase_date, 'DD/MM/YYYY');
			const receive_plan_date_olddate = moment(req.body.receive_plan_date, 'DD/MM/YYYY');
			const receive_actual_date_olddate = moment(req.body.receive_actual_date, 'DD/MM/YYYY');

			const purchase_date_newdate = purchase_date_olddate.format('YYYY/MM/DD')
			const receive_plan_date_newdate = receive_plan_date_olddate.format('YYYY/MM/DD')
			const receive_actual_date_newdate = receive_actual_date_olddate.format('YYYY/MM/DD')

			models.stock_fulfill.create({
				product_id: null,
				name: req.body.name,
				qty_instock: req.body.qty_instock,
				purchase_date: purchase_date_newdate,
				receive_plan_date: receive_plan_date_newdate,
				receive_actual_date: receive_actual_date_newdate
			}).then(_data => {
				console.log(_data.get({
					plain: true
				}))
				console.log("เพิ่มข้อมูลสำเร็จ");
			})
			.catch(error => {
				console.log("แก้ไขข้อมูลไม่สำเร็จ");
			})
			res.redirect('/stockfulfill')
		}
		else{

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
				console.log(_data.get({
					plain: true
				}))
				console.log("แก้ไขข้อมูลสำเร็จ");
			})
			.catch(error => {
				console.log("แก้ไขข้อมูลไม่สำเร็จ");
			})
			res.redirect('/stockfulfill');
		}	
	}
	catch(err){
		console.log("Error is = " + err);
		next();
	}
}
