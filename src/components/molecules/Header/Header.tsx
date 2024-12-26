import Button from "../../atoms/Button/Button";
import Headline from "../../atoms/Headline/Headline";
import Icon from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.leftside}>
        <Headline children={"Invoices"} />
        <Text children={"There are 7 total invoices"} />
      </div>
      <div className={styles.rightside}>
        <Button
          children={<Icon src={"./assets/icon-plus.svg"} alt={""} />}
          size={"lg"}
          radius={"full"}
          bgColor={"primary"}
          onClick={() => {}}
          name={"New Invoice"}
        />
      </div>
    </header>
  );
}
