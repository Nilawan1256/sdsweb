var async = require("async");
var _ = require("lodash");
var models = require("../models");
var moment = require('moment');

var exports = (module.exports = {});

exports.index = async function(req, res) {
  try {
    var q = req.query.q;
    console.log(JSON.stringify(q));
    if (q == null) {
      let sql = 'SELECT id, lov_prefix_id, firstname, lastname, address, state, lov_country_id, zipcode, ';
      sql += 'phone, occupation, date_of_birth, lov_gender_id, line, email, lov_donor_group_id, comment, create_by, ';
      sql += 'DATE_FORMAT(create_date, "%d/%m/%Y") as create_date FROM donor ';
      models.sequelize
        .query(sql, { type: models.sequelize.QueryTypes.SELECT })
        .then(_donor => {
          res.render("donor/index", {title: "donor", menu_left: "donor", page_title: "", data: _donor});
        });
      console.log(JSON.stringify("show"));
    } else {
      let sql = "SELECT * FROM donor WHERE firstname LIKE '%"+ q +"%' OR lastname LIKE '%"+ q +"%' ";
      models.sequelize
        .query(sql, { type: models.sequelize.QueryTypes.SELECT })
        .then(_donor => {
          res.render("donor/index", {title: "donor", menu_left: "donor", page_title: "", data: _donor});
        });
      console.log(JSON.stringify("search"));
    }
  } catch (err) {
    next();
  }
};

exports.edit = async function(req, res) {
  try {
    let _id = req.query.id;
    let _data = [{}];
    if (!_id) {
      let sql_lov_prefix = "SELECT text ,id  FROM lov WHERE lov.group = 'prefix_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_prefix, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data.sql_lov_prefix = res})
      );

      let sql_lov_country = "SELECT text ,id  FROM lov WHERE lov.group = 'country_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_country, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data.sql_lov_country = res})
      );

      let sql_lov_gender = "SELECT text ,id  FROM lov WHERE lov.group = 'gender_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_gender, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data.sql_lov_gender = res})
      );

      let sql_lov_donor_group = "SELECT text ,id  FROM lov WHERE lov.group = 'donor_group_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_donor_group, {type: models.sequelize.QueryTypes.SELECT})
        .then(res => {_data.sql_lov_donor_group = res})
      );
      console.log(_data);
      res.render("donor/edit", {title: "donor", menu_left: "donor", page_title: "", data: _data});
    } else {
      let sql = "SELECT id, firstname, lastname, address, state, zipcode, phone, occupation, ";
      sql += 'DATE_FORMAT(date_of_birth, "%d/%m/%Y") as date_of_birth, line, email, comment, create_by,';
      sql += 'DATE_FORMAT(create_date, "%d/%m/%Y") as create_date,';
      sql += "(SELECT text FROM lov WHERE lov.id = donor.lov_prefix_id) as prefix, ";
      sql += "(SELECT text FROM lov WHERE lov.id = donor.lov_country_id) as country, ";
      sql += "(SELECT text FROM lov WHERE lov.id = donor.lov_gender_id) as gender, ";
      sql += "(SELECT text FROM lov WHERE lov.id = donor.lov_donor_group_id) as donor_group FROM `donor` WHERE id = " + _id + " ";
      console.log(sql);
      await (models.sequelize
        .query(sql, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data = res})
      );

      let sql_lov_prefix = "SELECT text ,id  FROM lov WHERE lov.group = 'prefix_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_prefix, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data.sql_lov_prefix = res})
      );

      let sql_lov_country = "SELECT text ,id  FROM lov WHERE lov.group = 'country_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_country, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data.sql_lov_country = res})
      );

      let sql_lov_gender = "SELECT text ,id  FROM lov WHERE lov.group = 'gender_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_gender, { type: models.sequelize.QueryTypes.SELECT })
        .then(res => {_data.sql_lov_gender = res})
      );

      let sql_lov_donor_group = "SELECT text ,id  FROM lov WHERE lov.group = 'donor_group_id' AND lov.delete_flag = 0";
      await (models.sequelize
        .query(sql_lov_donor_group, {type: models.sequelize.QueryTypes.SELECT})
        .then(res => {_data.sql_lov_donor_group = res})
      );

      console.log(_data);
      res.render("donor/edit", {title: "donor", menu_left: "donor", page_title: "", data: _data});
    }
  } catch (err) {
    next();
  }
};

exports.save = async function(req, res) {
  try {
    let _id = req.body.id;
    console.log("ID = " + _id);
    if (!_id) {
      console.log("add...");
      let _bd = [];

      if (!req.body.birthday){
        console.log("aaaa");
        _bd.date = null;
      }
      else{
        console.log("bbbb");
        let bd = moment(req.body.birthday, 'DD/MM/YYYY');
        _bd.date = bd.format('YYYY/MM/DD');
      }

      let db = req.app.db;
      db.donor.create({
        lov_prefix_id: req.body.prefix,
        firstname: req.body.fname,
        lastname: req.body.lname,
        address: req.body.address,
        state: req.body.state,
        lov_country_id: req.body.country,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        occupation: req.body.occupation,
        date_of_birth: _bd.date,
        lov_gender_id: req.body.gender,
        line: req.body.line,
        email: req.body.email,
        lov_donor_group_id: req.body.donor_group,
        comment: req.body.comment
      })
      .then(_donor => {
        console.log(_donor);
    })
        .catch(error => {
          console.log("Create Failed ! +" + error);
        });
    } else {
      console.log("edit...");

        // set format date
        let bd = moment(req.body.birthday, 'DD/MM/YYYY');
        let _bd = bd.format('YYYY/MM/DD');
      
      let db = req.app.db;
      db.donor.update({
            lov_prefix_id: req.body.prefix,
            firstname: req.body.fname,
            lastname: req.body.lname,
            address: req.body.address,
            state: req.body.state,
            lov_country_id: req.body.country,
            zipcode: req.body.zipcode,
            phone: req.body.phone,
            occupation: req.body.occupation,
            date_of_birth: _bd,
            lov_gender_id: req.body.gender,
            line: req.body.line,
            email: req.body.email,
            lov_donor_group_id: req.body.donor_group,
            comment: req.body.comment
          },
          { where: { id: req.body.id } }
        )
        .then(_donor => {
          console.log("Updated !");
        })
        .catch(error => {
          console.log("Update Failed ! +" + error);
        });
    }
    res.redirect("/donor");
  } catch (err) {
    next();
  }
};

exports.delete = async function(req, res) {
  try {
    await (models.donor.destroy({
        where: { id: req.body.id }
    })
      .then(del => {
        console.log("Deleted successfully " + del);
      })
    );
    res.redirect('/donor');
    //res.render('donor/index', { title: 'เสถียรธรรมสถาน', menu_left:'', page_title:'', data:id });

  } catch (err) {
    next();
  }
};

exports.upload = async function(req, res) {
  try {
    res.render("donor/upload", {title: "donor upload",menu_left: "donor", page_title: "", data: null});
  } catch (err) {
    next();
  }
};

exports.uploadsave = async function(req, res) {
  try {
    res.render("donor/uploadsave/save", {title: "donor donor", menu_left: "donor", page_title: "", data: null});
  } catch (err) {
    next();
  }
};
