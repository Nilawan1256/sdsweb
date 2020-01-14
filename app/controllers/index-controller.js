var async = require("async");
var _ = require("lodash");

var exports = module.exports = {}

exports.index = async function(req, res, next){	
	try{
		const db = req.app.db;
		const _user = await db.user.findOne({ id:1 });
		console.log(_user);
		res.render('index', { title: 'เสถียรธรรมสถาน ระบบจัดการข้อมูลผู้ร่วมบุญ', menu_left:'dashboard', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.error404 = async function(req,res,next){
	try{
		res.render('error404', { title: 'Error 404', menu_left:'dashboard', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

