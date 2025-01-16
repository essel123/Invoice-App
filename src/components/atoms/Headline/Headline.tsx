import React from "react";

import styles from "./headline.module.css";

interface HeadlineProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

const Headline: React.FC<HeadlineProps> = ({
  variant = "h1",
  children,
  className
}) => {
  const Tag = variant;
  return (
    <Tag className={`${styles.headline} ${className ? styles[className] : ""}`}>
      {children}
    </Tag>
  );
};

export default Headline;
