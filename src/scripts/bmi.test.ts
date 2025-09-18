import { expect, test, describe } from "vitest";
import {
  calculateBmi,
  calculateIdealWeight,
  toImperialHeight,
  toImperialWeight,
  toMetricHeight,
  toMetricWeight,
} from "./bmi";

describe("calculateBmi", () => {
  test("for 80kg and 1.85m", () => {
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
});

describe("calculateIdealWeight", () => {
  test("for height of 1.85m", () => {
    const { minWeight, maxWeight } = calculateIdealWeight(1.85);
    expect(minWeight).toBeCloseTo(63.3, 1);
    expect(maxWeight).toBeCloseTo(85.2, 1);
  });

  test.each([0, -1])("Expect Exception for %im", (height) => {
    expect(() => calculateIdealWeight(height)).toThrowError(
      /Height has to be greater than zero./
    );
  });
});

describe("toImperialHeigth", () => {
  test.each([
    [1.81, 5, 11],
    [1.85, 6, 0],
  ])("For %im Expect %ift and %iin", (height, expFeet, expInches) => {
    const { feet, inches } = toImperialHeight(height);
    expect(feet).toBeCloseTo(expFeet, 1);
    expect(inches).toBeCloseTo(expInches, 1);
  });
});

describe("toImperialWeight", () => {
  test.each([
    [83, 13, 0],
    [88.9, 13, 13],
  ])("For %ikg Expect %ist and %ilbs", (weight, expStone, expPound) => {
    const { stone, pound } = toImperialWeight(weight);
    expect(stone).toBeCloseTo(expStone, 1);
    expect(pound).toBeCloseTo(expPound, 1);
  });
});
describe("toMetricHeight", () => {
  test.each([
    [5, 11, 1.81],
    [6, 0, 1.85],
  ])("Expect %im for %ift and %iin", (feet, inches, expMetres) => {
    const metres = toMetricHeight(feet, inches);
    expect(metres).toBeCloseTo(expMetres, 1);
  });
});
describe("toIMetricWeight", () => {
  test.each([
    [13, 0, 82.6],
    [13, 12, 88],
  ])("For %ikg Expect %ist and %ilbs", (stone, pound, expKg) => {
    const kg = toMetricWeight(stone, pound);
    expect(kg).toBeCloseTo(expKg, 1);
  });
});
