import clsx from "clsx";
import styles from "./ResultBar.module.css";
import {
  calculateBmi,
  calculateIdealWeight,
  toImperialWeight,
} from "../../scripts/bmi";
interface ResultBarProps {
  weight?: number;
  height?: number;
  unit: "metric" | "imperial";
}
// source https://en.wikipedia.org/wiki/Body_mass_index
const ResultBar = ({ weight, height, unit }: ResultBarProps) => {
  return (
    <div aria-live="polite" aria-atomic="true">
      {weight && height ? (
        <ResultView weight={weight} height={height} unit={unit}></ResultView>
      ) : (
        <WelcomeView />
      )}
    </div>
  );
};

const WelcomeView = () => {
  return (
    <section className={clsx(styles.welcome, styles.resultbar)}>
      <p className="copy-l">Welcome!</p>
      <p className="copy-s">
        Enter your height and weight and you’ll see your BMI result here
      </p>
    </section>
  );
};

const ResultView = ({
  weight,
  height,
  unit,
}: {
  weight: number;
  height: number;
  unit: "metric" | "imperial";
}) => {
  const between = (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  };

  const bmi = calculateBmi(weight, height);
  let { minWeight, maxWeight } = calculateIdealWeight(height);
  let range;
  let classification;
  if (bmi < 16) {
    classification = "Underweight (Severe thinness)";
  } else if (between(bmi, 16, 16.9)) {
    classification = "Underweight (Moderate thinness)";
  } else if (between(bmi, 17, 18.4)) {
    classification = "Underweight (Mild thinness)";
  } else if (between(bmi, 18.5, 24.9)) {
    classification = "a healthy weight";
  } else if (between(bmi, 25, 29.9)) {
    classification = "Overweight";
  } else if (between(bmi, 30, 34.9)) {
    classification = "Obese (Class I)";
  } else if (between(bmi, 35, 39.9)) {
    classification = "Obese (Class II)";
  } else {
    classification = "Obese (Class III)";
  }

  if (unit === "imperial") {
    const { stone: minStone, pound: minPound } = toImperialWeight(minWeight);
    const { stone: maxStone, pound: maxPound } = toImperialWeight(maxWeight);
    range = `${minStone}st ${minPound}lbs - ${maxStone}st ${maxPound}lbs`;
  } else {
    range = `${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs`;
  }

  return (
    <section className={clsx(styles.resultcontainer, styles.resultbar)}>
      <div className={styles.result}>
        <p className="copy-l">Your BMI is...</p>
        <p className="heading-l">{bmi.toFixed(1)}</p>
      </div>
      <p className={clsx(styles.description, "copy-s")}>
        Your BMI suggests you’re {classification}. Your ideal weight is between{" "}
        <em>{range}</em>.
      </p>
    </section>
  );
};

export default ResultBar;
