var async = require("async");
var _ = require("lodash");

var exports = module.exports = {}

exports.adjust = async function(req,res){	
	try{
		let db = req.app.db ;
		db.accounting_adjust.findAll().then(_adjust => {
			console.log(JSON.stringify(_adjust));
			res.render('accounting/adjust', { title: 'adjust', menu_left:'adjust', page_title:'', data:_adjust});
		})
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
		res.redirect('/accounting/adjust'); //go to route adjust*/
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