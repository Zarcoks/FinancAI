const EnvirronmentManager = require("./components/Envirronment/EnvirronmentManager")

const env = new EnvirronmentManager(100)

env.loop(100, true)