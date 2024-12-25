import { useState } from "react";
import Avatar from "../../atoms/Avater/Avater";
import Icon from "../../atoms/Icon/Icon";
import styles from "./sidebar.module.css";

function Sidebar() {
  const [IsDarkMode, setIsDarkMode] = useState(false);
  function handleMode() {
    setIsDarkMode(!IsDarkMode);
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.togller}>
        {IsDarkMode
          ? <Icon
              size="sm"
              src="../../../../public/assets/icon-sun.svg"
              alt="image of moon"
              onClick={() => handleMode()}
            />
          : <Icon
              size="sm"
              src="../../../../public/assets/icon-moon.svg"
              alt="image of moon"
              onClick={() => handleMode()}
            />}
      </div>
      <footer className={styles.footer}>
        <Avatar src={"../../../../public/assets/image-avatar.jpg"} alt={""} />
      </footer>
    </div>
  );
}

export default Sidebar;
