var mongoose = require('mongoose');
var Product = mongoose.model('product');
const Cart = require('../lib/Cart');

exports.create = (req, res) => {
    let productId = req.body.id;

    if (req.body.referrer === 'checkout') {
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        req.session.paymentProduct = cart;
        res.render('payment', {
            products: cart.getItems(),
        });
    } else {
        Product.findById(req.body.id, (err, product) => {
            if (!err) {
                var cart = new Cart(req.session.paymentProduct ? req.session.paymentProduct : {});
                cart.add(product, productId);
                req.session.paymentProduct = cart;
                res.render('payment', {
                    products: cart.getItems(),
                });
            } else {
                res.redirect('/404');
            }
        })
    }
};

exports.store = (req, res) => {
    var cart = new Cart(req.session.paymentProduct);
    var paymentProduct = cart.getItems();
    paymentProduct.forEach(product => {
        if (product.item.isSold === false) {
            Product.findByIdAndUpdate(
                product.item._id,
                { $set: { isSold: true } },
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("RESULT: " + result);
                });

            req.session.sessionFlash = {
                type: 'success',
                message: 'Thank you for choosing us.'
            };
            res.redirect('/checkout');
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Someone bought the product before you.'
            };
            res.redirect('/checkout');
        }
    });

};