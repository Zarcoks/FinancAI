const SpecificStockMarket = require("../Stock_Market/SpecificStockMarket")
const Wallet = require("../Wallet/wallet")
const Agent = require("./Agent")
const AgentManager = require("./AgentManager")

class TrainingManager {
    /**
     * @param {Number} nbAgents 
     * @param {SpecificStockMarket} specificStockMarket 
     */
    constructor(nbAgents, specificStockMarket) {
        this.baseWalletAmount = 200
        this.nbAgents = nbAgents
        this.specificStockMarket = specificStockMarket
        this.agents = this.buildNoBrainAgents(this.nbAgents)
        this.bestAgentOfHistory = {...this.agents[0]}
    }

    /**
     * Retourne un tableau d'une taille nbAgents constitué d'agents avec un cerveau par défaut
     * @param {Number} nbAgents 
     * @returns {Array}
     */
    buildNoBrainAgents(nbAgents) {
        const agentsTab = []
        for (let k = 0; k<nbAgents; k++) {
            agentsTab.push(new Agent(new Wallet(this.baseWalletAmount), this.specificStockMarket))
        }
        return agentsTab
    }

    /**
     * Retourne l'agent avec le meilleur wallet
     * @returns {Agent}
     */
    getBestAgent() {
        let bestAgent = this.agents[0]
        this.agents.forEach((agent) => {
            if (agent.wallet.getTotalAmount() > bestAgent.wallet.getTotalAmount()) {
                bestAgent = agent
            }   
        })
        return bestAgent
    }

    /**
     * Retourne le tableau des agents trié par classement du pire au meilleur agent 
     * @returns {Array}
     */
    getRanking() {
        const rankedTab = [...this.agents]
        rankedTab.sort((ag1, ag2) => {
            let scoreAg1 = ag1.wallet.getTotalAmount()
            let scoreAg2 = ag2.wallet.getTotalAmount()
            return scoreAg1 - scoreAg2
        })
        return rankedTab
    }

    /**
     * Retourne la moyenne des scores des agents
     * @returns {Number}
     */
    getAverageWallet() {
        let av = 0
        let totalSeen = 0
        agents.forEach((agent) => {
            av = (av * totalSeen + agent.wallet.getTotalAmount()) / (totalSeen+1)
            totalSeen++
        })
        return av
    }

    buildNextGeneration() {
        const bestAgent = {...this.getBestAgent()}
        this.updateBestAgentOfAllTime(bestAgent)

        this.rebuildAgentsOn(this.bestAgentOfHistory)
    }

    /**
     * Reconstruit une population d'agent basé sur le cerveau du meilleur
     */
    rebuildAgentsOn(bestAgent) {
        for (let k = 0; k<this.nbAgents; k++) {
            this.agents[k].evolve(bestAgent)
        }
    }

    /**
     * 
     * @param {Agent} bestGenerationAgent 
     */
    updateBestAgentOfAllTime(bestGenerationAgent) {
        if (bestGenerationAgent.wallet.getTotalAmount() >= this.bestAgentOfHistory.wallet.getTotalAmount()){
            this.bestAgentOfHistory = {...bestGenerationAgent}
        }
    }

    /**
     * @param {Boolean} seriousness 
     */
    processAgents(seriousness) {
        this.agents.forEach((agent) => {
            if (seriousness) AgentManager.applySeriousDecision(agent, false)
            else AgentManager.applyTrainingDecision(agent, false)
        })
    }

    hardReset() {
        this.agents = this.buildNoBrainAgents()
    }

    printTopRanking(nbAgents) {
        let ranking = this.getRanking()
        let nbLogicRanking = Math.min(nbAgents, ranking.length)
        for (let i = 0; i<nbLogicRanking; i++) {
            console.log(`Top ${i+1}: wallet = ${ranking[ranking.length-1-i].wallet.getTotalAmount()}`)
        }
    }
}

module.exports = TrainingManager