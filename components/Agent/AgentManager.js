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

        //console.log(`I'm in state ${state} and taking action ${action}`)
        //console.log(agent.brain.Q)
        const reward = agent.getCurrentReward(action)

        if (agent.actions[action] === "buy")
            agent.wallet.buyStock(agent.specificStockMarket.stock, 1)
            
        else if (agent.actions[action] === "sell")
            agent.wallet.sellStock(agent.specificStockMarket.stock, 1)

        if (debug) console.log(agent.actions[action])

        let newState = agent.getState()
        let newAction = agent.takeAction(0)

        agent.brain.update(state, action, newState, newAction, reward)
    }

    static applyTrainingDecision(agent, debug) {
        this.applyDecision(agent, 0.2, debug)
    }

    static applySeriousDecision(agent, debug) {
        this.applyDecision(agent, 0, debug)
    }
}

module.exports = AgentManager