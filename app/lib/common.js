const _ = require('lodash');
const uglifycss = require('uglifycss');
const colors = require('colors');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const async = require('async');
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const escape = require('html-entities').AllHtmlEntities;
const mkdirp = require('mkdirp');
const countryList = require('countries-list');
var url = require('url');
const querystring = require('querystring');

// Parse country list once
const countryArray = [];
Object.keys(countryList.countries).forEach((country) => {
    countryArray.push(countryList.countries[country].name);
});

// Allowed mime types for product images
const allowedMimeType = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp'
];

const fileSizeLimit = 10485760; /*10 MB */

// common functions
const cleanHtml = (html) => {
    return sanitizeHtml(html);
};

const mongoSanitize = (param) => {
    if(param instanceof Object){
        for(const key in param){
            if(/^\$/.test(key)){
                delete param[key];
            }
        }
    }
    return param;
};

const safeParseInt = (param) => {
    if(param){
        try{
            return parseInt(param);
        }catch(ex){
            return param;
        }
    }else{
        return param;
    }
};

const checkboxBool = (param) => {
    if(param && param === 'on'){
        return true;
    }
    return false;
};

const convertBool = (value) => {
    if(value === 'true' || value === true){
        return true;
    }
    return false;
};



const clearSessionValue = (session, sessionVar) => {
    let temp;
    if(session){
        temp = session[sessionVar];
        session[sessionVar] = null;
    }
    return temp;
};

const checkDirectorySync = (directory) => {
    try{
        fs.statSync(directory);
    }catch(e){
        try{
            fs.mkdirSync(directory);
        }catch(err){
           mkdirp.sync(directory);// error : directory & sub directories to be newly created
        }
    }
};

const getThemes = () => {
    return fs.readdirSync(path.join(__dirname, '../', 'views', 'themes')).filter(file => fs.statSync(path.join(path.join(__dirname, '../', 'views', 'themes'), file)).isDirectory());
};

const getImages = async (id, req, res, callback) => {

    // loop files in /public/uploads/
    const files = await glob.sync(`public/uploads/${id}/**`, { nosort: true });

    // sort array
    files.sort();

    // declare the array of objects
    const fileList = [];

    // loop these files
    for(let i = 0; i < files.length; i++){
        // only want files
        if(fs.lstatSync(files[i]).isDirectory() === false){
            // declare the file object and set its values
            const file = {
                id: i,
                path: files[i].substring(6)
            };
            if(product.productImage === files[i].substring(6)){
                file.productImage = true;
            }
            // push the file object into the array
            fileList.push(file);
        }
    }
    return fileList;
};

const getConfig = () => {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config', 'settings.json'), 'utf8'));
    const localConfigFilePath = path.join(__dirname, '../config', 'settings-local.json');

    // Check for local config file and merge with base settings
    if(fs.existsSync(localConfigFilePath)){
        const localConfigFile = JSON.parse(fs.readFileSync(localConfigFilePath, 'utf8'));
        config = Object.assign(config, localConfigFile);
    }

    // Override from env.yaml environment file
    Object.keys(config).forEach((configKey) => {
        if(process.env[configKey]){
            config[configKey] = process.env[configKey];
        }
    });

    // set the environment for files
    config.env = '.min';
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined){
        config.env = '';
    }

    return config;
};

const updateConfig = (fields) => {
    const settingsFile = getConfig();

    _.forEach(fields, (value, key) => {
        settingsFile[key] = value;
        if(key === 'customCss_input'){
            settingsFile.customCss = escape.encode(uglifycss.processString(value));
        }
        if(key === 'footerHtml_input'){
            const footerHtml = typeof value !== 'undefined' || value === '' ? escape.encode(value) : '';
            settingsFile.footerHtml = footerHtml;
        }
        if(key === 'googleAnalytics_input'){
            const googleAnalytics = typeof value !== 'undefined' ? escape.encode(value) : '';
            settingsFile.googleAnalytics = googleAnalytics;
        }
    });

    // delete any settings
    delete settingsFile.customCss_input;
    delete settingsFile.footerHtml_input;
    delete settingsFile.googleAnalytics_input;

    if(fields.emailSecure === 'on'){
        settingsFile.emailSecure = true;
    }else{
        settingsFile.emailSecure = false;
    }

    if(!fields.menuEnabled){
        settingsFile.menuEnabled = false;
    }else{
        settingsFile.menuEnabled = true;
    }

    if(fields.emailPort){
        settingsFile.emailPort = parseInt(fields.emailPort);
    }

    // If we have a local settings file (not git tracked) we loop its settings and save
    // and changes made to them. All other settings get updated to the base settings file.
    const localSettingsFile = path.join(__dirname, '../config', 'settings-local.json');
    if(fs.existsSync(localSettingsFile)){
        const localSettings = JSON.parse(fs.readFileSync(localSettingsFile));
        _.forEach(localSettings, (value, key) => {
            if(fields[key]){
                localSettings[key] = fields[key];

                // Exists in local so remove from main settings file
                delete settingsFile[key];
            }
        });
        // Save our local settings
        try{
            fs.writeFileSync(localSettingsFile, JSON.stringify(localSettings, null, 4));
        }catch(exception){
            console.log('Failed to save local settings file', exception);
        }
    }

    // write base settings file
    const baseSettingsFile = path.join(__dirname, '../config', 'settings.json');
    try{
        fs.writeFileSync(baseSettingsFile, JSON.stringify(settingsFile, null, 4));
        return true;
    }catch(exception){
        return false;
    }
};

