import React from "react";
import styles from "./button.module.css";
interface ButtonProps {
  size: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
  bgColor: "primary" | "secondary" | "success" | "danger" | "tertiary";
  onClick: () => void;
  children?: React.ReactNode;
  name:string
}
const Button: React.FC<ButtonProps> = ({
  size = "md",
  radius = "md",
  bgColor = "primary",
  onClick,
  children,
  name
}) => {
  const buttonClass = `${styles.btn} ${styles[`btn-${size}`]} ${styles[
    `btn-radius-${radius}`
  ]} ${styles[`btn-${bgColor}`]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
      {name}
    </button>
  );
};

export default Button;
