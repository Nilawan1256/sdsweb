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

// adds products to sitemap.xml
const addSitemapProducts = (req, res, cb) => {
    const db = req.app.db;

    const config = getConfig();
    const hostname = config.baseUrl;

    db.products.find({ productPublished: true }).toArray((err, products) => {
        const posts = [];
        if(err){
            cb(null, posts);
        }
        async.eachSeries(products, (item, callback) => {
            const post = {};
            let url = item._id;
            if(item.productPermalink){
                url = item.productPermalink;
            }
            post.url = hostname + '/' + url;
            post.changefreq = 'weekly';
            post.priority = 0.7;
            posts.push(post);
            callback(null, posts);
        }, () => {
            cb(null, posts);
        });
    });
};

const updateTotalCart = (req, res) => {
    const config = getConfig();

    req.session.totalCartAmount = 0;
    req.session.totalCartItems = 0;
    req.session.totalCartProducts = 0;

    // If cart is empty return zero values
    if(!req.session.cart){
        return;
    }

    Object.keys(req.session.cart).forEach((item) => {
        req.session.totalCartAmount = req.session.totalCartAmount + req.session.cart[item].totalItemPrice;
        req.session.totalCartProducts = req.session.totalCartProducts + req.session.cart[item].quantity;
    });

    // Update the total items in cart for the badge
    req.session.totalCartItems = Object.keys(req.session.cart).length;

    // under the free shipping threshold
    if(req.session.totalCartAmount < config.freeShippingAmount){
        req.session.totalCartAmount = req.session.totalCartAmount + parseInt(config.flatShipping);
        req.session.shippingCostApplied = true;
    }else{
        req.session.shippingCostApplied = false;
    }
};

const emptyCart = async (req, res, type, customMessage) => {
    const db = req.app.db;

    // Remove from session
    delete req.session.cart;
    delete req.session.shippingAmount;
    delete req.session.orderId;
    delete req.session.cartSubscription;

    // Remove cart from DB
    await db.cart.deleteOne({ sessionId: req.session.id });

    // update total cart
    updateTotalCart(req, res);

    // Update checking cart for subscription
    updateSubscriptionCheck(req, res);

    // Set returned message
    let message = 'Cart successfully emptied';
    if(customMessage){
        message = customMessage;
    }

    if(type === 'function'){
        return;
    }

    // If POST, return JSON else redirect nome
    if(type === 'json'){
        res.status(200).json({ message: message, totalCartItems: 0 });
        return;
    }

    req.session.message = message;
    req.session.messageType = 'success';
    res.redirect('/');
};

const clearCustomer = (req) => {
    // Clear our session
    req.session.customerPresent = null;
    req.session.customerEmail = null;
    req.session.customerFirstname = null;
    req.session.customerLastname = null;
    req.session.customerAddress1 = null;
    req.session.customerAddress2 = null;
    req.session.customerCountry = null;
    req.session.customerState = null;
    req.session.customerPostcode = null;
    req.session.customerPhone = null;
    req.session.orderComment = null;
};

const updateSubscriptionCheck = (req, res) => {
    // If cart is empty
    if(!req.session.cart || req.session.cart.length === 0){
        req.session.cartSubscription = null;
        return;
    }

    Object.keys(req.session.cart).forEach((item) => {
        if(item.productSubscription){
            req.session.cartSubscription = item.productSubscription;
        }else{
            req.session.cartSubscription = null;
        }
    });
};

const getPaymentConfig = () => {
    const siteConfig = getConfig();
    const gateConfigFile = path.join(__dirname, '../config', `${siteConfig.paymentGateway}.json`);

    let config = [];
    if(fs.existsSync(gateConfigFile)){
        config = JSON.parse(fs.readFileSync(gateConfigFile, 'utf8'));
    }

    // If a local config we combine the objects. Local configs are .gitignored
    const localConfig = path.join(__dirname, '../config', `${siteConfig.paymentGateway}-local.json`);
    if(fs.existsSync(localConfig)){
        const localConfigObj = JSON.parse(fs.readFileSync(localConfig, 'utf8'));
        config = Object.assign(config, localConfigObj);
    }

    // Override from env.yaml environment file
    Object.keys(config).forEach((configKey) => {
        if(process.env[configKey]){
            config[configKey] = process.env[configKey];
        }
    });

    return config;
};

module.exports = {
    addSitemapProducts,
    updateTotalCart,
    emptyCart,
    clearCustomer,
    updateSubscriptionCheck,
    getPaymentConfig
};

