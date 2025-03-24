const EnvirronmentManager = require("./components/Envirronment/EnvirronmentManager")

const env = new EnvirronmentManager(2000)

env.loop(100000)
console.log(env.trainer.agent.brain.Q)
console.log(env.trainer.agent.wallet.transactionsManager.getStatistics())