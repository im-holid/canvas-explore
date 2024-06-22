export class Square {
    /**
     * 
     * @param {number} size 
     * @param {number} x 
     * @param {number} y 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} color
     */
    constructor(size, x, y, ctx, color = '#fff') {
        this.size = size
        this.x = x
        this.y = y
        this.ctx = ctx
        this.color = color
    }

    draw() {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.rect(this.x, this.y, this.size, this.size)
        ctx.fill()
        ctx.closePath()
    }
}