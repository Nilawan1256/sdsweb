var async = require("async");
var _ = require("lodash");
var models = require("../models");

// https://www.youtube.com/watch?v=KSlrxF0KIPY
// https://www.youtube.com/watch?v=aOemCJWVTQg

var exports = module.exports = {}

exports.index = async function (req, res) {
	try {
		res.render('setting/index', { title: 'setting', menu_left: 'setting', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}


exports.user = async function (req, res) {
	try {
		let sql = 'SELECT id, username, email, phone, (SELECT text FROM lov WHERE lov.id = user.lov_department_id) as department_id FROM user ';
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(_user => {
				console.log(JSON.stringify(_user));

				res.render('setting/user', { title: 'user', menu_left: 'settinguser', page_title: '', data: _user });
			});
	}
	catch (err) {
		next();
	}
}

exports.useredit = async function (req, res) {
	try {
		const id = req.query.id;
		console.log(JSON.stringify(id));
		const data = [{}];

		if (!id) {
			let lov = "SELECT text ,id  FROM lov WHERE lov.group = 'department_id' AND lov.delete_flag = 0";
			await (
				models.sequelize.query(lov, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.lov = res;
						data.user = [{}];
					})
			);
			console.log(data);
			res.render('setting/useredit', { title: 'user', menu_left: 'settinguser', page_title: '', data: data });
		}
		else {

			let user = "SELECT id, username, email, phone, (select text from lov WHERE lov.id = user.lov_department_id) as department_id FROM user where user.id = " + id + "";
			await (
				models.sequelize.query(user, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.user = res;
					})
			);

			let lov = "SELECT text ,id  FROM lov WHERE lov.group = 'department_id' AND lov.delete_flag = 0";
			await (models.sequelize.query(lov, { type: models.sequelize.QueryTypes.SELECT })
				.then(res => {
					data.lov = res;
				})
			);

			res.render('setting/useredit', { title: 'user', menu_left: 'settinguser', page_title: '', data: data });

		}
	}
	catch (err) {
		next();
	}
}


exports.usersave = async function (req, res) {
	try {
		let _id = req.body.id;
		console.log("asdasdasd =" + req.body.department);
		if (!_id) {
			let db = req.app.db;
			db.user.create({
				username: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				lov_department_id: req.body.department
			}).then(_user => {
				console.log(_user);
			})
		}
		else {
			let db = req.app.db;
			db.user.update({
				username: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				lov_department_id: req.body.department
			},
				{ where: { id: req.body.id } }
			)
				.then(_user => {
					console.log("Updated Successfully !");
				})
				.catch(error => {
					console.log("Update Failed ! +" + error);
				})
		}
		res.redirect('/setting/user');

	}
	catch (err) {
		next();
	}
}

exports.point = async function (req, res) {
	try {
		const db = req.app.db;
		db.lov.findAll({
			attributes: ['id', 'text', 'group'],
			where: { group: 'service_point_id' }
		}).then(_data => {
			res.render('setting/point', { title: 'point', menu_left: 'settingpoint', page_title: '', data: _data });
		});
	}
	catch (err) {
		next();
	}
}

exports.pointedit = async function (req, res) {
	try {
		let _id = req.query.id;
		let point = req.body.code;

		if (!_id) {
			let _data = [{}];
			res.render('setting/pointedit', { title: 'point', menu_left: 'settingpoint', page_title: '', data: _data });
		}
		else {
			let db = req.app.db;
			db.lov.findOne({ where: { id: req.query.id } }).then(_point => {
				console.log(JSON.stringify(_point));
				res.render('setting/pointedit', { title: 'point', menu_left: 'settingpoint', page_title: '', data: _point });
			})
		}
	}
	catch (err) {
		next();
	}
}


exports.pointsave = async function (req, res) {
	try {
		let _id = req.body.id;
		if (!_id) {
			let pointTH = req.body.pointth;
			let pointEng = req.body.pointeng;
			const sql = "insert into lov (name, code, text, `group`, delete_flag) values ('service_point_id_" + pointEng + "','" + pointEng + "' , '" + pointTH + "','service_point_id', '0')";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
					.then(_data => {
						console.log("เพิ่มข้อมูลสำเร็จ");
					})
					.catch(err => {
						console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
					})
			);
		}
		else {
			let pointTH = req.body.pointth;
			let pointEng = req.body.pointeng;
			const sql = "insert into lov (name, code, text, `group`, delete_flag) values ('service_point_id_" + pointEng + "','" + pointEng + "' , '" + pointTH + "','service_point_id', '0')";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
					.then(_data => {
						console.log("เพิ่มข้อมูลสำเร็จ");
					})
					.catch(err => {
						console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
					})
			);
		}
		res.redirect('/setting/point');

	}
	catch (err) {
		next();
	}
}

