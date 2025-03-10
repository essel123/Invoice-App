import { useAppDispatch } from "../../../State/hooks";
import { logOut, setDialog } from "../../../State/stateSlice";
import Avatar from "../../atoms/Avater/Avater";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Toggle from "../../atoms/Toggler/Toggle";
import styles from "./sidebar.module.css";

function Sidebar() {
  const disaptch =  useAppDispatch();
  const handleLogout = () => {
      disaptch(logOut());
      disaptch(setDialog(false));
         
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logo_icon}>
          <Icon size="md" src="../assets/logo.svg" alt="image of logo" />
        </span>
        <div className={styles.ovalbglogo} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.toggler}>
          <Toggle />
        </div>
        <div className={styles.avatar}>
          <Avatar src={"../assets/image-avatar.jpg"} alt={"image of avater"} />
          <span className={styles.logout}>
          <Button size={"sm"} radius={"md"} bgColor="danger" children={"Log out"} onClick={()=>handleLogout()}/>
          </span>

        </div>
      </footer>
    </div>
  );
}

export default Sidebar;