const SpecificStockMarket = require("../Stock_Market/SpecificStockMarket")
const Wallet = require("../Wallet/wallet")
const Agent = require("./Agent")
const AgentManager = require("./AgentManager")

class TrainingManager {
    /**
     * @param {Number} nbAgents 
     * @param {SpecificStockMarket} specificStockMarket 
     */
    constructor(specificStockMarket) {
        this.baseWalletAmount = 200
        this.specificStockMarket = specificStockMarket
        this.agent = this.buildNoBrainAgent()
    }

    /**
     * Retourne un tableau d'une taille nbAgents constitué d'agents avec un cerveau par défaut
     * @param {Number} nbAgents 
     * @returns {Agent}
     */
    buildNoBrainAgent() {
        return new Agent(new Wallet(this.baseWalletAmount), this.specificStockMarket)
    }

    /**
     * @param {Boolean} seriousness 
     */
    processAgent(seriousness) {
        if (seriousness) AgentManager.applySeriousDecision(this.agent, false)
        else AgentManager.applyTrainingDecision(this.agent, false)
    }

    hardReset() {
        this.agent = this.buildNoBrainAgent()
    }

    resetAgent() {
        this.agent.reset()
    }
}

module.exports = TrainingManager