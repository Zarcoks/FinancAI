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
     * 
     * @param {Boolean} seriousness définit si les agents explorent (false) ou n'explorent pas (true)
     * @param {Boolean} printGenerationData 
     */
    start(seriousness, printGenerationData) {
        for (let i = 0; i<this.nbElements-1; i++) {
            this.population.processAgents(seriousness)
            this.calendar.nextDayTime()
            this.specificStockMarket.update(this.calendar.getCurrentDay(), this.calendar.getIsMorning())
        }
        if (printGenerationData) {
            let bestAg = this.population.getBestAgent()
            console.log(`Generation ${bestAg.generation}, best score: ${bestAg.wallet.getTotalAmount()}`)
            this.population.printTopRanking(3)
        }
    }

    /**
     * Remet l'envirronnement au premier jour connu, mais reconstruit la population sur l'ancienne
     */
    resetEnvironment() {
        this.calendar.reset()
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
     * @param {Number} nbTimes 
     * @param {Boolean} printGenerationData
     */
    loop(nbTimes, printGenerationData=false) {
        for (let i = 0; i<nbTimes; i++) {
            // Training
            this.start(false, false)
            this.resetEnvironment()

            // Evaluation
            this.start(true, printGenerationData)
            this.resetEnvironment()
            this.population.buildNextGeneration()
        }
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