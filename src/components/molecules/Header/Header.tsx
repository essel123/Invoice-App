import React from "react";
import styles from "./header.module.css";

type HeaderProps = {
  leftElements: React.ReactNode;
  rightElements: React.ReactNode;
};

export default function Header({ leftElements, rightElements }: HeaderProps) {
  return (
    <header>
      <div className={styles.leftside}>
        {leftElements}
      </div>
      <div className={styles.rightside}>
        {rightElements}
      </div>
    </header>
  );
}
