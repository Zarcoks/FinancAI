const Wallet = require("./components/Wallet/wallet")
const Stock = require("./components/Stock/stock")
const SpecificStockMarket = require("./components/Stock_Market/SpecificStockMarket")
const DataTranslator = require("./components/Data_Translator/v0")
const Calendar = require("./components/Calendar/calendar")
const Agent = require("./components/Agent/Agent")
const AgentManager = require("./components/Agent/AgentManager")

const data = DataTranslator.getIBMTable()
//console.log(DataTranslator.getDays(data))

const days = DataTranslator.getDays(data)

const calendar = new Calendar(days)
const ssm = new SpecificStockMarket("IBM", data, calendar.getCurrentDay())


const agents = []
for (let k = 0; k<=100; k++) {
    agents.push(new Agent(new Wallet(200), ssm))
}

// Training:
for (let i = 0; i<days.length-1; i++) {
    //console.log(`Day ${calendar.getCurrentDay()}, in the ${calendar.getIsMorning() ? "morning" : "afternoon"}, price = ${ssm.getCurrentStockPrice()}, average: ${ssm.averageStockPrice}`)
    //console.log(agent1.wallet.stockContainerManager.stockContainers[0])
    processAgents(agents)
    calendar.nextDayTime()
    ssm.update(calendar.getCurrentDay(), calendar.getIsMorning())
}

printBestAgentData(agents)

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
/**
 * 
 * @param {[]} agents 
 */
function processAgents(agents) {
    agents.forEach((agent) => {
        AgentManager.applyTrainingDecision(agent, false)
    })
}

function printBestAgentData(agents) {
    let bestScore = agents[0].wallet.getTotalAmount()
    let bestAgent = agents[0]
    let averageWallet = 0
    let totalSeen = 0
    agents.forEach((agent) => {
        if (agent.wallet.getTotalAmount() > bestScore) {
            bestScore = agent.wallet.getTotalAmount()
            bestAgent = agent
        }   
        averageWallet = (averageWallet * totalSeen + agent.wallet.getTotalAmount()) / (totalSeen+1)
        totalSeen++
    })
    console.log(`The average wallet at the end is ${averageWallet}`)
    console.log("The datas of the best agent")
    console.log(`Hey ! My wallet is currently at: ${bestAgent.wallet.amount}, totalling: ${bestAgent.wallet.getTotalAmount()}`)
    console.log(`The agent state is ${bestAgent.getState()}`)
    console.log(bestAgent.brain.Q)
}

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

