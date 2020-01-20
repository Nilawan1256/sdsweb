
var indexController = require('../controllers/index-controller.js');
var donorController = require('../controllers/donor-controller.js');
var orderController = require('../controllers/order-controller.js');
var accountingGroupController = require('../controllers/accounting-controller.js');
var smsController = require('../controllers/sms-controller.js');
var reportController = require('../controllers/report-controller.js');
var stockController = require('../controllers/stock-controller.js');
var settingController = require('../controllers/setting-controller.js');

module.exports = function(app){

  app.get('/',indexController.index);
  app.get('/404',indexController.error404);	

  app.get('/donor',donorController.index);
  app.get('/donor/edit',donorController.edit);
  app.post('/donor/save',donorController.save);
  app.post('/donor/delete',donorController.delete);
  app.get('/donor/upload',donorController.upload);
  app.post('/donor/upload/save',donorController.uploadsave);

  app.get('/order',orderController.index);
  app.get('/order/edit',orderController.edit);
  app.post('/order/save',orderController.save);
  app.post('/order/delete',orderController.delete);

  app.get('/order/uploadbulk',orderController.uploadbulk);
  app.post('/order/uploadbulk/save',orderController.uploadbulksave);

  app.get('/accounting/adjust',accountingGroupController.adjust);
  app.get('/accounting/adjust/edit',accountingGroupController.adjustedit);
  app.post('/accounting/adjust/save',accountingGroupController.adjustsave);

  app.get('/stock',stockController.index);
  app.get('/stock/edit',stockController.edit);
  app.post('/stock/save',stockController.save);
  app.get('/stockcard',stockController.stockcard);
  app.get('/stockfulfill',stockController.stockfulfill);
  app.get('/stockfulfill/edit',stockController.stockfulfilledit);
  app.post('/stockfulfill/save',stockController.stockfulfillsave);

  app.get('/sms',smsController.index);
  app.post('/sms/sends',smsController.sends);

  app.get('/report',reportController.index);
  app.get('/report/donor',reportController.donor);
  app.get('/report/order',reportController.order);
  app.get('/report/revenue',reportController.revenue);
  app.get('/report/smssends',reportController.smssends);
  app.get('/report/smsreply',reportController.smsreply);
  app.get('/report/smssummary',reportController.smssummary);

  app.get('/report/search_donor',reportController.search_donor);



  app.get('/setting',settingController.index);
  app.get('/setting/user',settingController.user);
  app.get('/setting/user/edit',settingController.useredit);
  app.post('/setting/user/save',settingController.usersave);
  app.get('/setting/point',settingController.point);
  app.get('/setting/point/edit',settingController.pointedit);
  app.post('/setting/point/save',settingController.pointsave);
  app.get('/setting/project',settingController.project);
  app.get('/setting/project/edit',settingController.projectedit);
  app.post('/setting/project/save',settingController.projectsave);

}
