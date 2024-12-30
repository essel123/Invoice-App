import Avatar from "../../atoms/Avater/Avater";
import Icon from "../../atoms/Icon/Icon";
import Toggle from "../../atoms/Toggler/Toggle";
import styles from "./sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Icon
          size="md"
          src="../assets/logo.svg"
          alt="image of logo"
        />
      </div>
      <footer className={styles.footer}>
        <div className={styles.toggler}>
          <Toggle />
        </div>
        <div className={styles.avatar}>
          <Avatar
            src={"../assets/image-avatar.jpg"}
            alt={"image of avater"}
          />
        </div>
      </footer>
    </div>
  );
}

export default Sidebar;
