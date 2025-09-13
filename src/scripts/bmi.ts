/**
 * Calculate BMI based on height and weight
 * @param {number} weight - Weight in kg.
 * @param {number} height - Height in metres
 * @returns {number} BMI in kg/m^2
 */
const calculateBmi = (weight: number, height: number) => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Weight and Height have to be greater than zero.");
  }
  return weight / height ** 2;
};

/**
 * Calculate ideal weight based on height
 * @param {number} height - Height in metres
 * @returns {{number, number}} Returns minWeight and maxWeight in kilogram
 */
const calculateIdealWeight = (height: number) => {
  if (height <= 0) {
    throw new Error("Height has to be greater than zero.");
  }
  const minWeight = 18.5 * height ** 2;
  const maxWeight = 24.9 * height ** 2;
  return { minWeight, maxWeight };
};

/**
 * Convert weight in kilogram to stone and pound
 * @param {number} weight - weight in metres
 * @returns {{number, number}} Returns stone and pound rounded
 */
const toImperialWeight = (weight: number) => {
  const stone = weight / 6.35029497;
  const pound = (stone % 1) * 14;
  return { stone: Math.floor(stone), pound: Math.floor(pound) };
};

/**
 * Convert height in metres to feet and inches
 * @param {number} height - height in metres
 * @returns {{number, number}} Returns feet and inches rounded
 */
const toImperialHeight = (height: number) => {
  const feet = height / 0.3048;
  const inches = (feet % 1) * 12;
  return { feet: Math.floor(feet), inches: Math.floor(inches) };
};

export {
  calculateBmi,
  calculateIdealWeight,
  toImperialHeight,
  toImperialWeight,
};
