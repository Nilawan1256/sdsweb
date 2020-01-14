var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var flash = require('connect-flash');
const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');
const numeral = require('numeral');
const helmet = require('helmet');
const colors = require('colors');
const crypto = require('crypto');
const i18n = require('i18n');
const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });
let handlebars = require('express-handlebars');
const compression = require('compression');
const common = require('./app/lib/common');
var models = require("./app/models");
const { initDb } = require('./app/lib/db');
const { addSchemas } = require('./app/lib/schema');

const config = common.getConfig();
const baseConfig = ajv.validate(require('./app/config/baseSchema'), config);
if(baseConfig === false){
  console.log(colors.red(`settings.json incorrect: ${ajv.errorsText()}`));
    process.exit(2);
}

var app = express();

app.use(compression());

// Language initialize
i18n.configure({
  locales: config.availableLanguages,
  defaultLocale: config.defaultLocale,
  cookie: 'locale',
  queryParameter: 'lang',
  directory: `${__dirname}/locales`,
  directoryPermissions: '755',
  api: {
      __: '__', 
      __n: '__n' 
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// view engine setup
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

// helpers for the handlebar templating platform
handlebars = handlebars.create({
  helpers: {
      // Language helper
      __: () => { return i18n.__(this, arguments); }, // eslint-disable-line no-undef
      __n: () => { return i18n.__n(this, arguments); }, // eslint-disable-line no-undef
      availableLanguages: (block) => {
          let total = '';
          for(const lang of i18n.getLocales()){
              total += block.fn(lang);
          }
          return total;
      },
      menuMatch: (title, search) => {
          if(!title || !search){
              return'';
          }
          if(title.toLowerCase().startsWith(search.toLowerCase())){
              return'class="navActive"';
          }
          return'';
      },
      formatAmount: (amt) => {
          if(amt){
              return numeral(amt).format('0.00');
          }
          return'0.00';
      },
      amountNoDecimal: (amt) => {
          if(amt){
              return handlebars.helpers.formatAmount(amt).replace('.', '');
          }
          return handlebars.helpers.formatAmount(amt);
      },
      currencySymbol: (value) => {
          if(typeof value === 'undefined' || value === ''){
              return'$';
          }
          return value;
      },
      objectLength: (obj) => {
          if(obj){
              return Object.keys(obj).length;
          }
          return 0;
      },
      stringify: (obj) => {
          if(obj){
              return JSON.stringify(obj);
          }
          return'';
      },
      checkedState: (state) => {
          if(state === 'true' || state === true){
              return'checked';
          }
          return'';
      },
      selectState: (state, value) => {
          if(state === value){
              return'selected';
          }
          return'';
      },
      isNull: (value, options) => {
          if(typeof value === 'undefined' || value === ''){
              return options.fn(this);
          }
          return options.inverse(this);
      },
      toLower: (value) => {
          if(value){
              return value.toLowerCase();
          }
          return null;
      },
      formatDate: (date, format) => {
          return moment(date).format(format);
      },
      upperFirst: (value) => {
          return value.replace(/^\w/, (chr) => {
              return chr.toUpperCase();
          });
      }
  }
});

// Setup secrets
if(!config.secretCookie || config.secretCookie === ''){
  const randomString = crypto.randomBytes(20).toString('hex');
  config.secretCookie = randomString;
  common.updateConfigLocal({ secretCookie: randomString });
}
if(!config.secretSession || config.secretSession === ''){
  const randomString = crypto.randomBytes(20).toString('hex');
  config.secretSession = randomString;
  common.updateConfigLocal({ secretSession: randomString });
}

app.enable('trust proxy');
app.use(helmet());
app.set('port', process.env.port || 3000);
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.secretCookie));
app.use(express.static(path.join(__dirname, '/app/public')));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secretSession,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 900000
    }
}));

// Set locales from session
app.use(i18n.init);

app.use((req, res, next) => {
  req.handlebars = handlebars;
  next();
});

// Ran on all routes
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store');
  next();
});

// var models = require("./app/models");
// var authRoute = require('./app/routes/auth.js')(app,passport);
require('./app/routes/index.js')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development'){
  app.use((err, req, res, next) => {
      console.error(colors.red(err.stack));
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err,
          helpers: handlebars.helpers
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  console.error(colors.red(err.stack));
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {},
      helpers: handlebars.helpers
  });
});

app.on('uncaughtException', (err) => {
    console.error(colors.red(err.stack));
    process.exit(2);
});

initDb(models, async (err, db) => {
  // On connection error we display then exit
  if(err){
      console.log(colors.red('Error connecting to database : ' + err));
      process.exit(2);
  }

  // add db to app for routes
  app.db = db;
  app.config = config;

  // Set trackStock for testing
  if(process.env.NODE_ENV === 'test'){
      config.trackStock = true;
  }

    // Process schemas
    await addSchemas();

});

module.exports = app;
