export class Fps {
    constructor() {
        this.totalIterations = 0
        this.then = Date.now()
        this.value = 0
    }

    calculate() {
        this.totalIterations++
        const now = Date.now()
        const ellapsedTime = now - this.then
        if (ellapsedTime >= 500) {
            this.value = (this.totalIterations * 1000 / ellapsedTime).toFixed(1)
            this.totalIterations = 0
            this.then = now
        }
    }

}