const StockUniqueStorage = require("./stockUniqueStorage")
const Stock = require("../Stock/stock")

class Wallet {
    /**
     * 
     * @param {Number} baseAmount 
     */
    constructor(baseAmount) {
        this.baseAmount = baseAmount
        this.amount = baseAmount
        this.stockWallet = []
    }

    /**
     * Ajoute l'action au porte monnaie et retire l'argent lié à l'achat
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    buyStock(stock, quantity) {
        // Cherche si l'action est déjà dans le porte monnaie
        let i = this.stockWallet.findIndex((elt) => {
            return elt.stock.name === stock.name
        })

        if (i >= 0)
            // Ajouter les actions au porte monnaie
            this.stockWallet[i].addValue(quantity)
        else 
            // Créer une unité de stockage de l'action
            this.stockWallet.push(new StockUniqueStorage(stock, quantity))
        
        // Procéder à l'achat
        this.amount -= stock.price * quantity
    }

    sellStock(stock, quantity) {
        // Cherche si l'action dans le porte monnaie
        let i = this.stockWallet.findIndex((elt) => {
            return elt.stock.name === stock.name
        })

        // Action non présente dans le portefeuille
        if (i === -1) 
            throw new Error("You cannot sell this stock because you don't own any.")

        let newStockQuantity = this.stockWallet[i].quantity - quantity

        // Tentative de vente supérieur à la quantité possédée
        if (newStockQuantity < 0)
            throw new Error("You cannot sell this stock because you don't own enough")

        // Procédure
        this.amount += stock.price * quantity
        this.stockWallet[i].quantity = newStockQuantity
    }
}

module.exports = Wallet