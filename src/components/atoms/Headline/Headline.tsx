import React from "react";

import styles from './headline.module.css'


interface HeadlineProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

const Headline: React.FC<HeadlineProps> = ({
  tag = "h1",
  children,
}) => {
  const Tag = tag;
  return (
    <Tag className={styles.headline}>
      {children}
    </Tag>
  );
};

export default Headline;
