let _db;

function initDb(models, callback){ // eslint-disable-line
    if(_db){
        console.warn('Trying to init DB again!');
        return callback(null, _db);
    }

    models.sequelize.sync().then(function(){
        console.log('Connect! Database looks fine')
        }).catch(function(err){
        console.log(err,"Something went wrong with the Database Update!")
    });
    _db = models;
    return callback(null, _db);


    // MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, connected);
    // function connected(err, client){
    //     if(err){
    //         return callback(err);
    //     }

    //     // select DB
    //     const dbUriObj = mongodbUri.parse(dbUrl);
    //     let db;
    //     // if in testing, set the testing DB
    //     if(process.env.NODE_ENV === 'test'){
    //         db = client.db('testingdb');
    //     }else{
    //         db = client.db(dbUriObj.database);
    //     }

    //     // setup the collections
    //     db.users = db.collection('users');
    //     db.products = db.collection('products');
    //     db.orders = db.collection('orders');
    //     db.pages = db.collection('pages');
    //     db.menu = db.collection('menu');
    //     db.customers = db.collection('customers');
    //     db.cart = db.collection('cart');
    //     db.sessions = db.collection('sessions');

    //     _db = db;
    //     return callback(null, _db);
    // }
};

function getDb(){
    return _db;
}

module.exports = {
    getDb,
    initDb
};
