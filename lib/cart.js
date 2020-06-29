module.exports = function Cart(cart) {
    this.items = cart.items || {};

    this.add = function(item, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, price: 0};
        }
        cartItem.price = cartItem.item.price;
    };

    this.remove = function(id) {
        delete this.items[id];
    };
    
    this.allRemove = function() {
        delete this.items;
    }

    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};