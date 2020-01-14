/*adminp@ssw0rd*/
const memshared = require('memshared');
var cluster = require('cluster');

var exports = module.exports = {}

exports.signup = function(req,res){
	res.render('signup');
}

exports.login = function(req,res){
	var message = req.flash('error');
	res.render('login',{ title: 'Login', menutopactive:'', message: message, reqauth:true });
}

exports.logout = function(req,res){
  res.redirect('/');
}
