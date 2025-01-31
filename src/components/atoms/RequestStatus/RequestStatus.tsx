import styles from "./statuspage.module.css";
import Headliine from "../../atoms/Headline/Headline";
import { Text } from "../Text/Text";
import Icon from "../Icon/Icon";
const RequestStatus = () => {
  return (
    <div className={styles.status__page}>
      <div className={styles.status__container}>
        <Text
          class_="caption"
          children={"Autorisation needed, login again !"}
        />
        <br />
        <Headliine className="status" variant="h1" children={"403"} />
        <Icon size="lg" src={"./assets/icons8-error.png"} alt={""} />
      </div>
    </div>
  );
};

export default RequestStatus;
