import Badge from "../../atoms/Badge/Badge";
import Headline from "../../atoms/Headline/Headline";
import Icon from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";
import styles from "./invoice.module.css";

type InvoiceProps = {
  status: string;
  paymentDue: string;
  clientName: string;
  total: number;
  id:string;
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
    <div className={styles.invoice}>
      <Headline children={`#${id}`} className="headline" />
      <Text children={paymentDue} />
      <Text children={clientName} />
      <Headline children={`£${total}`} />
      <Badge status={status} />

      <Icon
        src={"../../../../public/assets/icon-arrow-right.svg"}
        alt={""}
        size="sm"
        isClickable={true}
        onClick={() => onClick}
      />
    </div>
  );
}

export default Invoice;
