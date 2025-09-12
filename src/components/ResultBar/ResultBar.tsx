import clsx from "clsx";
import styles from "./ResultBar.module.css";
interface ResultBarProps {
  bmi?: number;
}

const ResultBar = ({ bmi }: ResultBarProps) => {
  return (
    <div aria-live="polite" aria-atomic="true">
      {bmi ? (
        <section className={clsx(styles.resultcontainer, styles.resultbar)}>
          <div className={styles.result}>
            <p className="copy-l">Your BMI is...</p>
            <p className="heading-l">{bmi}</p>
          </div>
          <p className={clsx(styles.description, "copy-s")}>
            Your BMI suggests you’re a healthy weight. Your ideal weight is
            between <em>63.3kgs - 85.2kgs</em>.
          </p>
        </section>
      ) : (
        <section className={clsx(styles.welcome, styles.resultbar)}>
          <p className="copy-l">Welcome!</p>
          <p className="copy-s">
            Enter your height and weight and you’ll see your BMI result here
          </p>
        </section>
      )}
    </div>
  );
};

export default ResultBar;
