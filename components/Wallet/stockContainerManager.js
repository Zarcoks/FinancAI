const Stock = require("../Stock/stock")
const StockContainer = require("./stockContainer")

class StockContainerManager {
    constructor() {
        this.stockContainers = [] // Gère la quantité d'actions
    }

    getStockQuantity(stock) {
        let i = this.getStockIndex(stock)
        if (i < 0) return 0
        return this.stockContainers[i].quantity
    }

    getStockIndex(stock) {
        return this.stockContainers.findIndex((elt) => {
            return elt.stock.name === stock.name
        })
    }
    
    removeStockContainer(stockContainer) {
        this.stockContainers = this.stockContainers.filter((elt) => {
            return elt !== stockContainer
        })
    }

    /**
     * Augmente la quantité d'action ciblée de quantity dans le conteneur d'action
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    addStock(stock, quantity) {
        let i = this.getStockIndex(stock)
        if (i >= 0)
            // Ajouter les actions au porte monnaie
            this.stockContainers[i].quantity += quantity
        else 
            // Créer une unité de stockage de l'action
            this.stockContainers.push(new StockContainer(stock, quantity))
    }

    /**
     * Réduit la quantité d'action ciblée de quantity dans le conteneur d'action
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    removeStock(stock, quantity) {
        this.addStock(stock, -quantity)
    }

    getTotalStockAmount() {
        let total = 0
        this.stockContainers.forEach((elt) => {
            total += elt.stock.price * elt.quantity
        })
        return total
    }

    hasStock(stock) {
        let stockIndex = this.getStockIndex(stock)
        if (stockIndex < 0) return false
        if(this.stockContainers[stockIndex].quantity > 0) return true
        return false
    }

    reset() {
        this.stockContainers = []
    }

    /**
     * @returns {Boolean}
     */
    hasStockWithNegativeQuantity() {
        this.stockContainers.forEach(stockContainer => {
            if (stockContainer.quantity < 0) return true
        })
        return false
    }
}

module.exports = StockContainerManager