class Brain {
    constructor(nbStates, nbActions) {
        this.Q = this.buildZeroMatrix(nbStates, nbActions)
    }

    /**
     * 
     * @param {Brain} brain 
     */
    resetCopy(brain) {
        this.Q = [...brain.Q]
    }

    buildZeroMatrix(height, width) {
        return Array.from({ length: height }, () => new Array(width).fill(0));
    }

    getFromQ(i, j) {
        return this.Q[i][j]
    }

    update(state, action, newState, newAction, reward) {
        this.Q[state][action] = this.Q[state][action] + 0.1*(reward + 0.9*this.Q[newState][newAction] - this.Q[state][action])
    }

    getArgMaxFromQatIndex(i) {
        let maxIndex = 0;
        for (let k = 1; k < this.Q[i].length; k++) {
            if (this.Q[i][k] > this.Q[i][maxIndex]) {
                maxIndex = k;
            }
        }
        return maxIndex;
    }
}

module.exports = Brain