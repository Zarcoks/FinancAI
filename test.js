const EnvirronmentManager = require("./components/Envirronment/EnvirronmentManager")

const env = new EnvirronmentManager(1)

env.loop(1000, true)
console.log(env.population.agents[0].brain.Q)