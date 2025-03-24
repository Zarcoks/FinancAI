const DataTranslator = require("../Data_Translator/v0")
const Calendar = require("../Calendar/calendar")
const SpecificStockMarket = require("../Stock_Market/SpecificStockMarket")
const TrainingManager = require("../Agent/TrainingManager")

class EnvirronmentManager {
    constructor(agentBaseWalletAmount) {
        this.data = DataTranslator.getIBMTable()
        this.nbElements = DataTranslator.getDays(this.data).length
        this.calendar = new Calendar(DataTranslator.getDays(this.data))
        this.specificStockMarket = new SpecificStockMarket("IBM", this.data, this.calendar.getCurrentDay())
        this.trainer = new TrainingManager(this.specificStockMarket, agentBaseWalletAmount)
    }

    /**
     * Lance une session de 20 ans sur l'investissement
     * @param {Boolean} seriousness définit si l'agent explore (false) ou n'explore pas (true)
     * @param {Boolean} printGenerationData 
     */
    start(seriousness, printGenerationData) {
        this.resetEnvironment()
        this.trainer.resetAgent() // Reset le porte monnaie de l'agent
        for (let i = 0; i<this.nbElements-1; i++) {
            if (this.trainer.agent.isDead) i = this.nbElements
            this.trainer.processAgent(seriousness)
            this.calendar.nextDayTime()
            this.specificStockMarket.update(this.calendar.getCurrentDay(), this.calendar.getIsMorning())
        }
        if (printGenerationData) {
            console.log("########################\nFinished 20 years daily training\n########################")
            console.log(`Score of the agent: ${this.trainer.agent.wallet.getTotalAmount()}, wallet: ${this.trainer.agent.wallet.amount}, totalStockAmount: ${this.trainer.agent.wallet.stockContainerManager.getTotalStockAmount()}\n`)
        }
    }

    /**
     * Remet l'envirronnement au premier jour connu, mais reconstruit la trainer sur l'ancienne
     */
    resetEnvironment() {
        this.calendar.reset()
        this.trainer.resetAgent()
        this.specificStockMarket.reset(this.calendar.getCurrentDay())
    }

    /**
     * Reset l'envirronnement et la trainer en oubliant totalement le précédent entraînement
     */
    hardReset() {
        this.calendar.reset()
        this.specificStockMarket.reset(this.calendar.getCurrentDay())
        this.trainer.hardReset()
    }

    /**
     * Lance un entrainement de n * 20 ans d'évolution boursier
     * A chaque 20 ans, lance un examen sur l'agent en le faisant investir sur des choix sans exploration
     * L'examen est lui aussi sur une session de 20 ans
     * @param {Number} nbTimes 
     * @param {Number} exam
     */
    loop(nbTimes, exam=0) {
        for (let i = 0; i<nbTimes; i++) {
            // Training
            this.start(false, false)

            if (exam > 0 && i%exam === 0) {
                this.startSeriousSession()
            }
        }
        this.startSeriousSession() // Final exam
    }

    startSeriousSession() {
        this.start(true, true)
    }

    /**
     * 
     * @returns {TrainingManager}
     */
    getTrainingManager() {
        return this.trainer
    }
}

module.exports = EnvirronmentManager