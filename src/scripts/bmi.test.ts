import { expect, test } from "vitest";
import { calculateBmi, calculateIdealWeight, toImperialHeight } from "./bmi";

test("Calculate bmi for 80kg and 1.85m", () => {
  expect(calculateBmi(80, 1.85)).toBeCloseTo(23.4, 1);
});

test.each([
  [80, 0],
  [0, 1.85],
  [80, -1],
  [-1, 1.85],
  [0 - 1, -1],
])("Expect Exception for %ikg and %im", (weight, height) => {
  expect(() => calculateBmi(weight, height)).toThrowError(
    /Weight and Height have to be greater than zero/
  );
});

test("Calculate ideal weight for height of 1.85m", () => {
  const { minWeight, maxWeight } = calculateIdealWeight(1.85);
  expect(minWeight).toBeCloseTo(63.3, 1);
  expect(maxWeight).toBeCloseTo(85.2, 1);
});

test.each([0, -1])("Expect Exception for %im", (height) => {
  expect(() => calculateIdealWeight(height)).toThrowError(
    /Height has to be greater than zero./
  );
});
test.each([
  [1.81, 5, 11],
  [1.85, 6, 0],
])("For %im Expect %ift and %iin", (height, expFeet, expInches) => {
  const { feet, inches } = toImperialHeight(height);
  expect(feet).toBeCloseTo(expFeet, 1);
  expect(inches).toBeCloseTo(expInches, 1);
});
