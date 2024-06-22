export class Rect {
    /**
     * @param {number} height
     * @param {number} width
     * @param {number} x 
     * @param {number} y 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string|CanvasGradient|CanvasPattern} style
     */
    constructor(x, y, width, height, ctx, style = '#fff') {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.ctx = ctx
        this.style = style
    }

    draw() {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.closePath()
    }
}