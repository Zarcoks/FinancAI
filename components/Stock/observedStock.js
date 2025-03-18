class ObservedStock extends Stock {
    constructor(name, price) {
        super(name, price)
        this.nbSeen = 1
        this.averageSeenPrice = price
    }

    addValue(price) {
        // nouvelle moyenne = (ancienne * nbAncienne + nouvelle) / (nbAncienne+1)
        this.averageSeenPrice = (this.averageSeenPrice * this.nbSeen + price) / (this.nbSeen+1)
        this.nbSeen++
    }
}