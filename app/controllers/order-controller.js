var async = require("async");
var _ = require("lodash");

var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		res.render('order/index', { title: 'order', menu_left:'order', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.edit = async function(req,res){	
	try{
		res.render('order/edit', { title: 'order', menu_left:'order', page_title:'Customer Edit', data:null });
	}
	catch(err){
		next();
	}
}

exports.save = async function(req,res){	
	try{
		res.render('index', { title: 'เสถียรธรรมสถาน', menu_left:'', page_title:'', data:null });
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

exports.uploadbulk = async function(req,res){	
	try{
		res.render('order/uploadbulk', { title: 'uploadbulk', menu_left:'uploadbulk', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.uploadbulksave = async function(req,res){	
	try{
		res.render('order/uploadbulksave', { title: 'uploadbulk', menu_left:'uploadbulk', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}
