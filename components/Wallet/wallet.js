const StockContainerManager = require("./stockContainerManager")
const Stock = require("../Stock/stock")
const WalletCommonSenseManager = require("./walletCommonSenseManager")

class Wallet {
    /**
     * @param {Number} baseAmount 
     */
    constructor(baseAmount) {
        this.baseAmount = baseAmount
        this.amount = baseAmount
        this.stockContainerManager = new StockContainerManager()
    }

    /**
     * Ajoute l'action au porte monnaie et retire l'argent lié à l'achat
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    buyStock(stock, quantity) {
        if (WalletCommonSenseManager.canBuyStock(stock, quantity, this.amount)) {
            this.stockContainerManager.addStock(stock, quantity)
            this.amount -= stock.price * quantity
        }
        else throw new Error("You cannot buy this stock")
    }


    /**
     * Retire l'action du porte monnaie et ajoute l'argent de la vente
     * @param {*} stock 
     * @param {*} quantity 
     */
    sellStock(stock, quantity) {
        if (WalletCommonSenseManager.canSellStock(this.stockContainerManager.getStockQuantity(stock), quantity)) {
            this.stockContainerManager.removeStock(stock, quantity)
            this.amount += stock.price * quantity
        }
        else throw new Error("You cannot sell this stock")
        
    }
}

module.exports = Wallet