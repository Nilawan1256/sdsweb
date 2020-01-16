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
		let db = req.app.db ;
		db.user.findAll().then(_user => {
			console.log(JSON.stringify(_user));
		res.render('setting/user', { title: 'user', menu_left:'settinguser', page_title:'', data:_user });
	})
}
	catch(err){
		next();
	}
}

exports.useredit = async function(req,res){	
	try{
		let db = req.app.db;
		db.user.findOne({ where: {id: req.query.id}}).then(_user => {
			console.log(JSON.stringify(_user));
			res.render('setting/useredit', { title: 'user', menu_left:'settinguser', page_title:'', data:_user });
	})
}
	catch(err){
		next();
	}
}

exports.usersave = async function(req,res){	
	try{
		let db = req.app.db;
		db.user.update(
			{ 
				username: req.body.name,
				email: req.body.email,
				phone: req.body.phone,}, //what going to be updated //field: req.body.name
			{ where: { id: req.body.id }} // where clause
		)
		.then(_data => {
		  console.log("Updated Successfully !");
		})
		.catch(error => {
		  console.log("Update Failed ! +" + error);
		})
		res.redirect('/setting/user'); //go to route adjust*/
		// res.render('setting/user', { title: 'user', menu_left:'settinguser', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.point = async function(req,res){	
	try{
	// 	const sql = "SELECT * FROM sdsweb.lov;";
	// 	models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
	// 	.then(_data => {
	// 	res.render('setting/point', { title: 'point', menu_left:'settingpoint', page_title:'', data:_data });
	// })

	const db = req.app.db;
	db.lov.findAll({
		attributes: ['id','text','group'],
		where: {group: 'service_point_group'}
	  }).then(_data => {
	res.render('setting/point', { title: 'point', menu_left:'settingpoint', page_title:'', data:_data });
	});
}
	catch(err){
		next();
	}
}

exports.pointedit = async function(req,res){	
	try{
		let db = req.app.db ;
		let _id = req.query.id;
		db.lov.findOne({ where: {id: _id}}).then(_point => {
			console.log(JSON.stringify(_point));
		res.render('setting/pointedit', { title: 'point', menu_left:'settingpoint', page_title:'', data:_point });
	})
}
	catch(err){
		next();
	}
}

exports.pointsave = async function(req,res){	
	try{
		lov.update(
			{ text: req.body.point}, //what going to be updated //field: req.body.name
			{ where: { id: req.body.id }} // where clause
		)
		.then(_point => {
			console.log("Updated Successfully !");
		  })
		  .catch(error => {
			console.log("Update Failed ! +" + error);
		  })
		  res.redirect('/accounting/adjust'); //go to route adjust*/
		// res.render('setting/pointsave', { title: 'pointsave', menu_left:'settingpointsave', page_title:'', data:null });
	}
	catch(err){
		next();
	}
}

exports.project = async function(req,res){	
	try{
		let db = req.app.db ;
		db.product.findAll().then(_product => {
			console.log(JSON.stringify(_product));
		res.render('setting/project', { title: 'project', menu_left:'settingproject', page_title:'', data:_product });
	})
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

