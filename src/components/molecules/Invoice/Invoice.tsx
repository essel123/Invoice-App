import Badge from "../../atoms/Badge/Badge";
import Button from "../../atoms/Button/Button";
import Headline from "../../atoms/Headline/Headline";
import Icon from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";
import styles from "./invoice.module.css";

type InvoiceProps = {
  status: string;
  paymentDue: string;
  clientName: string;
  total: number;
  id: string;
  onClick: () => void;
};

function Invoice({
  status,
  paymentDue,
  clientName,
  total,
  id,
  onClick
}: InvoiceProps) {
  return (
    <Button
    onClick={onClick}
      size={"lg"}
      radius={"lg"}
      bgColor={"tertiary"}
      btnwidth="invoicebtn"
      children={
        <span className={styles.invoice}>
          <Headline children={`#${id}`} className="headline" />
          <Text children={paymentDue} />
          <Text children={clientName} />
          <Headline children={`£${total}`} />
          <Badge status={status} />
          <Icon
            src={"../assets/icon-arrow-right.svg"}
            alt={""}
            size="sm"
            isClickable={true}
            onClick={onClick}
          />
        </span>
      }
    />
  );
}

export default Invoice;
