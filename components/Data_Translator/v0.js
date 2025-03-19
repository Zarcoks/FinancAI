const data = require("../../data/query.json")

class Data_Translator {
    constructor() {}

    static getIBMTable() {
        return data
    }
    
    static getDays(data) {
        return Object.keys(data).reverse()
    }
}

module.exports = Data_Translator