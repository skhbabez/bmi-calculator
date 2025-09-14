import { useId, useRef, useState } from "react";
import Label from "../../components/Label/Label";
import SelectionButton from "../../components/SelectionButton/SelectionButton";
import styles from "./CalculatorCard.module.css";
import UnitInput from "../../components/UnitInput/UnitInput";
import ResultBar from "../../components/ResultBar/ResultBar";
import {
  toImperialHeight,
  toImperialWeight,
  toMetricHeight,
  toMetricWeight,
} from "../../scripts/bmi";

type unitSystem = "metric" | "imperial";

const removeLetters = (value: string) => {
  return value.replace(/\D/g, "");
};

const CalculatorCard = () => {
  const [unit, setUnit] = useState<unitSystem>("metric");
  const [height, setHeight] = useState<number>(); //in cm
  const [weight, setWeight] = useState<number>(); //in kg

  const formId = useId();

  const handleHeightChange = (height: number) => {
    setHeight(height);
  };

  const handleWeightChange = (weight: number) => {
    console.log("weight: " + weight);
    setWeight(weight);
  };
  return (
    <>
      <h2 id={formId}>Enter your details below</h2>
      <form noValidate aria-labelledby={formId}>
        <fieldset>
          <legend className="sr-only">Choose a Unit</legend>
          <Label>
            <SelectionButton
              checked={unit === "metric"}
              name="unit"
              onChange={() => setUnit("metric")}
            />
            Metric
          </Label>
          <Label>
            <SelectionButton
              checked={unit === "imperial"}
              name="unit"
              onChange={() => setUnit("imperial")}
            />
            Imperial
          </Label>
        </fieldset>
        {unit === "metric" ? (
          <MetricView
            height={height}
            weight={weight}
            onHeightChange={setHeight}
            onWeightChange={setWeight}
          />
        ) : (
          <ImperialView
            height={height}
            weight={weight}
            onHeightChange={handleHeightChange}
            onWeightChange={handleWeightChange}
          />
        )}

        <ResultBar
          unit={unit}
          height={(height || 0) / 100}
          weight={weight}
        ></ResultBar>
      </form>
    </>
  );
};

const MetricView = ({
  height,
  weight,
  onHeightChange,
  onWeightChange,
}: {
  height?: number;
  weight?: number;
  onHeightChange: (height: number) => void;
  onWeightChange: (weight: number) => void;
}) => {
  return (
    <>
      <fieldset>
        <legend>weight</legend>
        <Label>
          <span className="sr-only">in kg</span>
          <UnitInput
            unit="kg"
            value={weight || ""}
            placeholder="0"
            onChange={(event) =>
              onWeightChange(Number(removeLetters(event.currentTarget.value)))
            }
          />
        </Label>
      </fieldset>
      <fieldset>
        <legend>height</legend>
        <Label>
          <span className="sr-only">in cm</span>
          <UnitInput
            unit="cm"
            value={height || ""}
            placeholder="0"
            onChange={(event) =>
              onHeightChange(Number(removeLetters(event.currentTarget.value)))
            }
          />
        </Label>
      </fieldset>
    </>
  );
};
const ImperialView = ({
  height,
  weight,
  onHeightChange,
  onWeightChange,
}: {
  height?: number;
  weight?: number;
  onHeightChange: (height: number) => void;
  onWeightChange: (weight: number) => void;
}) => {
  const { feet, inches } = height ? toImperialHeight(height / 100) : {};
  const { stone, pound } = weight ? toImperialWeight(weight) : {};
  const feetRef = useRef<HTMLInputElement | null>(null);
  const inchRef = useRef<HTMLInputElement | null>(null);
  const stoneRef = useRef<HTMLInputElement | null>(null);
  const poundRef = useRef<HTMLInputElement | null>(null);

  const handleWeightChange = () => {
    const poundCurrent = poundRef.current;
    const stoneCurrent = stoneRef.current;
    if (poundCurrent && stoneCurrent) {
      const stoneValue = removeLetters(stoneCurrent.value);
      const poundValue = removeLetters(poundCurrent.value) || 0;
      console.log(stoneValue);
      console.log(poundValue);
      const metricWeight = toMetricWeight(
        Number(stoneValue),
        Number(poundValue)
      );
      onWeightChange(metricWeight);
    }
  };
  const handleHeightChange = () => {
    const feetCurrent = feetRef.current;
    const inchCurrent = inchRef.current;
    if (feetCurrent && inchCurrent) {
      const feetValue = removeLetters(feetCurrent.value);
      const inchValue = removeLetters(inchCurrent.value) || 0;
      const metricHeight = toMetricHeight(Number(feetValue), Number(inchValue));
      onHeightChange(metricHeight);
    }
  };
  return (
    <>
      <fieldset>
        <legend>height</legend>
        <Label>
          <span className="sr-only">in feet</span>
          <UnitInput
            ref={feetRef}
            unit="ft"
            value={feet}
            placeholder="0"
            onInput={handleHeightChange}
          />
        </Label>
        <Label>
          <span className="sr-only">in inches</span>
          <UnitInput
            ref={inchRef}
            unit="in"
            value={inches}
            placeholder="0"
            onInput={handleHeightChange}
          />
        </Label>
      </fieldset>
      <fieldset>
        <legend>weight</legend>
        <Label>
          <span className="sr-only">in stone</span>
          <UnitInput
            ref={stoneRef}
            unit="st"
            value={stone}
            placeholder="0"
            onInput={handleWeightChange}
          />
        </Label>
        <Label>
          <span className="sr-only">in pounds</span>
          <UnitInput
            ref={poundRef}
            unit="lbs"
            value={pound}
            placeholder="0"
            onInput={handleWeightChange}
          />
        </Label>
      </fieldset>
    </>
  );
};

export default CalculatorCard;
