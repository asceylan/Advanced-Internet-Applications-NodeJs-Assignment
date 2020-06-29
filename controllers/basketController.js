var mongoose = require('mongoose');
var Product = mongoose.model('product');
const Cart = require('../lib/Cart');

exports.index = (req, res) => {
    if (!req.session.cart) {
        return res.render('checkout', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', {
        products: cart.getItems(),
    });};

exports.store = (req, res) => {
    let productId = req.body.id;
    Product.findById(req.body.id, (err, product) => {
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        if (!err) {
            cart.add(product, productId);
            req.session.cart = cart;
            res.redirect('/');
        } else {
            res.redirect('/404');
        }
    })
};

exports.destroy = (req, res) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    req.session.sessionFlash = {
        type: 'success',
        message: 'The product has been successfully deleted from the basket.'
    };
    res.redirect('/');
};

exports.reset = (req, res) => {
    req.session.cart = null;
    req.session.sessionFlash = {
        type: 'success',
        message: 'All items have been unloaded from your basket.'
    };
    res.redirect('/');
};
