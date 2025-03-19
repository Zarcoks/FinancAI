const Agent = require("./Agent");

class AgentManager {
    /**
     * Prend en paramètre un agent, prend son action et l'applique sur son envirronnement, puis met à jour
     * le cerveau de l'agent
     * @param {Agent} agent 
     */
    static applyDecision(agent, eps, debug) {
        let state = agent.getState()
        let action = agent.takeAction(eps)

        if (agent.actions[action] === "buy") {
            if (!agent.wallet.canAfford(agent.specificStockMarket.stock)) {
                action = agent.actions.indexOf("doNothing")
            }
            else agent.wallet.buyStock(agent.specificStockMarket.stock, 1)
        }
        else if (agent.actions[action] === "sell") {
            if (!agent.wallet.canSell(agent.specificStockMarket.stock)) {
                action = agent.actions.indexOf("doNothing")
            }
            else agent.wallet.sellStock(agent.specificStockMarket.stock, 1)
        }
        else if (agent.actions[action] === "sellAndBuy") {
            if (!agent.wallet.canSell(agent.specificStockMarket.stock)
             || !agent.wallet.canAfford(agent.specificStockMarket.stock)) {
                action = agent.actions.indexOf("doNothing")
            }
            else {
                agent.wallet.sellStock(agent.specificStockMarket.stock, 1)
                agent.wallet.buyStock(agent.specificStockMarket.stock, 1)
            }
        }

        if (debug) console.log(agent.actions[action])

        let newState = agent.getState()
        let newAction = agent.takeAction(0)

        agent.brain.update(state, action, newState, newAction, agent.getCurrentReward())
    }

    static applyTrainingDecision(agent, debug) {
        this.applyDecision(agent, 0.4, debug)
    }

    static applySeriousDecision(agent, debug) {
        this.applyDecision(agent, 0, debug)
    }
}

module.exports = AgentManager