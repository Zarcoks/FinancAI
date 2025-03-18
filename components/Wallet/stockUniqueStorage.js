class StockUniqueStorage {
    constructor(stock, quantity=0) {
        this.stock = stock
        this.quantity = quantity
    }

    addStock(quantity) {
        this.quantity+=quantity
    }
}

module.exports = StockUniqueStorage