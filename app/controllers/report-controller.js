var async = require("async");
var _ = require("lodash");
const moment = require('moment');
var models = require("../models");
var donor = models.donor;
var order = models.order;
var lov = models.lov;
var xl = require('excel4node');

var exports = module.exports = {}

exports.index = async function (req, res) {
	try {
		res.render('report/index', { title: 'Report', menu_left: 'reports', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}

exports.donor = async function (req, res) {
	try {

			f_date = req.query.f_date,
			l_date = req.query.l_date;
			
		export_id = req.query.export_id;
		
		f_date_search = req.query.f_date_search,
		l_date_search = req.query.l_date_search;


		
		if (export_id == "" || export_id == null) {
			if (f_date == "" || f_date == null || l_date == "" || l_date == null) {

				const sql = "SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM donor ";
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(result => {
						res.render('report/donor', {
							title: 'Report donor', menu_left: 'reports',
							page_title: '', data: result
						});
					}); console.log('it\'s here >>', f_date, '<< value >>', l_date, '<< it\'s here');
	
			} else {
	
				const sql = "SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM donor WHERE create_date BETWEEN '" + f_date + "' AND '" + l_date + "' ";
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(result => {
						res.render('report/donor', {
							title: 'Report donor', menu_left: 'reports',
							page_title: '', data: result, f_date: f_date,l_date: l_date
						});
					}); console.log('it\'s here >>', f_date, '<< value >>', l_date, '<< it\'s here');
			}			

		} else {
//excel
			if (f_date_search == "" || f_date_search == null || l_date_search == "" || l_date_search == null) {

				const sql = "SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM donor ";
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
				.then(result => {
					console.log('excel export');
						var wb = new xl.Workbook();
						var ws = wb.addWorksheet('Sheet 1'); 

						var HeaderStyle = wb.createStyle({
							font: {
							color: '#000000',
							size: 20
							},
							numberFormat: '$#,##0.00; ($#,##0.00); -'
						});
						var ContentStyle = wb.createStyle({
							font: {
							color: '#000000',
							size: 16
							},
							numberFormat: '$#,##0.00; ($#,##0.00); -'
						});
		

				ws.cell(1,1).string('ชื่อ').style(HeaderStyle);
				ws.cell(1,2).string('นามสกุล').style(HeaderStyle);
				ws.cell(1,3).string('โทรศัพท์').style(HeaderStyle);
				ws.cell(1,4).string('ไลน์').style(HeaderStyle);
				ws.cell(1,5).string('อีเมล์').style(HeaderStyle);
				ws.cell(1,6).string('วันที่').style(HeaderStyle);
				

			result.forEach(function(data, i) {
			 	
				ws.cell(('%d',i+2),1).string(data.firstname).style(ContentStyle);
				ws.cell(('%d',i+2),2).string(data.lastname).style(ContentStyle);
				ws.cell(('%d',i+2),3).string(data.phone).style(ContentStyle);
				ws.cell(('%d',i+2),4).string(data.line).style(ContentStyle);
				ws.cell(('%d',i+2),5).string(data.email).style(ContentStyle);
				ws.cell(('%d',i+2),6).string(data.create_date).style(ContentStyle);
				console.log('it\'s here >> %d << : %s', i, data);
		});
			                  
            	wb.write('ExcelFile.xlsx', res);		
			

	});
	
			} else {

	const sql = "SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date FROM donor WHERE create_date BETWEEN '" + f_date_search + "' AND '" + l_date_search + "' ";
	models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
	.then(result => {
			console.log('excel export');
			var wb = new xl.Workbook();
			var ws = wb.addWorksheet('Sheet 1'); 

			var HeaderStyle = wb.createStyle({
				font: {
					color: '#000000',
					size: 20
				},
				numberFormat: '$#,##0.00; ($#,##0.00); -'
			});
			var ContentStyle = wb.createStyle({
				font: {
					color: '#000000',
					size: 16
				},
				numberFormat: '$#,##0.00; ($#,##0.00); -'
			});
		

				ws.cell(1,1).string('ชื่อ').style(HeaderStyle);
				ws.cell(1,2).string('นามสกุล').style(HeaderStyle);
				ws.cell(1,3).string('โทรศัพท์').style(HeaderStyle);
				ws.cell(1,4).string('ไลน์').style(HeaderStyle);
				ws.cell(1,5).string('อีเมล์').style(HeaderStyle);
				ws.cell(1,6).string('วันที่').style(HeaderStyle);
				

			result.forEach(function(data, i) {
			 	
				ws.cell(('%d',i+2),1).string(data.firstname).style(ContentStyle);
				ws.cell(('%d',i+2),2).string(data.lastname).style(ContentStyle);
				ws.cell(('%d',i+2),3).string(data.phone).style(ContentStyle);
				ws.cell(('%d',i+2),4).string(data.line).style(ContentStyle);
				ws.cell(('%d',i+2),5).string(data.email).style(ContentStyle);
				ws.cell(('%d',i+2),6).string(data.create_date).style(ContentStyle);
				console.log('it\'s here >> %d << : %s', i, data);
		});
			                  
            	wb.write('ExcelFile.xlsx', res);		
			

	});
			}	

			// console.log('excel export');
			// var wb = new xl.Workbook();
			// var ws = wb.addWorksheet('Sheet 1'); 
			// ws.cell(1,1).number(100); 
			// // หมายถึงใส่ค่าตัวเลข 100 ลงไปที่ cell A1
			// // ws.cell(1,2).string('some text'); 
			// // //หมายถึงใส่ค่าตัวอักษร some text ลงใน cell B1
			// // ws.cell(1,3).formula('A1+A2'); 
			// // //หมายถึงใส่สูตร A1+A2 ใน cell C1
			// // ws.cell(1,4).bool(true);
			// // //หมายถึงใส่ค่า boolean true ใน cell D1
			// // wb.write('myfirstexcel.xlsx'); 
			// wb.write('ExcelFile.xlsx', res);
			
		}

	}
	catch (err) {
		next();
	}
}

exports.order = async function (req, res) {
	try {

		
			f_date = req.query.f_date,
			l_date = req.query.l_date,
			ser_point = req.query.ser_point,
			status = req.query.status;

			f_date_search = req.query.f_date_search,
			l_date_search = req.query.l_date_search,
			ser_point_search = req.query.ser_point_search,
			status_search = req.query.status_search,
			export_id = req.query.export_id;

	if (export_id == "" || export_id == null) {

				if (f_date == "" || f_date == null || l_date == "" || l_date == null
			|| ser_point == "" || ser_point == null|| status == "" || status == null) {


			let data = {};
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select phone from donor where donor.id = `order`.donor_id) as phone, (select text from lov where lov.id = `order`.lov_payment_status) as lov_payment_status, ';
			sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id FROM `order`';
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.order = res;
					})
			);
	
			let sql_lov_ser_point = "SELECT text ,id  FROM lov where lov.group = 'service_point_group' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_ser_point, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.lov_ser_point = res;
					})
			);
	
	
			let sql_lov_pay_status = "SELECT text ,id  FROM lov where lov.group = 'payment_status_group' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_pay_status, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.sql_lov_pay_status = res;
					})
			);
	
			console.log(data);
	
	
			res.render('report/order', {
				title: 'Report order', menu_left: 'reports',
				page_title: '', data: data ,f_date: f_date,l_date: l_date, ser_point: ser_point, status: status
			});
			


		} else {

			
			let data = {};
			let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select phone from donor where donor.id = `order`.donor_id) as phone, (select text from lov where lov.id = `order`.lov_payment_status) as lov_payment_status, ';
			sql += "(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id FROM `order` where lov_payment_status = '" + status + "' or lov_service_point_id = '" + ser_point + "' or create_date between '" + f_date + "' AND '" + l_date + "'";
			await (
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.order = res;
					})
			);
	
			let sql_lov_ser_point = "SELECT text ,id  FROM lov where lov.group = 'service_point_group' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_ser_point, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.lov_ser_point = res;
					})
			);
	
	
			let sql_lov_pay_status = "SELECT text ,id  FROM lov where lov.group = 'payment_status_group' and lov.delete_flag = 0";
			await (
				models.sequelize.query(sql_lov_pay_status, { type: models.sequelize.QueryTypes.SELECT })
					.then(res => {
						data.sql_lov_pay_status = res;
					})
			);
	
			console.log(data);
	
	
			res.render('report/order', {
				title: 'Report order', menu_left: 'reports',
				page_title: '', data: data ,f_date: f_date,l_date: l_date
			});
		}

	} else {
				//excel
			if (f_date_search == "" || f_date_search == null ||
			 l_date_search == "" || l_date_search == null ||
			 status_search == "" || status_search == null ||
			 ser_point_search == "" || ser_point_search == null
			 ) {
				
				let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, ';
				sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
				sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
				sql += '(select phone from donor where donor.id = `order`.donor_id) as phone, (select text from lov where lov.id = `order`.lov_payment_status) as lov_payment_status, ';
				sql += '(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id FROM `order`';
				models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
				.then(result => {
					
							console.log('excel export');
							var wb = new xl.Workbook();
							var ws = wb.addWorksheet('Sheet 1'); 
							i=0;
							var HeaderStyle = wb.createStyle({
								font: {
									color: '#000000',
									size: 20
								},
								numberFormat: '$#,##0.00; ($#,##0.00); -'
							});
							var ContentStyle = wb.createStyle({
								font: {
									color: '#000000',
									size: 16
								},
								numberFormat: '$#,##0.00; ($#,##0.00); -'
							});
				
								ws.cell(1,1).string('ชื่อ').style(HeaderStyle);
								ws.cell(1,2).string('นามสกุล').style(HeaderStyle);
								ws.cell(1,3).string('โทรศัพท์').style(HeaderStyle);
								ws.cell(1,4).string('วันที่').style(HeaderStyle);
								ws.cell(1,5).string('จุดตั้งรับ	').style(HeaderStyle);
								ws.cell(1,6).string('สถานะ').style(HeaderStyle);

								result.forEach(function(data, i) {
								
								ws.cell(('%d',i+2),1).string(data.firstname).style(ContentStyle);
								ws.cell(('%d',i+2),2).string(data.lastname).style(ContentStyle);
								ws.cell(('%d',i+2),3).string(data.phone).style(ContentStyle);
								ws.cell(('%d',i+2),4).string(data.create_date).style(ContentStyle);
								ws.cell(('%d',i+2),5).string(data.lov_service_point_id).style(ContentStyle);
								ws.cell(('%d',i+2),6).string(data.lov_payment_status).style(ContentStyle);
								console.log('it\'s here >> %d << : %s', i, data);
						});
										
						
								wb.write('ExcelFile.xlsx', res);		
						
					});	
								
								
				
					
			
			} else {
					
			
				let sql = 'SELECT id, lov_service_point_id, order_name, total, product_group_id, receipt_file, payment_period, lov_payment_status, comment, ';
			sql += 'create_by, DATE_FORMAT(create_date, \"%d/%m/%Y\") as create_date, update_by, update_date, (select firstname from donor ';
			sql += 'where donor.id = `order`.donor_id) as firstname, (select lastname from donor where donor.id = `order`.donor_id) as lastname, ';
			sql += '(select phone from donor where donor.id = `order`.donor_id) as phone, (select text from lov where lov.id = `order`.lov_payment_status) as lov_payment_status, ';
			sql += "(select text from lov where lov.id = `order`.lov_service_point_id) as lov_service_point_id FROM `order` where lov_payment_status = '" + status_search + "' or lov_service_point_id = '" + ser_point_search + "' or create_date between '" + f_date_search + "' AND '" + l_date_search + "'";
			models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
				.then(result => {
					
							console.log('excel export');
							var wb = new xl.Workbook();
							var ws = wb.addWorksheet('Sheet 1'); 
							i=0;
							var HeaderStyle = wb.createStyle({
								font: {
									color: '#000000',
									size: 20
								},
								numberFormat: '$#,##0.00; ($#,##0.00); -'
							});
							var ContentStyle = wb.createStyle({
								font: {
									color: '#000000',
									size: 16
								},
								numberFormat: '$#,##0.00; ($#,##0.00); -'
							});
				
								ws.cell(1,1).string('ชื่อ').style(HeaderStyle);
								ws.cell(1,2).string('นามสกุล').style(HeaderStyle);
								ws.cell(1,3).string('โทรศัพท์').style(HeaderStyle);
								ws.cell(1,4).string('วันที่').style(HeaderStyle);
								ws.cell(1,5).string('จุดตั้งรับ	').style(HeaderStyle);
								ws.cell(1,6).string('สถานะ').style(HeaderStyle);

								result.forEach(function(data, i) {
								
								ws.cell(('%d',i+2),1).string(data.firstname).style(ContentStyle);
								ws.cell(('%d',i+2),2).string(data.lastname).style(ContentStyle);
								ws.cell(('%d',i+2),3).string(data.phone).style(ContentStyle);
								ws.cell(('%d',i+2),4).string(data.create_date).style(ContentStyle);
								ws.cell(('%d',i+2),5).string(data.lov_service_point_id).style(ContentStyle);
								ws.cell(('%d',i+2),6).string(data.lov_payment_status).style(ContentStyle);
								console.log('it\'s here >> %d << : %s', i, data);
						});
										
						// console.log('it\'s here >> %d << : %s', i, data);
						
								wb.write('ExcelFile.xlsx', res);		
						
					});
			
					}
				}

			

	}
	catch (err) {
		next();
	}
}




