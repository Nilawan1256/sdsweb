var async = require("async");
var _ = require("lodash");
var models = require("../models");

var exports = module.exports = {}

exports.index = async function(req,res){	
	try{
		var q = req.query.q;
		console.log(JSON.stringify(q));
		if (q == null) {
				const sql = "SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM donor ";
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(_donor => {
                        res.render('donor/index', { title: 'donor', menu_left:'donor', page_title:'', data:_donor });
                    });
                    console.log(JSON.stringify("_donor"));
            }
            else {
				const sql = "SELECT * FROM donor WHERE firstname LIKE '%"+ q +"%' OR lastname LIKE '%"+ q +"%' ";
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(_donor => {
                       res.render('donor/index', { title: 'donor', menu_left:'donor', page_title:'', data:_donor });
                    });
                    console.log(JSON.stringify("_donorrr"));
			}			
	}
	catch(err){
		next();
	}
}

exports.edit = async function(req,res){	
	try{
		let _id = req.query.id;
		let _data = [{}];
		if(!_id){

			let sql_lov_prefix = "SELECT text ,id  FROM lov WHERE lov.group = 'prefix_id' AND lov.delete_flag = 0";
			await( models.sequelize
				.query(sql_lov_prefix, { type: models.sequelize.QueryTypes.SELECT })
				.then(res => {_data.sql_lov_prefix = res;})
			);

			let sql_lov_country = "SELECT text ,id  FROM lov WHERE lov.group = 'country_id' AND lov.delete_flag = 0";
			await( models.sequelize
				.query(sql_lov_country, { type: models.sequelize.QueryTypes.SELECT })
				.then(res => {_data.sql_lov_country = res;})
			);

			let sql_lov_gender = "SELECT text ,id  FROM lov WHERE lov.group = 'gender_id' AND lov.delete_flag = 0";
			await (models.sequelize
				.query(sql_lov_gender, { type: models.sequelize.QueryTypes.SELECT })
				.then(res => {_data.sql_lov_gender = res;})
			);

			let sql_lov_donor_group = "SELECT text ,id  FROM lov WHERE lov.group = 'donor_group_id' AND lov.delete_flag = 0";
			await( models.sequelize
				.query(sql_lov_donor_group, { type: models.sequelize.QueryTypes.SELECT })
				.then(res => {_data.sql_lov_donor_group = res;})
          	);

			console.log(_data);
			res.render('donor/edit', { title: 'donor', menu_left:'donor', page_title:'', data:_data});
		}//if	
		else{
			let sql = 'SELECT id, firstname, lastname, address, state, zipcode, phone, occupation, ';
			sql += 'DATE_FORMAT(date_of_birth, "%D/%M/%Y") as date_of_birth, line, email, comment, create_by,';
			sql += 'DATE_FORMAT(create_date, "%D/%M/%Y") as create_date,';
			sql += '(SELECT text FROM lov WHERE lov.id = `donor`.lov_prefix_id) as prefix, ';
			sql += '(SELECT text FROM lov WHERE lov.id = `donor`.lov_country_id) as country, ';
			sql += '(SELECT text FROM lov WHERE lov.id = `donor`.lov_gender_id) as gender, ';
			sql += '(SELECT text FROM lov WHERE lov.id = `donor`.lov_donor_group_id) as donor_group FROM `donor` WHERE id = '+ _id +' ' ;
		await (models.sequelize
		.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(res => {_data = res;})
		);

		let sql_lov_prefix = "SELECT text ,id  FROM lov WHERE lov.group = 'prefix_id' AND lov.delete_flag = 0";
		await( models.sequelize
			.query(sql_lov_prefix, { type: models.sequelize.QueryTypes.SELECT })
			.then(res => {_data.sql_lov_prefix = res;})
		);

		let sql_lov_country = "SELECT text ,id  FROM lov WHERE lov.group = 'country_id' AND lov.delete_flag = 0";
		await( models.sequelize
			.query(sql_lov_country, { type: models.sequelize.QueryTypes.SELECT })
			.then(res => {_data.sql_lov_country = res;})
		);

		let sql_lov_gender = "SELECT text ,id  FROM lov WHERE lov.group = 'gender_id' AND lov.delete_flag = 0";
		await (models.sequelize
			.query(sql_lov_gender, { type: models.sequelize.QueryTypes.SELECT })
			.then(res => {_data.sql_lov_gender = res;})
		);

		let sql_lov_donor_group = "SELECT text ,id  FROM lov WHERE lov.group = 'donor_group_id' AND lov.delete_flag = 0";
		await( models.sequelize
			.query(sql_lov_donor_group, { type: models.sequelize.QueryTypes.SELECT })
			.then(res => {_data.sql_lov_donor_group = res;})
		  );

		//update
				console.log(_data);
					res.render('donor/edit', { title: 'donor', menu_left:'donor', page_title:'', data:_data });
		}//else
	}//try

		/*let _id = req.query.id;
		if(!_id){
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
	}*/
	catch(err){
		next();
	}
}

exports.save = async function(req,res){	
	try{
		var _id = req.body.id;
		if (!_id){
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
			.catch(error => {
				console.log("Create Failed ! +" + error);
			  })
		}
		else{
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
			  console.log("Updated !");
			})
			.catch(error => {
			  console.log("Update Failed ! +" + error);
			})
			res.redirect('/donor'); //go to route adjust
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