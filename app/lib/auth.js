const ObjectId = require('mongodb').ObjectID;
const _ = require('lodash');

const restrictedRoutes = [
    { route: '/setting/user', response: 'redirect' },
    { route: '/setting/user/edit/:id', response: 'redirect' },
    { route: '/setting/user/save', response: 'redirect' },
    { route: '/setting/user/delete/:id', response: 'redirect' },
    { route: '/setting/user/privilege/:id', response: 'redirect' },
    { route: '/setting/user/privilege/save', response: 'redirect' },
    { route: '/setting/userrole', response: 'redirect' },
    { route: '/setting/userrole/edit/:id', response: 'redirect' },
    { route: '/setting/userrole/save', response: 'redirect' },
    { route: '/setting/userrole/delete/:id', response: 'redirect' }
];

const restrict = (req, res, next) => {
    checkLogin(req, res, next);
};

const checkLogin = async (req, res, next) => {
    const db = req.app.db;
    // if not protecting we check for public pages and don't checkLogin
    if(req.session.needsSetup === true){
        res.redirect('/admin/setup');
        return;
    }

    // If API key, check for a user
    if(req.headers.apikey){
        try{
            const user = await db.users.findOne({
                apiKey: ObjectId(req.headers.apikey),
                isAdmin: true
            });
            if(!user){
                res.status(400).json({ message: 'Access denied' });
                return;
            }
            // Set API authenticated in the req
            req.apiAuthenticated = true;
            next();
            return;
        }catch(ex){
            res.status(400).json({ message: 'Access denied' });
            return;
        }
    }

    if(req.session.user){
        next();
        return;
    }
    res.redirect('/login');
};

// Middleware to check for admin access for certain route
const checkAccess = (req, res, next) => {
    const routeCheck = _.find(restrictedRoutes, { route: req.route.path });

    // If the user is not an admin and route is restricted, show message and redirect to /admin
    if(req.session.isAdmin === false && routeCheck){
        if(routeCheck.response === 'redirect'){
            req.session.message = 'Unauthorised. Please refer to administrator.';
            req.session.messageType = 'danger';
            res.redirect('/admin');
            return;
        }
        if(routeCheck.response === 'json'){
            res.status(400).json({ message: 'Unauthorised. Please refer to administrator.' });
        }
    }else{
        next();
    }
};

const checkAuthen = (req, res, next) => {
    if (req.isAuthenticated()){
        res.locals.user = req.user;  
        return next();
      }
    res.redirect('/login');
  }

const checkRoutePrivilege = (req, res, next) => {
    try{
        if(res.locals.userRolePrivilege===null){
            let privilege = [];
            let hasRolePrivilege = false;
            const db = req.app.db;
            db.sequelize.query("SELECT * FROM role_base_privilege where role_base_id IN (select role_base_id from user_rolebase where user_id = "+req.user.id+")", { type: sequelize.QueryTypes.SELECT})
            .then(data => {
                _.forEach(data, function(_data) {
                    privilege.push(_data.role_privilege_id);
                    if(req.rolePrivilege===_data.role_privilege_id){                                                
                        hasRolePrivilege = true;
                    }
                })   
                res.locals.userRolePrivilege = privilege;
                if(hasRolePrivilege)
                {
                    return next();
                }
                else
                {
                    res.redirect('/404');
                }                
            });               
        }                     
    }
    catch(err){
        console.log(err);
    }
  }


module.exports = {
    restrict,
    checkLogin,
    checkAccess,
    checkAuthen,
    checkRoutePrivilege,
    checkUserPrivilege
};
