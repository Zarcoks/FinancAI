class WalletCommonSenseManager {
    static canSellStock(nbStockInWallet, quantity) {
        return nbStockInWallet >= quantity
    }

    static canBuyStock(stock, quantity, amount) {
        return amount >= stock.price * quantity
    }
}

module.exports = WalletCommonSenseManager