var async = require("async");
var _ = require("lodash");
var models = require("../models");

var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		let db = req.app.db ;
		db.donor.findAll().then(_donor => {
			console.log(JSON.stringify(_donor));
			res.render('donor/index', { title: 'donor', menu_left:'donor', page_title:'', data:_donor });
		})
	}
	catch(err){
		next();
	}
}

exports.edit = async function(req,res){	
	try{
		let _id = req.query.id;
		if(_id == null){
		let _data = [{}];
			res.render('donor/edit', { title: 'donor', menu_left:'donor', page_title:'', data:_data});
		}
		else{
			let db = req.app.db ;
			db.donor.findOne({ where: {id: req.query.id}}).then(_donor => {
			console.log(JSON.stringify(_donor));
			res.render('donor/edit', { title: 'donor', menu_left:'donor', page_title:'', data:_donor });
		})
		}
	}
	catch(err){
		next();
	}
}

exports.save = async function(req,res){	
	try{
		var _id = req.query.id;
		if (_id == null){
			let db = req.app.db;
			db.donor.create({
				firstname: req.body.fname,
				lastname: req.body.lname,
				address: req.body.address,
				state: req.body.state,
				zipcode: req.body.zipcode,
				phone: req.body.phone,
				occupation: req.body.occupation,
				line: req.body.line,
				email: req.body.email,
				comment: req.body.comment
			}).then(_donor => {
				console.log(_donor.get({
					plain: true
				}))
				res.redirect('/donor')
			})
		}
		else if(_id != null){
			let db = req.app.db;
			db.donor.update({
				firstname: req.body.fname,
				lastname: req.body.lname,
				address: req.body.address,
				state: req.body.state,
				zipcode: req.body.zipcode,
				phone: req.body.phone,
				occupation: req.body.occupation,
				line: req.body.line,
				email: req.body.email,
				comment: req.body.comment
			},
				{ where: { id: req.body.id }}
			)
			.then(_donor => {
			  console.log("Updated Successfully !");
			})
			.catch(error => {
			  console.log("Update Failed ! +" + error);
			})
			res.redirect('/donor'); //go to route adjust
		}
		else{
			console.log("Successfully !");
		}
	}
	catch(err){
		next();
	}
}

exports.delete = async function(req,res){	
	try{
		let _id = req.query.id;
    	let deleted = await models.donor.destroy({
      		where: { id:_id }
		});
		if (deleted) {
			res.render('index', { title: 'เสถียรธรรมสถาน', menu_left:'', page_title:'', data:null });
		}
		throw new Error("Post not found");
	}
	catch(err){
		next();
	}
}

exports.upload = async function(req,res){	
	try{
		res.render('donor/upload', { title: 'donor upload', menu_left:'donor', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.uploadsave = async function(req,res){	
	try{
		res.render('donor/uploadsave/save', { title: 'donor donor', menu_left:'donor', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}