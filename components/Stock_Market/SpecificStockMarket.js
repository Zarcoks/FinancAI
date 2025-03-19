const Stock = require("../Stock/stock")

class SpecificStockMarket {
    constructor(stockName, data, currentDay) {
        this.stockName = stockName
        this.stockHistory = data
        this.stock = new Stock(stockName, this.getOpenPrice(currentDay))
        this.averageStockPrice = this.stock.price
        this.nbTimesOfCalculatingAv = 1
    }

    getPrice(day, isMorning) {
        if (isMorning) return this.getOpenPrice(day)
        return this.getClosePrice(day)
    }

    getOpenPrice(day) {
        return parseFloat(this.stockHistory[day]["1. open"])
    }

    getClosePrice(day) {
        return parseFloat(this.stockHistory[day]["4. close"])
    }

    update(day, isMorning) {
        this.stock.price = this.getPrice(day, isMorning)
        this.averageStockPrice = (this.averageStockPrice * this.nbTimesOfCalculatingAv+this.stock.price) / (this.nbTimesOfCalculatingAv+1)
        this.nbTimesOfCalculatingAv++
    }

    getCurrentStockPrice() {
        return this.stock.price
    }

    reset(currentDay) {
        this.stock = new Stock(this.stockName, this.getOpenPrice(currentDay))
        this.averageStockPrice = this.stock.price
        this.nbTimesOfCalculatingAv = 1
    }
}

module.exports = SpecificStockMarket