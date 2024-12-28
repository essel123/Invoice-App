import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { setDialog } from "../../../State/stateSlice";
import Badge from "../../atoms/Badge/Badge";
import Button from "../../atoms/Button/Button";
import { Text } from "../../atoms/Text/Text";
import Header from "../Header/Header";
import Invoice__Details__Card from "../InvoiceDetailsCard/Invoice__Details__Card";
import styles from "./invoice.module.css";
function InvoiceDetails() {

  const isOpen = useAppSelector(state => state.pageState.isOpen);
    const controller = useAppDispatch();
    const handleClick = () => {
      controller(setDialog(!isOpen));
    };
  return (
    <section className={styles.invoice__details}>
      <header className={styles.header}>
        <Header
          leftElements={
            <div className={styles.leftElements}>
              <Text children={"Status"} /> <Badge status={"pending"} />
            </div>
          }
          rightElements={
            <div className={styles.rightElements}>
              <Button
                size={"lg"}
                radius={"full"}
                bgColor={"tertiary"}
                onClick={handleClick}
                children={"Edit"}
              />
              <Button
                size={"lg"}
                radius={"full"}
                bgColor={"danger"}
                children={"Delate"}
              />
              <Button
                size={"lg"}
                radius={"full"}
                bgColor={"primary"}
                children={"Mark as Paid"}
              />
            </div>
          }
        />
      </header>

      <Invoice__Details__Card />
    </section>
  );
}

export default InvoiceDetails;
