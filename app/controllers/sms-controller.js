var async = require("async");
var _ = require("lodash");

var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		res.render('sms/index', { title: 'sms', menu_left:'sms', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.sends = async function(req,res){	
	try{
		res.render('index', { title: 'sms', menu_left:'sms', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}
