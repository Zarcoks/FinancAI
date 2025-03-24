const Wallet = require("../Wallet/wallet");

class StateService {
    /**
     * @param {Wallet} wallet 
     * @param {Number} price 
     */
    static calculateState(wallet, averagePrice, stock) {
        const x = 0.05 // Modifie la vision des variations
        /**
         * States:
         * ###############################################
         * #/////////////////////# < x % # ~ x % # > x % #
         * ###############################################
         * # Can Afford AND Sell #   0   #   1   #   2   #
         * ###############################################
         * # Can Afford ONLY     #   3   #   4   #   5   #
         * ###############################################
         * # Can Sell ONLY       #   6   #   7   #   8   #
         * ###############################################
         * #            9: Cannot do nothing             #
         * ###############################################
         * 
         * 
         */
        if (wallet.canAfford(stock) && wallet.canSell(stock)) {
            if (stock.price < averagePrice*(1-x)) return 0
            if (stock.price > averagePrice*(1+x)) return 2
            return 1
        }
        else if (wallet.canAfford(stock)) {
            if (stock.price < averagePrice*(1-x)) return 3
            if (stock.price > averagePrice*(1+x)) return 5
            return 4
        } 
        else if (wallet.canSell(stock)) {
            if (stock.price < averagePrice*(1-x)) return 6
            if (stock.price > averagePrice*(1+x)) return 8
            return 7
        }
        return 9
    }

    static getNbStates() {
        return 10
    }
}


module.exports = StateService