const SpecificStockMarket = require("../Stock_Market/SpecificStockMarket")
const Wallet = require("../Wallet/wallet")
const Brain = require("./brain")
const agentService = require("./StateService") 

class Agent {
    /**
     * 
     * @param {Wallet} wallet 
     * @param {SpecificStockMarket} ssm 
     */
    constructor(wallet, ssm) {
        this.wallet = wallet
        this.specificStockMarket = ssm
        this.actions = ["buy", "sell", "doNothing"]
        this.brain = new Brain(agentService.getNbStates(), this.actions.length)
        this.isDead = false
    }

    getState() {
        return agentService.calculateState(this.wallet, this.specificStockMarket.averageStockPrice, this.specificStockMarket.stock)
    }

    getCurrentReward(actionIndex) {
        const punishment = -1000
        // Punition en cas d'action impossible
        const isPossibleToSell = this.wallet.canSell(this.specificStockMarket.stock)
        const isPossibleToBuy = this.wallet.canAfford(this.specificStockMarket.stock)
        if (
            (this.actions[actionIndex] === "sell" && !isPossibleToSell) // Vente impossible
            || (this.actions[actionIndex] === "buy" && !isPossibleToBuy) // achat impossible
        ) 
        {
            //console.log(`Punishment, because trying illegal action. isPossibletoBuy = ${isPossibleToBuy}, the other = ${isPossibleToSell}`)
            //console.log(`wallet: ${this.wallet.amount}, quantity: ${this.wallet.stockContainerManager.stockContainers[0].quantity}`)
            this.isDead = true
            return punishment
        }

        // Reward au moment d'une vente
        if (this.actions[actionIndex] === "sell")
            return this.wallet.getBenefitsAcquiredOnLastSell()
        return 0
    }


    takeAction(eps) {
        if (this.isDead) return this.actions.length-1 // do nothing
        if (Math.random() < eps)
            return Math.floor(Math.random() * this.actions.length); // Action random (exploration)
        return this.brain.getArgMaxFromQatIndex(this.getState()) 
    }

    reset() {
        this.wallet.reset()
        this.isDead = false
    }
}

module.exports = Agent