const updateConfigLocal = (field) => {
    const localSettingsFile = path.join(__dirname, '../config', 'settings-local.json');
    try{
        let localSettings = {};
        if(fs.existsSync(localSettingsFile)){
            localSettings = JSON.parse(fs.readFileSync(localSettingsFile));
        }
        Object.assign(localSettings, field);
        fs.writeFileSync(localSettingsFile, JSON.stringify(localSettings, null, 4));
    }catch(exception){
        console.log('Failed to save local settings file', exception);
    }
};


const getEmailTemplate = (result) => {
    const config = getConfig();

    const template = fs.readFileSync(path.join(__dirname, '../public/email_template.html'), 'utf8');

    $ = cheerio.load(template);
    $('#brand').text(config.cartTitle);
    $('#paymentResult').text(result.message);
    if(result.paymentApproved === true){
        $('#paymentResult').addClass('text-success');
    }else{
        $('#paymentResult').addClass('text-danger');
    }
    $('#paymentMessage').text('Thanks for shopping with us. We hope you will shop with us again soon.');
    $('#paymentDetails').html(result.paymentDetails);

    return $.html();
};

const sendEmail = (to, subject, body) => {
    const config = getConfig();

    const emailSettings = {
        host: config.emailHost,
        port: config.emailPort,
        secure: config.emailSecure,
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    };

    // outlook needs this setting
    if(config.emailHost === 'smtp-mail.outlook.com'){
        emailSettings.tls = { ciphers: 'SSLv3' };
    }

    const transporter = nodemailer.createTransport(emailSettings);

    const mailOptions = {
        from: config.emailAddress, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: body// html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.error(colors.red(error));
        }
        return true;
    });
};

// gets the correct type of index ID
const getId = (id) => {
    if(id){
        if(id.length !== 24){
            return id;
        }
    }
    return ObjectId(id);
};

const newId = () => {
    return new ObjectId();
};

const hooker = (order) => {
    const config = getConfig();

    return axios.post(config.orderHook, order, { responseType: 'application/json' })
    .then((response) => {
        if(response.status === 200){
            console.info('Successfully called order hook');
        }
    })
    .catch((err) => {
        console.log('Error calling hook:', err);
    });
};

const getCountryList = () => {
    return countryArray;
};

const getUrlParam = (req,name) => {
    let rawUrl = req.originalUrl;
    let parsedUrl = url.parse(rawUrl);
    let parsedQs = querystring.parse(parsedUrl.query);
    return parsedQs[name]
  }
  
const getUrlPostParam = (req,name) => {
    let rawUrl = req.headers.referer;
    let parsedUrl = url.parse(rawUrl);
    let parsedQs = querystring.parse(parsedUrl.query);
    return parsedQs[name]
  }

const pagination = (datacount, limit, page) => {
    let pages = Math.ceil(datacount / limit);
    let startpage = ((Math.floor(page/6))*5)+1;				
    let prevpage = startpage!=1?startpage-1:startpage;
    let nextpage = prevpage+5<pages?prevpage+5:pages;
    let endpage = nextpage!=pages?nextpage:nextpage+1;
    if(nextpage===0){nextpage=1;}
    return {
        pages:pages,
        startpage:startpage,
        prevpage:prevpage,
        nextpage:nextpage,
        endpage:endpage
    }	
}


module.exports = {
    allowedMimeType,
    fileSizeLimit,
    cleanHtml,
    mongoSanitize,
    safeParseInt,
    checkboxBool,
    convertBool,    
    clearSessionValue,                
    checkDirectorySync,
    getThemes,
    getImages,
    getConfig,    
    updateConfig,
    updateConfigLocal,
    getEmailTemplate,
    sendEmail,
    getId,
    newId,
    hooker,
    getCountryList,
    getUrlParam,
    getUrlPostParam,
    pagination
};
