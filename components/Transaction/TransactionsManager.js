const Transaction = require("./Transaction")
const Stock = require("../Stock/stock")

class TransactionsManager {
    constructor() {
        this.transactions = []
        this.nbBuys = 0
        this.nbSells = 0
    }

    /**
     * 
     * @param {Stock} stock 
     * @param {Number} quantity 
     */
    addTransaction(stock, quantity) {
        let transaction = new Transaction(stock, quantity)
        this.transactions.push(transaction)
        if (transaction.isBuyTransaction()) this.nbBuys++
        else this.nbSells++
    }

    /**
     * Renvoie la différence entre la dernière action vendue et l'achat de cette même action
     * 
     */
    getBenefitsOnLastSell() {
        let toIgnore = 0;
        let lastSell = undefined;
    
        for (let i = this.transactions.length - 1; i >= 0; i--) {
            let transaction = this.transactions[i];
    
            // Recherche de la dernière vente
            if (transaction.isSellTransaction() && lastSell === undefined) {
                lastSell = transaction;
                continue;
            }
    
            // Recherche de l'achat correspondant
            if (lastSell !== undefined) {
                if (transaction.isSellTransaction()) {
                    toIgnore++;
                } else {
                    if (toIgnore === 0) {
                        return lastSell.stock.price - transaction.stock.price;
                    } else {
                        toIgnore--;
                    }
                }
            }
        }
    
        return 0; // Si aucune vente n'a été trouvée
    }    

    getStatistics() {
        return {
            nbBuys: this.nbBuys,
            nbSells: this.nbSells,
            nbTotalTransactions: this.transactions.length
        }
    }

    reset() {
        this.transactions = []
        this.nbBuys = 0
        this.nbSells = 0
    }
}

module.exports = TransactionsManager