
import { RainRect } from "./class";
import { loadMinecraftFont } from "./helper/fontHelper";


/**
 * 
 * @param {Object} param 
 * @param {CanvasRenderingContext2D} param.ctx
 * @param {number} param.frameId
 */
export const app = async ({ ctx, frameId }) => {
  await loadMinecraftFont()
  const rain = new RainRect({ ctx, color: '#800080' })
  const animate = async (frameId) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    rain.draw()
    frameId.current = requestAnimationFrame(() => animate(frameId));
  };
  animate(frameId);
};



