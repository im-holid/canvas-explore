import { Circle } from "./class/Circle";
import { UglyStar } from "./class/UglyStar";
import { generateNonOverlapingCircle } from "./helper/circleHelper";
import { mapNumber } from "./helper/common";

/** @param {CanvasRenderingContext2D} ctx */
export const app = (ctx) => {
  let frameId;

  /** @type {UglyStar[]} */
  const arrayCircle = [];
  for (let i = 0; i < 10; i++) {
    arrayCircle.push(new UglyStar(ctx));
  }

  const animate = async () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    arrayCircle.map((v) => {
      v.show();
      // v.update();
    });

    // frameId = requestAnimationFrame(() => animate());
  };
  animate();
};
