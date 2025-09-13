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
 * @returns {number, number} Returns minWeight and maxWeight
 */
const calculateIdealWeight = (height: number) => {
  if (height <= 0) {
    throw new Error("Height has to be greater than zero.");
  }
  const minWeight = 18.5 * height ** 2;
  const maxWeight = 24.9 * height ** 2;
  return { minWeight, maxWeight };
};

export { calculateBmi, calculateIdealWeight };
