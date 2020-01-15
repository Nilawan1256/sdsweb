var async = require("async");
var _ = require("lodash");
const moment = require('moment');
var models = require("../models");
var donor = models.donor;
var order = models.order;
var lov = models.lov;

var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		res.render('report/index', { title: 'Report', menu_left:'reports', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.donor = async function(req,res){	
	try{
		
		const sql = "SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM donor ";
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(result => {
		res.render('report/donor', { title: 'Report donor', menu_left:'reports',
		page_title:'', data:result });
		});

		// const db = req.app.db;
		// db.donor.findAll().then(result => {
		// res.render('report/donor', { title: 'Report donor', menu_left:'reports',
		//  page_title:'', data:result });
		// });


		// const db = req.app.db;
		// db.donor.findAll().then(function(Donor) {
		// 	Donor = Donor.map(function (DoNor) {
		// 		DoNor.create_date=DoNor.create_date.getFullYear()+'-'+
		// 			(DoNor.create_date.getMonth() < 9 ? '0' : '') + 
		// 			(DoNor.create_date.getMonth() + 1) + '-' + DoNor.create_date.getDate();
		// 			return DoNor;
		// 	});
		// 	res.render('report/donor', { title: 'Report donor', menu_left:'reports',
		//  page_title:'', data:Donor });
		// })


	}
	catch(err){
		next();
	}
}

exports.order = async function(req,res){	
	try{

		// const db = req.app.db;
		// db.order.findAll().then(result => {
		// 	res.render('report/order', { title: 'Report order', menu_left:'reports',
		// 	 page_title:'', data:result });
		// });

		const sql = "SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from sdsweb.donor where donor.id = order.donor_id) as firstname, (select lastname from sdsweb.donor where donor.id = order.donor_id) as lastname, (select phone from sdsweb.donor where donor.id = order.donor_id) as phone, (select text from sdsweb.lov where lov.id = order.lov_payment_status) as lov_payment_status, (select text from sdsweb.lov where lov.id = order.lov_service_point_id) as lov_service_point_id FROM sdsweb.order ";
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(result => {
		res.render('report/order', { title: 'Report donor', menu_left:'reports',
		page_title:'', data:result });
		});

	}
	catch(err){
		next();
	}
}

exports.revenue = async function(req,res){	
	try{
		res.render('report/revenue', { title: 'Report revenue', menu_left:'reports', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.smssends = async function(req,res){	
	try{
		res.render('report/smssends', { title: 'Report smssends', menu_left:'reports', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.smsreply = async function(req,res){	
	try{
		res.render('report/smsreply', { title: 'Report smsresponse', menu_left:'reports', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.smssummary = async function(req,res){	
	try{
		res.render('report/smssummary', { title: 'Report smssummary', menu_left:'reports', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}
