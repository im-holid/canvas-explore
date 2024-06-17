import { Grid, Snake } from "./class";
import { loadMinecraftFont } from "./helper/fontHelper";


/**
 * 
 * @param {Object} param 
 * @param {CanvasRenderingContext2D} param.ctx
 * @param {number} param.frameId
 */
export const app = async ({ ctx, frameId }) => {
  await loadMinecraftFont()
  const size = 30
  const square = new Snake(size, ctx)
  const grid = new Grid(size, ctx)
  const animate = async (frameId) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, ctx.canvas.width - ctx.canvas.width % size, ctx.canvas.height - ctx.canvas.height % size);
    // grid.draw()
    square.draw()
    frameId.current = requestAnimationFrame(() => animate(frameId));
  };
  animate(frameId);
};



