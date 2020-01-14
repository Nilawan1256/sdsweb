var authController = require('../controllers/auth-controller.js');

module.exports = function(app,passport){

	app.get('/signup', authController.signup);

	app.get('/login', authController.login);

	app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/', failureRedirect: '/signup'}));

	app.get('/logout',authController.logout);

	app.post('/login', passport.authenticate('local-signin',  { successRedirect: '/', failureRedirect: '/login', failureFlash : true}));

}
