const Wallet = require("../Wallet/wallet");

class StateService {
    /**
     * @param {Wallet} wallet 
     * @param {Number} price 
     */
    static calculateState(wallet, averagePrice, stock) {
        /**
         * States:
         * Can afford AND can sell:
         * 0 The stock is under 95% of the average price
         * 1 The stock is arround +-5% of the average price
         * 2 The stock is upper 105% of the average price
         * 
         * Can ONLY afford
         * 3: The stock is under 95% of the average price
         * 4: The stock is arround +-5% of the average price
         * 5: The stock is upper 105% of the average price
         * 
         * Can ONLY sell
         * 6: The stock is under 95% of the average price
         * 7: The stock is arround +-5% of the average price
         * 8: The stock is upper 105% of the average price
         * 
         * 9: Cannot do nothing
         */
        if (wallet.canAfford(stock) && wallet.canSell(stock)) {
            if (stock.price < averagePrice*0.98) return 0
            if (stock.price > averagePrice*1.02) return 2
            return 1
        }
        else if (wallet.canAfford(stock)) {
            if (stock.price < averagePrice*0.98) return 3
            if (stock.price > averagePrice*1.02) return 5
            return 4
        } 
        else if (wallet.canSell(stock)) {
            if (stock.price < averagePrice*0.98) return 6
            if (stock.price > averagePrice*1.02) return 8
            return 7
        }
        return 9
    }

    static getNbStates() {
        return 10
    }
}


module.exports = StateService