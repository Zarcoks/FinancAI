const Stock = require("../Stock/stock")

class Transaction {
    /**
     * 
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    constructor(stock, quantity) {
        this.stock = {...stock}
        this.quantity = quantity
    }

    isBuyTransaction() {
        return this.quantity > 0
    }

    isSellTransaction() {
        return this.quantity < 0
    }
}

module.exports = Transaction