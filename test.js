const Wallet = require("./components/Wallet/wallet")
const Stock = require("./components/Stock/stock")

let w = new Wallet(100)
console.log(w)


let IBM = new Stock("IBM", 51.05)
console.log(IBM)


w.buyStock(IBM, 1)
console.log(w)

IBM.price += 20

w.sellStock(IBM, 1)
console.log(w)

//Erreur:
//w.sellStock(IBM, 2)

//Erreur achat:
//w.buyStock(IBM, 10)