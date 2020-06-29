var mongoose = require('mongoose');
var Product = mongoose.model('product');
var multer = require('multer')
const Cart = require('../lib/Cart');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});
exports.upload = upload;

exports.GetAll = (req, res) => {
    Product.find({isSold: false},(err, products) => {
        if (!err) {
            if (products.length) {
                res.render('homepage.ejs', {
                    products: products,
                    expressFlash: req.flash('success'), 
                    sessionFlash: res.locals.sessionFlash
                });
            } else {
                res.render('homepage.ejs', {
                    products: null,
                    expressFlash: req.flash('success'), 
                    sessionFlash: res.locals.sessionFlash
                });
            }
        }
        else {
            console.log('error in retrieving product list: ' + err);
        }

    });
}

exports.addProductIndex = (req, res) => {
    Product.find((err, products) => {
        if (!err) {
            res.render('addProduct.ejs');
        } else {
            return handleError(err);
        }
    })
}

exports.addProductStore = (req, res) => {
    var product = new Product();
    product.photo = 'img/' + req.file.filename;
    product.name = req.body.productName;
    product.price = req.body.productPrice;
    product.save((err, doc) => {
        if (!err)
            res.redirect('/');
        else
            console.log('Error:' + err + '\n\r' + 'request  \r\n' + req);
    });
};