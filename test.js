const Wallet = require("./components/Wallet/wallet")
const Stock = require("./components/Stock/stock")
const SpecificStockMarket = require("./components/Stock_Market/SpecificStockMarket")
const DataTranslator = require("./components/Data_Translator/v0")
const Calendar = require("./components/Calendar/calendar")
const Agent = require("./components/Agent/Agent")
const AgentManager = require("./components/Agent/AgentManager")

const data = DataTranslator.getIBMTable()
//console.log(DataTranslator.getDays(data))

const calendar = new Calendar(DataTranslator.getDays(data))
const ssm = new SpecificStockMarket("IBM", data, calendar.getCurrentDay())


const agent1 = new Agent(new Wallet(200), ssm)

// Training:
for (let i = 0; i<10000; i++) {
    //console.log(`Day ${calendar.getCurrentDay()}, in the ${calendar.getIsMorning() ? "morning" : "afternoon"}, price = ${ssm.getCurrentStockPrice()}, average: ${ssm.averageStockPrice}`)
    if (i%1000 == 0) {
        console.log(`Hey ! My wallet is currently at: ${agent1.wallet.amount}, totalling: ${agent1.wallet.getTotalAmount()}`)
        console.log(`The agent state is ${agent1.getState()}`)
        console.log(agent1.brain.Q)
    }
    //console.log(agent1.wallet.stockContainerManager.stockContainers[0])
    AgentManager.applyTrainingDecision(agent1, false)
    calendar.nextDayTime()
    ssm.update(calendar.getCurrentDay(), calendar.getIsMorning())
}

/*
agent1.wallet = new Wallet(200)
for (let i = 0; i<100; i++) {
    AgentManager.applySeriousDecision(agent1)
    calendar.nextDayTime()
    ssm.update(calendar.getCurrentDay(), calendar.getIsMorning())
}
console.log(`The Agent wallet at the end is ${agent1.wallet.getTotalAmount()}`)
console.log(agent1.brain.Q)
*/

//let w = new Wallet(100)
//console.log(w)


//let IBM = new Stock("IBM", 51.05)
//console.log(IBM)
//
//
//w.buyStock(IBM, 1)
//console.log(w)
//
//IBM.price += 20

//w.sellStock(IBM, 1)
//console.log(w)

//console.log(w.getTotalAmount())

//Erreur:
//w.sellStock(IBM, 2)

//Erreur achat:
//w.buyStock(IBM, 10)

