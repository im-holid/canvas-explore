/**
 * @returns {string} color with hsl value
 */
export function getRandomHSLColor() {
  const h = Math.random() * 360; // Random hue (0-360)
  const s = Math.random() * 100 + 50; // Random saturation (50-100%)
  const l = Math.random() * 50 + 30; // Random lightness (30-80%)

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 *
 * @param {Object} options
 * @param {number} options.min minimum random value
 * @param {number} options.max maximum random value
 */
export function minMaxRandom({ min = 1, max = 1 }) {
  return Math.random() * (max - min) + min;
}

/**
 *
 * @param {number} input
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @returns {number}
 */
export function interpolateNumber(input, inMin, inMax, outMin, outMax) {
  // Check for range validity (optional)
  if (inMin >= inMax || outMin >= outMax) {
    throw new Error("Invalid input or output ranges");
  }

  // Calculate the normalized input value (0 - 1)
  const normalizedInput = (input - inMin) / (inMax - inMin);

  // Calculate the range of the output (outMax - outMin)
  const outputRange = outMax - outMin;

  // Calculate the new value based on the normalized input and adjusted output range
  const newValue = normalizedInput * outputRange + outMin;

  // No clamping by default, but you can add it if needed
  return newValue;
}
