class Calendar {
    constructor(days) {
        this.days = days
        this.currentDay = 0
        this.isMorning = true
    }

    /**
     * Si c'est le matin, passe à l'aprem
     * Si c'est l'aprem, incrémente le jour et passe au matin
     */
    nextDayTime() {
        if (this.isMorning) {
            this.isMorning = false
        } else {
            this.isMorning = true
            this.nextDay()
        }
    }

    nextDay() {
        this.currentDay++
        return this.days[this.currentDay]
    }

    getCurrentDay() {
        return this.days[this.currentDay]
    }

    getIsMorning() {
        return this.isMorning
    }

    reset() {
        this.currentDay = 0
        this.isMorning = true
    }
}

module.exports = Calendar