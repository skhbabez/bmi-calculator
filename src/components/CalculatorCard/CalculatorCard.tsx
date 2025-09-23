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
  const [feet, setFeet] = useState<number>();
  const [inches, setInches] = useState<number>();
  const [stone, setStone] = useState<number>();
  const [pound, setPound] = useState<number>();
  const [cm, setCm] = useState<number>();
  const [kilograms, setKilograms] = useState<number>();

  const metricHeightChange = (height: number) => {
    const { feet, inches } = toImperialHeight(height / 100);
    setFeet(Math.round(feet));
    setInches(Math.round(inches));
    setCm(Math.round(height));
  };
  const metricWeightChange = (weight: number) => {
    const { stone, pound } = toImperialWeight(weight);
    setStone(Math.round(stone));
    setPound(Math.round(pound));
    setKilograms(Math.round(weight));
  };

  const formId = useId();

  const imperialWeightChange = (stone: number, pound: number) => {
    const weight = toMetricWeight(stone, pound);
    setStone(Math.round(stone));
    setPound(Math.round(pound));
    setKilograms(Math.round(weight));
  };

  const imperialHeightChange = (feet: number, inches: number) => {
    const height = toMetricHeight(feet, inches);
    setFeet(Math.round(feet));
    setInches(Math.round(inches));
    setCm(Math.round(height) * 100);
  };
  return (
    <form className={styles.card} noValidate aria-labelledby={formId}>
      <h2 className="text-ml-sb " id={formId}>
        Enter your details below
      </h2>
      <fieldset className={styles.unitselector}>
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
          height={cm}
          weight={kilograms}
          onHeightChange={metricHeightChange}
          onWeightChange={metricWeightChange}
        />
      ) : (
        <ImperialView
          feet={feet}
          inches={inches}
          stone={stone}
          pound={pound}
          onHeightChange={imperialHeightChange}
          onWeightChange={imperialWeightChange}
        />
      )}

      <ResultBar
        unit={unit}
        height={(cm || 0) / 100}
        weight={kilograms}
      ></ResultBar>
    </form>
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
    <div className={styles.metricview}>
      <fieldset>
        <legend>Height</legend>
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
      <fieldset>
        <legend>Weight</legend>
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
    </div>
  );
};
const ImperialView = ({
  feet,
  inches,
  stone,
  pound,
  onHeightChange,
  onWeightChange,
}: {
  feet?: number;
  inches?: number;
  stone?: number;
  pound?: number;
  onHeightChange: (feet: number, inches: number) => void;
  onWeightChange: (stone: number, pound: number) => void;
}) => {
  const feetRef = useRef<HTMLInputElement | null>(null);
  const inchRef = useRef<HTMLInputElement | null>(null);
  const stoneRef = useRef<HTMLInputElement | null>(null);
  const poundRef = useRef<HTMLInputElement | null>(null);

  const handleWeightChange = () => {
    const poundCurrent = poundRef.current;
    const stoneCurrent = stoneRef.current;
    if (poundCurrent && stoneCurrent) {
      const stoneValue = Number(removeLetters(stoneCurrent.value));
      const poundValue = Number(removeLetters(poundCurrent.value));
      onWeightChange(stoneValue, poundValue);
    }
  };
  const handleHeightChange = () => {
    const feetCurrent = feetRef.current;
    const inchCurrent = inchRef.current;
    if (feetCurrent && inchCurrent) {
      const feetValue = Number(removeLetters(feetCurrent.value));
      const inchValue = Number(removeLetters(inchCurrent.value));
      onHeightChange(feetValue, inchValue);
    }
  };
  return (
    <div className={styles.imperialview}>
      <fieldset>
        <legend>Height</legend>
        <Label>
          <span className="sr-only">in feet</span>
          <UnitInput
            ref={feetRef}
            unit="ft"
            value={feet || ""}
            placeholder="0"
            onInput={handleHeightChange}
          />
        </Label>
        <Label>
          <span className="sr-only">in inches</span>
          <UnitInput
            ref={inchRef}
            unit="in"
            value={inches || ""}
            placeholder="0"
            onInput={handleHeightChange}
          />
        </Label>
      </fieldset>
      <fieldset>
        <legend>Weight</legend>
        <Label>
          <span className="sr-only">in stone</span>
          <UnitInput
            ref={stoneRef}
            unit="st"
            value={stone || ""}
            placeholder="0"
            onInput={handleWeightChange}
          />
        </Label>
        <Label>
          <span className="sr-only">in pounds</span>
          <UnitInput
            ref={poundRef}
            unit="lbs"
            value={pound || ""}
            placeholder="0"
            onInput={handleWeightChange}
          />
        </Label>
      </fieldset>

    </div>
    
  );
};

export default CalculatorCard;
