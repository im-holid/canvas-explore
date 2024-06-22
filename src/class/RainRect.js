import { wrapText } from "../helper/fontHelper";
import { Fps } from "./Fps";
import { WaterDropRect } from "./WaterDropRect";

export class RainRect {

    /**
     * 
     * @param {Object} options
     * @param {CanvasRenderingContext2D} options.ctx
     * @param {number} options.areaWidth
     * @param {number} options.areaHeight
     * @param {string|CanvasGradient|CanvasPattern} options.color
     */
    constructor({ ctx, areaWidth = null, areaHeight = null, color = '#ffffff' }) {
        this.ctx = ctx;
        this.areaWidth = areaWidth
        this.areaHeight = areaHeight
        this.color = color
        this.total = 400
        /** @type {WaterDropRect[]} */
        this.dropWaters = []
        this.fps = new Fps()
        this.#generate()
    }

    #generate() {
        for (let i = 0; i < this.total; i++) {
            this.dropWaters.push(new WaterDropRect({ ctx: this.ctx, areaHeight: this.areaHeight, areaWidth: this.areaWidth, color: this.color }))
        }
    }

    #drawFps() {
        this.fps.calculate()
        const ctx = this.ctx
        const size = 20
        const text = `${this.fps.value} FPS`
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'center'
        ctx.font = `${size}px Minecraft`
        ctx.fillText(text, ctx.canvas.width - 50, 30)
        ctx.closePath()
    }

    draw() {
        for (let i = 0; i < this.dropWaters.length; i++) {
            const dropWater = this.dropWaters[i]
            dropWater.animate()
        }
        this.#drawFps()
    }
}