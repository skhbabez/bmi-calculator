import type { ComponentProps } from "react";
import styles from "./SelectionButton.module.css";
import { clsx } from "clsx";

const SelectionButton = ({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) => {
  return (
    <input
      className={clsx(styles.selectionbutton, className)}
      type="radio"
      {...props}
    ></input>
  );
};

export default SelectionButton;
