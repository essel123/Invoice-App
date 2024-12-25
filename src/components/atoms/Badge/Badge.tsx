import React from "react";
import styles from "./badge.module.css"; // Assuming you have some CSS for styling

interface BadgeProps {
    status: string;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
    // Map the status to the corresponding class name in CSS Modules
    const statusClass = styles[`badge-${status}`] || "";

    return (
        <span className={`${styles.badge} ${statusClass}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default Badge;
