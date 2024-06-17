import { minMaxRandom } from "../helper/common";
import { wrapText } from "../helper/fontHelper";
import { Square } from "./Base/Square";

export class Snake extends Square {
    /**
     * @param {number} size 
     * @param {CanvasRenderingContext2D} ctx 
     */
    constructor(size, ctx) {
        const { x, y } = Snake.randomXYforSquare(size, ctx.canvas.height, ctx.canvas.width)
        const randomZeroOrOne = Math.floor(Math.random() * 2);
        super(size, x, y, ctx)
        this.currentTime = 0
        this.vx = randomZeroOrOne
        this.vy = this.vx === 0 ? 1 : 0
        this.speed = 0.5
        this.#controller()
        this.food
        /** @type {Coor[]} */
        this.tail = []
        this.#createFood()
        this.tailSize = 0
        /** @type {direction} */
        this.direction = 'horizontal'
    }

    #controller() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowUp':
                    if (this.vy !== 1 && this.direction !== 'vertical') {
                        this.vy = -1
                        this.vx = 0
                    }
                    break;
                case 'ArrowDown':
                    if (this.vy !== -1 && this.direction !== 'vertical') {
                        this.vy = 1
                        this.vx = 0
                    }
                    break;
                case 'ArrowLeft':
                    if (this.vx !== 1 && this.direction !== 'horizontal') {
                        this.vx = -1
                        this.vy = 0
                    }
                    break;
                case 'ArrowRight':
                    if (this.vx !== -1 && this.direction !== 'horizontal') {
                        this.vx = 1
                        this.vy = 0
                    }
                    break;
                case 'KeyR':
                    this.#reloadGame()
                    break;
                case 'Space':
                    this.speed = 0.5 / 5
                    break;
                default:
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'Space':
                    this.speed = 0.5
                    break;
                default:
                    break;
            }
        });
    }

    /** @returns {Coor} */
    static randomXYforSquare(size, canvasHeight, canvasWidth, edgeTop = 0, edgeLeft = 0) {
        const edgeBottom = (canvasHeight - (canvasHeight % size)) - size
        const edgeRight = (canvasWidth - (canvasWidth % size)) - size
        const xRan = minMaxRandom({ min: edgeLeft, max: edgeRight })
        const yRan = minMaxRandom({ min: edgeTop, max: edgeBottom })
        const x = xRan % size < size / 2 ? xRan - xRan % size : xRan + size - xRan % size
        const y = yRan % size < size / 2 ? yRan - yRan % size : yRan + size - yRan % size
        return { x, y }
    }

    #reloadGame() {
        this.tailSize = 0
        const { x, y } = Snake.randomXYforSquare(this.size, this.ctx.canvas.height, this.ctx.canvas.width)
        const randomZeroOrOne = Math.floor(Math.random() * 2);
        this.x = x
        this.y = y
        this.vx = randomZeroOrOne
        this.vy = this.vx === 0 ? 1 : 0
    }

    #gameOver() {
        const ctx = this.ctx
        const size = 100
        const text = 'Game\nOver'
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'center'
        ctx.font = `${size}px Minecraft`
        wrapText(ctx, text, ctx.canvas.width / 2, ctx.canvas.height / 2, 400, size)
        ctx.fill()
        ctx.closePath()
    }

    #createFood() {
        const { width, height } = this.ctx.canvas
        const { x, y } = Snake.randomXYforSquare(this.size, height, width)
        const isSmall = Math.floor(Math.random() * 2)
        const bigOrSmallFood = isSmall ? this.size : this.size / 2;
        const color = isSmall ? '#f00' : '#ff0'
        const newX = x + (this.size - bigOrSmallFood) / 2
        const newY = y + (this.size - bigOrSmallFood) / 2
        if (this.#isFoodCollide({ size: bigOrSmallFood, x: newX, y: newY }, this)) return this.#createFood()
        for (let i = 0; i < this.tail.length; i++) {
            const tail = this.tail[i]
            if (this.#isFoodCollide({ size: bigOrSmallFood, x: newX, y: newY }, { size: this.size, ...tail })) return this.#createFood()
        }
        this.food = new Square(bigOrSmallFood, newX, newY, this.ctx, color)
    }

    #eatTail() {
        for (let i = 0; i < this.tail.length; i++) {
            const tail = this.tail[i]
            const xTail = tail.x
            const yTail = tail.y
            const isXCollide = Math.abs(xTail - this.x) < this.size
            const isYCollide = Math.abs(yTail - this.y) < this.size
            if (isXCollide && isYCollide) {
                this.tailSize = -100
                break
            }
        }
    }

    /**
     * @param {Square} squareFood 
     * @param {Square} squareSnake 
     */
    #isFoodCollide(squareFood, squareSnake) {
        const midXFood = squareFood.x + squareFood.size / 2
        const midX = squareSnake.x + squareSnake.size / 2
        const midYFood = squareFood.y + squareFood.size / 2
        const midY = squareSnake.y + squareSnake.size / 2
        const foodSize = squareFood.size / 2 + squareSnake.size / 2
        const isXCollide = Math.abs(midX - midXFood) < foodSize
        const isYCollide = Math.abs(midY - midYFood) < foodSize
        return isXCollide && isYCollide
    }

    #eatFood() {
        if (this.#isFoodCollide(this.food, this)) {
            this.#createFood()
            if (this.food.size >= this.size)
                this.tailSize += 2
            else this.tailSize++
        }
    }


    boundary() {
        const { width, height } = this.ctx.canvas
        const edgeTop = 0
        const edgeBottom = (height - (height % this.size)) - this.size
        const edgeLeft = 0
        const edgeRight = (width - (width % this.size)) - this.size
        if (this.y < edgeTop) {
            this.y = 0
            this.tailSize = -100
        }
        else if (this.y > edgeBottom) {
            this.y = edgeBottom
            this.tailSize = -100
            return true
        }
        if (this.x < edgeLeft) {
            this.x = edgeLeft
            this.tailSize = -100
            return true
        }
        else if (this.x > edgeRight) {
            this.x = edgeRight
            this.tailSize = -100
            return true
        }
        return false
    }

    move() {
        if (performance.now() - this.currentTime >= 1000 * this.speed) {
            this.tail.push({ x: this.x, y: this.y })
            while (this.tail.length > this.tailSize) {
                this.tail.shift()
            }
            this.x += this.size * this.vx
            this.y += this.size * this.vy
            this.#eatTail()
            this.boundary()
            this.#eatFood()

            if (this.vx !== 0) { this.direction = 'horizontal' }
            else if (this.vy !== 0) { this.direction = 'vertical' }

            this.currentTime = performance.now()
        }
    }

    draw() {
        if (this.tailSize < 0) {
            this.#gameOver()
            return
        }
        super.draw()
        this.food.draw()
        this.move()
        for (let i = 0; i < this.tail.length; i++) {
            (new Square(this.size, this.tail[i].x, this.tail[i].y, this.ctx)).draw()
        }

    }


}

/**
 * @typedef {Object} Coor
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {'horizontal'|'vertical'|'undefined'} direction
 */