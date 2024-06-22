import { interpolateNumber, minMaxRandom } from "../helper/common";
import { GRAVITY } from "../helper/constant";

export class WaterDropRect {

  BASE_WIDTH = 2
  BASE_HEIGHT = 30
  BASE_SPEED = 5

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
    this.areaHeight = ctx.canvas.height
    this.areaWidth = ctx.canvas.width
    this.baseColor = color
    this.x
    this.y
    this.z
    this.width
    this.height = 0
    this.reverseHeight
    this.minHeight = 5
    this.maxHeight
    this.speed
    this.color
    this.impactArea
    this.#generateData()
    this.rippleRadius
    this.rippleWidth
    if (areaHeight) this.areaHeight = areaHeight
    if (areaWidth) this.areaWidth = areaWidth
  }

  #generateData() {
    this.x = minMaxRandom({ min: 0, max: this.areaWidth });
    this.y = minMaxRandom({ min: 0, max: this.areaHeight });
    this.z = minMaxRandom({ min: 0, max: this.areaWidth });
    this.width = interpolateNumber(this.z, 0, this.areaWidth, this.BASE_WIDTH * 0.5, this.BASE_WIDTH * 2)
    this.maxHeight = interpolateNumber(this.z, 0, this.areaWidth, this.BASE_HEIGHT * 0.5, this.BASE_HEIGHT * 2)
    this.speed = interpolateNumber(this.z, 0, this.areaWidth, this.BASE_SPEED * 0.5, this.BASE_SPEED)
    const alpha = parseInt(interpolateNumber(this.z, 0, this.areaWidth, 100, 255).toFixed(0))
    this.color = `${this.baseColor}${alpha.toString(16)}`
    this.height = 0
    this.reverseHeight = 0
    this.impactArea = (this.z / this.areaWidth) * (this.areaHeight - this.areaHeight * 0.5) + this.areaHeight * 0.5
    this.rippleRadius = 0
    this.rippleWidth = interpolateNumber(this.z, 0, this.areaWidth, 0, 10)
  }

  ripple() {
    if (this.rippleRadius < 0) return
    const ctx = this.ctx
    ctx.beginPath()
    const width = this.rippleWidth - (this.rippleWidth * (this.rippleRadius / this.maxHeight))
    ctx.lineWidth = width
    ctx.strokeStyle = this.color
    ctx.ellipse(this.x, this.impactArea, this.rippleRadius, this.rippleRadius * 0.5, 0, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
    this.rippleRadius += interpolateNumber(this.z, 0, this.areaWidth, 0.1, 2)
    if (this.rippleRadius >= this.maxHeight) {
      this.#generateData()
      this.y = -this.height;
    }
  }

  update() {
    this.height = ((this.y / this.areaHeight) * (this.maxHeight - this.minHeight) + this.minHeight)
    this.y += this.speed
    this.speed += GRAVITY
  }

  respawn() {
    if (this.y + this.height >= this.impactArea) {
      this.reverseHeight = this.height - (this.impactArea - this.y)

      if (this.reverseHeight >= this.height) {
        this.ripple()
        this.reverseHeight = this.height
      }
    }
  }

  draw() {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.rect(this.x, this.y, this.width - this.width * (this.y / this.areaHeight), this.height - this.reverseHeight)
    ctx.fill()
    ctx.closePath()
  }

  animate() {
    this.draw()
    this.update()
    this.respawn()
  }

}
