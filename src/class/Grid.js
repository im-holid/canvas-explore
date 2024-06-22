export class Grid {
    /**
     * 
     * @param {number} size 
     * @param {CanvasRenderingContext2D} ctx 
     */
    constructor(size, ctx) {
        this.size = size
        this.ctx = ctx
    }

    draw() {
        const ctx = this.ctx
        ctx.strokeStyle = '#fff'
        // vertical
        for (let i = 0; i <= ctx.canvas.width;) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, ctx.canvas.height - ctx.canvas.height % this.size)
            ctx.stroke()
            ctx.closePath()
            i += this.size
        }
        // horizontal
        for (let i = 0; i <= ctx.canvas.height;) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(ctx.canvas.width - ctx.canvas.width % this.size, i)
            ctx.stroke()
            ctx.closePath()
            i += this.size
        }

    }

}
