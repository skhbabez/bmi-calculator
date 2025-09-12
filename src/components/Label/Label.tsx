import type { ComponentProps } from "react";
import styles from "./Label.module.css";
import { clsx } from "clsx";

const Label = ({ className, ...props }: ComponentProps<"label">) => {
  return <label className={clsx(styles.label, className)} {...props}></label>;
};

export default Label;
