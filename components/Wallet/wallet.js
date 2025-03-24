const StockContainerManager = require("./stockContainerManager")
const Stock = require("../Stock/stock")
const TransactionsManager = require("../Transaction/TransactionsManager")

class Wallet {
    /**
     * @param {Number} baseAmount 
     */
    constructor(baseAmount) {
        this.baseAmount = baseAmount
        this.amount = baseAmount
        this.stockContainerManager = new StockContainerManager()
        this.transactionsManager = new TransactionsManager()
    }

    /**
     * Ajoute l'action au porte monnaie et retire l'argent lié à l'achat
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    buyStock(stock, quantity) {
        this.stockContainerManager.addStock(stock, quantity)
        this.amount -= stock.price * quantity
        this.amount -= this.getTransactionPrice()
        this.transactionsManager.addTransaction(stock, quantity)
    }

    /**
     * Retire l'action du porte monnaie et ajoute l'argent de la vente
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    sellStock(stock, quantity) {
        this.stockContainerManager.removeStock(stock, quantity)
        this.amount += stock.price * quantity 
        this.amount -= this.getTransactionPrice()
        this.transactionsManager.addTransaction(stock, -quantity)
    }

    /**
     * Retourne la somme des derniers prix connus des actions avec l'amount actuel du portefeuille.
     * @returns {Number}
     */
    getTotalAmount() {
        return this.amount + this.stockContainerManager.getTotalStockAmount()
    }

    getBenefitsAcquiredOnLastSell() {
        return this.transactionsManager.getBenefitsOnLastSell()
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

    hasNegativeAmount() {
        return this.amount < 0
    }

    hasAtLeastOneStockAtNegativeQuantity() {
        return this.stockContainerManager.hasStockWithNegativeQuantity()
    }

    hasSometingNotAllowed() {
        return this.hasNegativeAmount() || this.hasAtLeastOneStockAtNegativeQuantity()
    }

    /**
     * Remet le porte monnaie à sa valeur initiale, ainsi que le conteneur d'actions à vide
     */
    reset() {
        this.amount = this.baseAmount
        this.stockContainerManager.reset()
        this.transactionsManager.reset()
    }
}

module.exports = Wallet