import React from "react";
import styles from "./button.module.css";
interface ButtonProps {
  size: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
  bgColor: "primary" | "secondary" | "success" | "danger" | "tertiary";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  btnwidth?: "addbtn" | "invoicebtn";
}
const Button: React.FC<ButtonProps> = ({
  size = "md",
  radius = "md",
  bgColor = "primary",
  btnwidth ,
  onClick,
  children,
  type
}) => {
  const buttonClass = `${styles.btn} ${styles[`btn-${size}`]} ${styles[
    `btn-radius-${radius}`
  ]} ${styles[`btn-${bgColor}`]} ${styles[`${btnwidth}`]}`;

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
