import React from "react";
import styles from "./badge.module.css"; // Assuming you have some CSS for styling

interface BadgeProps {
  status: string;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusClass = styles[`badge-${status}`] || "";
  return (
    <span className={`${styles.badge} ${statusClass}`}>
      <span className={`${styles.circle} ${styles[`circle-${status}`]}`} />{" "}
      { status }
    </span>
  );
};

export default Badge;