exports.project = async function (req, res) {
	try {
		const db = req.app.db;
		db.lov.findAll({
			attributes: ['id', 'text', 'group'],
			where: { group: 'project_id' }
		}).then(_project => {
			res.render('setting/project', { title: 'project', menu_left: 'settingproject', page_title: '', data: _project });
		});
	}
	catch (err) {
		next();
	}
}


exports.projectedit = async function (req, res) {
	try {
		let _id = req.query.id;
		let _data = [{}];
		if (!_id) {
			_data.project = [];
			_data.product_group = [];
			_data.lov = [];
			res.render('setting/projectedit', { title: 'project', menu_left: 'settingproject', page_title: '', data: _data });
		}
		else {
			let db = req.app.db;
			await ( 
				db.lov.findOne({ where: { id: req.query.id } })
					.then(_project => {
						_data.lov = _project;
				})
			);
			let product_group = "SELECT id, name FROM product_group where product_group.id";
			await (
				models.sequelize.query(product_group, { type: models.sequelize.QueryTypes.SELECT })
					.then(product_group => {
						_data.product_group = product_group;
				})
			);
			res.render('setting/projectedit', { title: 'project', menu_left: 'settingproject', page_title: '', data: _data });
		}
	}
	catch (err) {
		next();
	}
	}



exports.projectsave = async function (req, res) {
	// 	try {
	// 		res.render('setting/projectsave', { title: 'projectsave', menu_left: 'settingprojectsave', page_title: '', data: null });
	// 	}
	// 	catch (err) {
	// 		next();
	// 	}
	// }

	try {
		let _id = req.body.id;
		if (!_id) {
			let projectTH = req.body.projectth;
			let projectEng = req.body.projecteng;
			const sql = "insert into lov (name, code, text, `group`, delete_flag) values ('project_id_" + projectEng + "','" + projectEng + "' , '" + projectTH  + "','project_id', '0')";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
					.then(_data => {
						console.log("เพิ่มข้อมูลสำเร็จ");
					})
					.catch(err => {
						console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
					})
			);
		}
		else {
			let projectTH = req.body.projectth;
			let projectEng = req.body.projecteng;
			const sql = "insert into lov (name, code, text, `group`, delete_flag) values ('project_id_" + projectEng + "','" + projectEng + "' , '" + projectTH  + "','project_id', '0')";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT })
					.then(_data => {
						console.log("เพิ่มข้อมูลสำเร็จ");
					})
					.catch(err => {
						console.log(err + "เพิ่มข้อมูลไม่สำเร็จ");
					})
			);
		}
		res.redirect('/setting/project');

	}
	catch (err) {
		next();
	}
}




exports.userdelete = async function (req, res) {
	try {
		models.user.destroy({
			where: { id: req.body.id }
		})
			.then(del => {
				console.log("Deleted successfully " + del);
			})
		res.redirect(req.get('/setting/user'));
	} catch (err) {
		next();
	}
};


exports.pointdelete = async function (req, res) {
	try {
		models.lov.destroy({
			where: { id: req.body.id }
		})
			.then(del => {
				console.log("Deleted successfully " + del);
			})

		res.redirect(req.get('/setting/point'));
	} catch (err) {
		next();
	}
};

exports.projectdelete = async function (req, res) {
	try {
		models.lov.destroy({
			where: { id: req.body.id }
		})
			.then(del => {
				console.log("Deleted successfully " + del);
			})

		res.redirect(req.get('/setting/point'));
	} catch (err) {
		next();
	}
};


