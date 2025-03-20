const DataTranslator = require("../Data_Translator/v0")
const Calendar = require("../Calendar/calendar")
const SpecificStockMarket = require("../Stock_Market/SpecificStockMarket")
const TrainingManager = require("../Agent/TrainingManager")

class EnvirronmentManager {
    constructor(nbPopulation) {
        this.data = DataTranslator.getIBMTable()
        this.nbElements = DataTranslator.getDays(this.data).length
        this.calendar = new Calendar(DataTranslator.getDays(this.data))
        this.specificStockMarket = new SpecificStockMarket("IBM", this.data, this.calendar.getCurrentDay())
        this.population = new TrainingManager(nbPopulation, this.specificStockMarket)
    }

    /**
     * Lance une session de 20 ans sur l'investissement
     * @param {Boolean} seriousness définit si les agents explorent (false) ou n'explorent pas (true)
     * @param {Boolean} printGenerationData 
     */
    start(seriousness, printGenerationData) {
        this.resetEnvironment()
        this.population.resetAgents() // Reset le porte monnaie des agents 
        for (let i = 0; i<this.nbElements-1; i++) {
            this.population.processAgents(seriousness)
            this.calendar.nextDayTime()
            this.specificStockMarket.update(this.calendar.getCurrentDay(), this.calendar.getIsMorning())
        }
        if (printGenerationData) {
            let bestAg = this.population.getBestAgent()
            console.log("########################\nFinished 20 years daily training\n########################")
            console.log(`Generation ${bestAg.generation}, best score: ${bestAg.wallet.getTotalAmount()}\n`)
            //this.population.printTopRanking(3)
        }
    }

    /**
     * Remet l'envirronnement au premier jour connu, mais reconstruit la population sur l'ancienne
     */
    resetEnvironment() {
        this.calendar.reset()
        this.population.resetAgents()
        this.specificStockMarket.reset(this.calendar.getCurrentDay())
    }

    /**
     * Reset l'envirronnement et la population en oubliant totalement le précédent entraînement
     */
    hardReset() {
        this.calendar.reset()
        this.specificStockMarket.reset(this.calendar.getCurrentDay())
        this.population.hardReset()
    }

    /**
     * Lance un entrainement de n * 20 ans d'évolution boursier
     * A chaque 20 ans, lance un examen sur l'agent en le faisant investir sur des choix sans exploration
     * L'examen est lui aussi sur une session de 20 ans
     * @param {Number} nbTimes 
     * @param {Boolean} printGenerationData
     */
    loop(nbTimes, exam=false) {
        for (let i = 0; i<nbTimes; i++) {
            // Training
            this.start(false, false)

            if (exam) {
                this.startSeriousSession()
            }
        }
    }

    startSeriousSession() {
        this.start(true, true)
    }

    /**
     * 
     * @returns {TrainingManager}
     */
    getTrainingManager() {
        return this.population
    }
}

module.exports = EnvirronmentManager