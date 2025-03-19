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
        this.actions = ["buy", "sell", "sellAndBuy", "doNothing"]
        this.brain = new Brain(agentService.getNbStates(), this.actions.length)
        this.generation = 0
    }

    getState() {
        return agentService.calculateState(this.wallet, this.specificStockMarket.averageStockPrice, this.specificStockMarket.stock)
    }

    getCurrentReward() {
        return this.wallet.getBenefitsAcquired()
    }

    /**
     * 
     * @param {Agent} agent 
     */
    copyBrain(agent) {
        this.brain.resetCopy(agent.brain)
    }

    /**
     * 
     * @param {Agent} agent 
     */
    evolve(agent) {
        this.reset() // Reset du wallet
        this.copyBrain(agent) // Nouveau cerveau
        this.generation+=1
    }

    /**
     * Ajoute ou enlève les actions sell et buy en fonction de si l'IA peut ou pas y procéder
     * Non appréciée car l'index des actions change
     */
    updateActions() {
        if (!this.wallet.canAfford(this.specificStockMarket.stock)) {
            this.actions = this.actions.filter((elt) => elt !== "buy")
        }
        else {
            if (this.actions.indexOf("buy") < 0)
                this.actions.push("buy")
        }
        if (!this.wallet.canSell(this.specificStockMarket.stock)) {
            this.actions = this.actions.filter((elt) => elt !== "sell")
        }
        else {
            if (this.actions.indexOf("sell") < 0)
                this.actions.push("sell")
        }
    }

    takeAction(eps) {
        //this.updateActions()
        if (Math.random() < eps)
            return Math.floor(Math.random() * this.actions.length); // 0, 1 ou 2 random
        return this.brain.getArgMaxFromQatIndex(this.getState()) 
    }

    reset() {
        this.wallet.reset()
    }
}

module.exports = Agent