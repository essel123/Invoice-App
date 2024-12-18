import React from "react";
import styles from "./button.module.css"; // Import the CSS Module

interface ButtonProps {
  size: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
  bgColor: "primary" | "secondary" | "success" | "danger";
  icon?:string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = "md",
  radius = "md",
  bgColor = "primary",
  icon,
  onClick,
  children
}) => {
  // Build the button className dynamically based on the props
  const buttonClass = `${styles.btn} ${styles[`btn-${size}`]} ${styles[
    `btn-radius-${radius}`
  ]} ${styles[`btn-${bgColor}`]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {typeof icon === 'string' &&
        <span className={styles["btn-icon"]}>
          <img src={icon} alt={icon} />
        </span>}
      {children}
    </button>
  );
};

export default Button;
