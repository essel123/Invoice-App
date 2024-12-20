import { ReactNode } from "react";
import styles from "./text.module.css";

interface TextProps {
  children: ReactNode;
  variant?: "caption" | "description";
  class_?: string;
}

export const Text = ({
  children,
  variant = "description",
  class_
}: TextProps) => {
  return (
    <p className={`${styles.text} ${styles[variant]} ${class_ ? styles[class_] : ''}`}>
      {children}
    </p>
  );
};