exports.revenue = async function (req, res) {
	try {

		f_date = req.query.f_date,
		l_date = req.query.l_date;
		
		export_id = req.query.export_id;
		
		f_date_search = req.query.f_date_search,
		l_date_search = req.query.l_date_search;


if (export_id == "" || export_id == null) {

	if (f_date == "" || f_date == null || l_date == "" || l_date == null) {

		const sql = "SELECT id, DATE_FORMAT(date, \"%d/%m/%Y\") as date, (select text from sdsweb.lov where lov.id = sdsweb.accounting_adjust.lov_servicepoint_id) as lov_service_point_id, qty, cash, wait_transfer, adjust, update_by, update_date,(SELECT SUM (cash) FROM accounting_adjust) as total_cash,(SELECT SUM (wait_transfer) FROM accounting_adjust ) as total_wait_transfer FROM sdsweb.accounting_adjust ";
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(result => {
				res.render('report/revenue', {
					title: 'Report revenue', menu_left: 'reports',
					page_title: '', data: result
				});
			});
		console.log('it\'s here >>', f_date, '<< value >>', l_date, '<< it\'s here');

	} else {

		const sql = "SELECT id, DATE_FORMAT(date, \"%d/%m/%Y\") as date, (select text from sdsweb.lov where lov.id = sdsweb.accounting_adjust.lov_servicepoint_id) as lov_service_point_id, qty, cash, wait_transfer, adjust, update_by, update_date, (SELECT SUM (cash) FROM accounting_adjust WHERE date BETWEEN '" + f_date + "' AND '" + l_date + "') as total_cash,(SELECT SUM (wait_transfer) FROM accounting_adjust WHERE date BETWEEN '" + f_date + "' AND '" + l_date + "') as total_wait_transfer FROM sdsweb.accounting_adjust WHERE date BETWEEN '" + f_date + "' AND '" + l_date + "' "; 
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
			.then(result => {	
				res.render('report/revenue', {
					title: 'Report revenue', menu_left: 'reports',
					page_title: '', data: result ,f_date: f_date,l_date: l_date
				});
			});
		console.log('it\'s here >>', f_date, '<< value >>', l_date, '<< it\'s here',total);

	}
} else {
	//excel
	if (f_date_search == "" || f_date_search == null || l_date_search == "" || l_date_search == null) {
		console.log(f_date_search,  l_date_search, export_id );
		const sql = "SELECT id, DATE_FORMAT(date, \"%d/%m/%Y\") as date, (select text from sdsweb.lov where lov.id = sdsweb.accounting_adjust.lov_servicepoint_id) as lov_service_point_id, qty, cash, wait_transfer, adjust, update_by, update_date,(SELECT SUM (cash) FROM accounting_adjust ) as total_cash,(SELECT SUM (wait_transfer) FROM accounting_adjust ) as total_wait_transfer FROM sdsweb.accounting_adjust ";
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(result => {
				console.log('excel export');
				var wb = new xl.Workbook();
				var ws = wb.addWorksheet('Sheet 1'); 
				i=0;
				var HeaderStyle = wb.createStyle({
					font: {
						color: '#000000',
						size: 20
					},
					numberFormat: '$#,##0.00; ($#,##0.00); -'
				});
				var ContentStyle = wb.createStyle({
					font: {
						color: '#000000',
						size: 16
					},
					numberFormat: '$#,##0.00; ($#,##0.00); -'
				});
			
	
					ws.cell(1,1).string('วันที่').style(HeaderStyle);
					ws.cell(1,2).string('ศูนย์ตั้งรับ').style(HeaderStyle);
					ws.cell(1,3).string('จำนวน').style(HeaderStyle);
					ws.cell(1,4).string('เงินสด').style(HeaderStyle);
					ws.cell(1,5).string('รอโอน').style(HeaderStyle);
					ws.cell(1,6).string('รวม').style(HeaderStyle);
					ws.cell(1,7).string('ปรับยอด').style(HeaderStyle);
					
	
				result.forEach(function(data, i) {
					
					ws.cell(('%d',i+2),1).string(data.date).style(ContentStyle);
					ws.cell(('%d',i+2),2).string(data.lov_service_point_id).style(ContentStyle);
					ws.cell(('%d',i+2),3).number(data.qty).style(ContentStyle);
					ws.cell(('%d',i+2),4).number(data.cash).style(ContentStyle);
					ws.cell(('%d',i+2),5).number(data.wait_transfer).style(ContentStyle);
					ws.cell(('%d',i+2),6).number(data.cash+data.wait_transfer).style(ContentStyle);
					ws.cell(('%d',i+2),7).number(data.adjust).style(ContentStyle);
					console.log('it\'s here >> %d << : %s', i, data);x=i++;
			});
							
			ws.cell(('%d',x+3),3).string('รวม').style(HeaderStyle);
			ws.cell(('%d',x+3),4).number(result[0].total_cash).style(HeaderStyle);
			ws.cell(('%d',x+3),5).number(result[0].total_wait_transfer).style(HeaderStyle);
			ws.cell(('%d',x+3),6).number(result[0].total_cash+result[0].total_wait_transfer).style(HeaderStyle);
			ws.cell(('%d',x+3),7).string('').style(HeaderStyle);

			console.log('it\'s here >> %d << ',x+2);
			
					wb.write('ExcelFile.xlsx', res);		
			
					
					
					
	
		});

	} else {
		

		const sql = "SELECT id, DATE_FORMAT(date, \"%d/%m/%Y\") as date, (select text from sdsweb.lov where lov.id = sdsweb.accounting_adjust.lov_servicepoint_id) as lov_service_point_id, qty, cash, wait_transfer, adjust, update_by, update_date, (SELECT SUM (cash) FROM accounting_adjust WHERE date BETWEEN '" + f_date_search + "' AND '" + l_date_search + "') as total_cash,(SELECT SUM (wait_transfer) FROM accounting_adjust WHERE date BETWEEN '" + f_date_search + "' AND '" + l_date_search + "') as total_wait_transfer FROM sdsweb.accounting_adjust WHERE date BETWEEN '" + f_date_search + "' AND '" + l_date_search + "' "; 		
		models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
		.then(result => {
				console.log('excel export');
				

				var wb = new xl.Workbook();
				var ws = wb.addWorksheet('Sheet 1'); 
				i=0;
				var HeaderStyle = wb.createStyle({
					font: {
						color: '#000000',
						size: 20
					},
					numberFormat: '$#,##0.00; ($#,##0.00); -'
				});
				var ContentStyle = wb.createStyle({
					font: {
						color: '#000000',
						size: 16
					},
					numberFormat: '$#,##0.00; ($#,##0.00); -'
				});
			
	
				ws.cell(1,1).string('วันที่').style(HeaderStyle);
				ws.cell(1,2).string('ศูนย์ตั้งรับ').style(HeaderStyle);
				ws.cell(1,3).string('จำนวน').style(HeaderStyle);
				ws.cell(1,4).string('เงินสด').style(HeaderStyle);
				ws.cell(1,5).string('รอโอน').style(HeaderStyle);
				ws.cell(1,6).string('รวม').style(HeaderStyle);
				ws.cell(1,7).string('ปรับยอด').style(HeaderStyle);
				

			result.forEach(function(data, i) {
				
				ws.cell(('%d',i+2),1).string(data.date).style(ContentStyle);
				ws.cell(('%d',i+2),2).string(data.lov_service_point_id).style(ContentStyle);
				ws.cell(('%d',i+2),3).number(data.qty).style(ContentStyle);
				ws.cell(('%d',i+2),4).number(data.cash).style(ContentStyle);
				ws.cell(('%d',i+2),5).number(data.wait_transfer).style(ContentStyle);
				ws.cell(('%d',i+2),6).number(data.cash+data.wait_transfer).style(ContentStyle);
				ws.cell(('%d',i+2),7).number(data.adjust).style(ContentStyle);
				console.log('it\'s here >> %d << : %s', i, data);x=i++;
		});
						
		ws.cell(('%d',x+3),3).string('รวม').style(HeaderStyle);
		ws.cell(('%d',x+3),4).number(result[0].total_cash).style(ContentStyle);
		ws.cell(('%d',x+3),5).number(result[0].total_wait_transfer).style(ContentStyle);
		ws.cell(('%d',x+3),6).number(result[0].total_cash+result[0].total_wait_transfer).style(ContentStyle);
		ws.cell(('%d',x+3),7).string('').style(ContentStyle);

		console.log('it\'s here >> %d << ',x+3);
		
				wb.write('ExcelFile.xlsx', res);		
				
	
		});

		}
	}
}

	catch (err) {
		next();
	}
}

exports.smssends = async function (req, res) {
	try {
		res.render('report/smssends', { title: 'Report smssends', menu_left: 'reports', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}

exports.smsreply = async function (req, res) {
	try {
		res.render('report/smsreply', { title: 'Report smsresponse', menu_left: 'reports', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}

exports.smssummary = async function (req, res) {
	try {
		res.render('report/smssummary', { title: 'Report smssummary', menu_left: 'reports', page_title: '', data: null });
	}
	catch (err) {
		next();
	}
}


