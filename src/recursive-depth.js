const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    if (!Array.isArray(arr)) throw new Error("Input must be an array!");
    if (arr.every(elem => !Array.isArray(elem))) return 1;

    const depths = arr.filter(elem => Array.isArray(elem)).map(elem => this.calculateDepth(elem));

    return 1 + Math.max(...depths);
  }
}
const depthCalc = new DepthCalculator();
depthCalc.calculateDepth([[[[]]]]);

module.exports = {
  DepthCalculator
};
