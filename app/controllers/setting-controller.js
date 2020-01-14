var async = require("async");
var _ = require("lodash");

// https://www.youtube.com/watch?v=KSlrxF0KIPY
// https://www.youtube.com/watch?v=aOemCJWVTQg

var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		res.render('setting/index', { title: 'setting', menu_left:'setting', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}


exports.user = async function(req,res){	
	try{
		res.render('setting/user', { title: 'user', menu_left:'settinguser', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.useredit = async function(req,res){	
	try{
		res.render('setting/useredit', { title: 'user', menu_left:'settinguser', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.usersave = async function(req,res){	
	try{
		res.render('setting/user', { title: 'user', menu_left:'settinguser', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.point = async function(req,res){	
	try{
		res.render('setting/point', { title: 'point', menu_left:'settingpoint', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.pointedit = async function(req,res){	
	try{
		res.render('setting/pointedit', { title: 'point', menu_left:'settingpoint', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.pointsave = async function(req,res){	
	try{
		res.render('setting/pointsave', { title: 'pointsave', menu_left:'settingpointsave', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.project = async function(req,res){	
	try{
		res.render('setting/project', { title: 'project', menu_left:'settingproject', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.projectedit = async function(req,res){	
	try{
		res.render('setting/projectedit', { title: 'project', menu_left:'settingproject', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.projectsave = async function(req,res){	
	try{
		res.render('setting/projectsave', { title: 'projectsave', menu_left:'settingprojectsave', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

