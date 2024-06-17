import { interpolateNumber, minMaxRandom } from "../helper/common";

export class UglyStar {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
    this.radius = 5;
    this.x = minMaxRandom({ min: this.radius, max: ctx.canvas.width - this.radius });
    this.y = minMaxRandom({ min: this.radius, max: ctx.canvas.height - this.radius });
    this.z = Math.random() * ctx.canvas.width;
    this.line = this.z;
  }

  update() {
    const ctx = this.ctx;
    this.line = this.z;
    this.z -= 20;
    if (this.z < 1) {
      this.z = ctx.canvas.width;
      this.x = minMaxRandom({ min: this.radius, max: ctx.canvas.width - this.radius });
      this.y = minMaxRandom({ min: this.radius, max: ctx.canvas.height - this.radius });
      this.line = this.z;
    }
  }

  tail(sx, sy) {
    const ctx = this.ctx;
    const tx = interpolateNumber((this.x - ctx.canvas.width / 2) / this.line, 0, 1, ctx.canvas.width / 2, ctx.canvas.width);
    const ty = interpolateNumber((this.y - ctx.canvas.height / 2) / this.line, 0, 1, ctx.canvas.height / 2, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.closePath();
  }

  show() {
    const ctx = this.ctx;
    const sx = interpolateNumber((this.x - ctx.canvas.width / 2) / this.z, 0, 1, ctx.canvas.width / 2, ctx.canvas.width);
    const sy = interpolateNumber((this.y - ctx.canvas.height / 2) / this.z, 0, 1, ctx.canvas.height / 2, ctx.canvas.height);
    const size = ((ctx.canvas.width - this.z) / ctx.canvas.width) * this.radius;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.tail(sx, sy);
  }
}
