var async = require("async");
var _ = require("lodash");
var models = require("../models");

var exports = module.exports = {}

exports.adjust = async function(req,res){	
	try{
		let _id = req.query.id;
		let sql = 'SELECT id, DATE_FORMAT(date, \"%d/%m/%Y\") as date, qty, cash, wait_transfer, adjust, update_by, DATE_FORMAT(update_date, \"%d/%m/%Y\") as update_date, (SELECT text FROM lov WHERE lov.id = accounting_adjust.lov_servicepoint_id) as service_point_id FROM accounting_adjust ';
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
				.then(_adjust => {
				res.render('accounting/adjust', { title: 'adjust', menu_left:'adjust', page_title:'', data:_adjust});
				});
				console.log(JSON.stringify("_adjust"));
	}
	catch(err){
		next();
	}
}

exports.adjustedit = async function(req,res){	
	try{
		let db = req.app.db ;
		db.accounting_adjust.findOne({ where: {id: req.query.id}}).then(_adjust => {
		console.log(JSON.stringify(_adjust));
		res.render('accounting/adjustedit', { title: 'adjust', menu_left:'adjust', page_title:'', data:_adjust });
		})
	}
	catch(err){
		next();
	}
}

exports.adjustsave = async function(req,res){	
	try{
		let db = req.app.db ;
		db.accounting_adjust.update(
			{ adjust: req.body.adjust}, //what going to be updated //field: req.body.name
			{ where: { id: req.body.id }} // where clause
		)
		.then(_adjust => {
		  console.log("Updated Successfully !");
		})
		.catch(error => {
		  console.log("Update Failed ! +" + error);
		})
		res.redirect('/accounting/adjust');
	}
	catch(err){
		next();
	}
}

exports.delete = async function(req,res){	
	try{
		res.render('index', { title: 'เสถียรธรรมสถาน', menu_left:'', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}