import { FRICTION, GRAVITY } from "../helper/constant";

export class Circle {
  /**
   * Creates a new Circle object.
   *
   * @param {Object} options - An object containing the following properties:
   * @param {number} options.radius - The radius of the circle. Defaults to 10.
   * @param {string | CanvasGradient | CanvasPattern} options.color - The color of the circle (CSS color string). Defaults to '#000' (black).
   * @param {number} [options.x] - The x-coordinate of the circle's center. If not provided, a random value within the canvas width is used.
   * @param {number} [options.y] - The y-coordinate of the circle's center. If not provided, a random value within the canvas height is used.
   * @param {number} options.speed - The speed of circle per cycle
   * @param {number} options.angle - The angle cycle in degree
   * @param {CanvasRenderingContext2D} options.ctx
   * @param {string|number} options.name
   * @param {number} options.mass - The mass of the circle
   */
  constructor({
    ctx,
    radius = 10,
    color = "#000",
    x = 0 + radius,
    y = 0 + radius,
    speed = 0,
    angle = 0,
    name,
    mass = 1,
  } = {}) {
    this.ctx = ctx;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
    this.radian = (angle * Math.PI) / 180;
    this.speed = speed;
    this.dx = Math.cos(this.radian) * this.speed;
    this.dy = Math.sin(this.radian) * this.speed;
    this.name = name;
    this.mass = mass;
  }

  /**
   * apply gravity to velocity Y
   */
  #applyGravity() {
    this.dy += GRAVITY;
  }

  #applyFriction() {
    this.dy *= FRICTION;
    this.dx *= FRICTION;
  }

  bounceEdge() {
    if (this.x - this.radius < 0) {
      this.dx *= -1;
      this.x = this.radius;
      return;
    }
    if (this.x + this.radius > this.ctx.canvas.width) {
      this.dx *= -1;
      this.x = this.ctx.canvas.width - this.radius;
      return;
    }
    if (this.y - this.radius < 0) {
      this.dy *= -1;
      this.y = this.radius;
      return;
    }
    if (this.y + this.radius > this.ctx.canvas.height) {
      this.dy *= -1;
      this.y = this.ctx.canvas.height - this.radius;
      return;
    }
  }

  /** @param {Circle[]} circles */

  handleMultipleCollisions(circles) {
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const circleA = circles[i];
        const circleB = circles[j];
        if (this.checkCollision(circleA, circleB)) {
          // Slight Separation to Prevent Sticking
          const overlap = circleA.radius + circleB.radius - this.getDistance(circleA, circleB);
          const angle = Math.atan2(circleB.y - circleA.y, circleB.x - circleA.x);
          circleA.x -= (Math.cos(angle) * overlap) / 2;
          circleA.y -= (Math.sin(angle) * overlap) / 2;
          circleB.x += (Math.cos(angle) * overlap) / 2;
          circleB.y += (Math.sin(angle) * overlap) / 2;

          circleA.handleCircleCollision(circleB);
        }
      }
    }
  }

  /**
   *
   * @param {Circle} circleA
   * @param {Circle} circleB
   * @returns {boolean}
   */
  checkCollision(circleA, circleB) {
    if (Math.abs(circleA.x - circleB.x) > circleA.radius + circleB.radius) return false;
    if (Math.abs(circleA.y - circleB.y) > circleA.radius + circleB.radius) return false;
    const distX = circleA.x - circleB.x;
    const distY = circleA.y - circleB.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    return distance < circleA.radius + circleB.radius;
  }

  getDistance(circleA, circleB) {
    const distX = circleA.x - circleB.x;
    const distY = circleA.y - circleB.y;
    return Math.sqrt(distX * distX + distY * distY);
  }

  /**
   *
   * @param {Circle} other
   */
  handleCircleCollision(other) {
    const mass = this.mass;
    const otherMass = other.mass;

    const dxF = ((mass - otherMass) * this.dx + 2 * otherMass * other.dx) / (mass + otherMass);
    const otherDxF = (2 * mass * this.dx + (otherMass - mass) * other.dx) / (mass + otherMass);
    const dyF = ((mass - otherMass) * this.dy + 2 * otherMass * other.dy) / (mass + otherMass);
    const otherDyF = (2 * mass * this.dy + (otherMass - mass) * other.dy) / (mass + otherMass);

    this.dx = dxF;
    this.dy = dyF;
    other.dx = otherDxF;
    other.dy = otherDyF;
  }

  updateWithGravity() {
    this.#applyGravity();
    this.#applyFriction();
    this.update();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  /**
   * @param {string | CanvasGradient | CanvasPattern} options.color - The color of the circle (CSS color string). Defaults to '#fff' (white).
   */
  drawRadiusLine(lineColor = "#777") {
    const ctx = this.ctx;
    const radian = Math.atan2(this.dy, this.dx);
    const newY = Math.sin(radian) * this.radius;
    const newX = Math.cos(radian) * this.radius;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + newX, this.y + newY);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = 0;
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
