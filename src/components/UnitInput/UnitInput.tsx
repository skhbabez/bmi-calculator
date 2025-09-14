import type { ComponentProps } from "react";
import styles from "./UnitInput.module.css";
import clsx from "clsx";

interface UnitInputProps
  extends Omit<ComponentProps<"input">, "type" | "children"> {
  unit: string;
}

const UnitInput = ({ className, unit, ...props }: UnitInputProps) => {
  return (
    <span className={clsx(styles.container, "text-l-sb")}>
      <input type="text" {...props} />
      <span className={styles.unit} aria-hidden="true">
        {unit}
      </span>
    </span>
  );
};

export default UnitInput;
