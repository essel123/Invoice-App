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
          <div className={styles.invoice__details}>
            <Headline children={`#${id}`} className="headline" />
            <Text children={paymentDue} />
            <span className={styles.desktopview}>
              <Text children={clientName} />
            </span>
            <span className={styles.desktopview}>
              <Headline children={`£${total}`} />
            </span>
          </div>
          <div className={styles.invoice__total}>
            <Text children={clientName} />
            <span className={styles.mobileview}>
              <Headline children={`£${total}`} />
            </span>
            <Badge status={status} />
          </div>
          <div className={styles.mobileview}>
            <Icon
              src={"../assets/icon-arrow-right.svg"}
              alt={"image of an arrow pointing right"}
              size="sm"
              isClickable={true}
              onClick={onClick}
            />
          </div>
        </span>
      }
    />
  );
}

export default Invoice;
