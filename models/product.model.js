const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    isSold:{
        type: Boolean,
        default: false,
        required: true
    }
});

mongoose.model('product', productSchema);