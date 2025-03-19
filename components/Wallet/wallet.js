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
            this.amount -= this.getTransactionPrice()
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
            this.amount -= this.getTransactionPrice()
        }
        else throw new Error("You cannot sell this stock")
    }


    /**
     * Retourne la somme des derniers prix connus des actions avec l'amount actuel du portefeuille.
     * @returns {Number}
     */
    getTotalAmount() {
        return this.amount + this.stockContainerManager.getTotalStockAmount()
    }

    getBenefitsAcquired() {
        return this.getTotalAmount() - this.baseAmount
    }

    canAfford(stock) {
        return this.amount >= stock.price
    }

    canSell(stock) {
        return this.stockContainerManager.hasStock(stock)
    }

    getTransactionPrice() {
        return 1
    }
}

module.exports = Wallet