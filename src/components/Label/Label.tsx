import type { ComponentProps } from "react";
import styles from "./Label.module.css";
import { clsx } from "clsx";

const Label = ({ className, children, ...props }: ComponentProps<"label">) => {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
