import { getRandomHSLColor } from "./common";

/**
 *
 * @param {Object} params
 * @param {number} params.maxCircle
 * @param {number} params.minRadius
 * @param {number} params.maxRadius
 * @param {number} params.canvasWidth
 * @param {number} params.canvasHeight
 * @param {number} params.maxSpeed
 * @param {number} params.minSpeed
 * @param {number} params.minMass
 * @param {number} params.maxMass
 * @returns {rawCircle[]}
 */
export function generateNonOverlapingCircle({
  maxCircle,
  minRadius,
  maxRadius,
  canvasWidth,
  canvasHeight,
  maxSpeed = 0,
  minSpeed = 0,
  minMass,
  maxMass,
}) {
  /** @type {rawCircle[]} */
  const arrayCircle = [];
  const maxAttemp = 500;
  for (let i = 0; i < maxCircle; i++) {
    let attemp = 0;
    let isValid = true;
    let radius = Math.random() * (maxRadius - minRadius) + minRadius;
    let x = Math.random() * (canvasWidth - minRadius * 2) + minRadius;
    let y = Math.random() * (canvasHeight - maxRadius * 2) + maxRadius;
    const mass = Math.random() * (maxMass - minMass) + minMass;
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    const angle = Math.random() * 360;
    const color = getRandomHSLColor();
    inner: for (let j = 0; j < arrayCircle.length; j++) {
      isValid = true;
      const distX = arrayCircle[j].x - x;
      const distY = arrayCircle[j].y - y;
      const sumRadius = arrayCircle[j].radius + radius;
      const distance = Math.sqrt(distX * distX + distY * distY);
      //add +1 to the condition so they not render really close
      if (distance <= sumRadius * 1.05) {
        isValid = false;
        attemp++;
        if (attemp <= maxAttemp) {
          j = -1;
          radius = Math.random() * (maxRadius - minRadius) + minRadius;
          x = Math.random() * (canvasWidth - maxRadius * 2) + maxRadius;
          y = Math.random() * (canvasHeight - maxRadius * 2) + maxRadius;
          continue inner;
        }
        break inner;
      }
    }
    if (isValid) {
      arrayCircle.push({ radius, x, y, speed: speed, color, angle, index: arrayCircle.length, mass });
    }
  }

  return arrayCircle;
}
