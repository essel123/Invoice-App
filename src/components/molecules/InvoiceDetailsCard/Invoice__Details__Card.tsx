import Headline from "../../atoms/Headline/Headline";
import styles from "./Invoice__Details__Card.module.css";

import { Text } from "../../atoms/Text/Text";
function Invoice__Details__Card() {
  return (
    <div className={styles.card}>
      <div className={styles.senderInfo}>
        <div className="">
          <Headline variant="h4" children={<span>#XM9141</span>} />
          <Text children={"Graphic Design"} />
        </div>
        <div className={styles.Address}>
          <Text children={"19 Union Terrace"} />
          <Text children={"London "} />
          <Text children={"E1 3EZ"} />
          <Text children={"United Kingdom"} />
        </div>
      </div>

      <div className={styles.recipientInfo}>
        <div>
          <Text class_="caption" children={"Invoice Date"} />
          <Headline children={"21 Aug 2021"} />
          <Text class_="caption" children={"Payment Due"} />
          <Headline children={"20 Sep 2021"} />
        </div>
        <div className={""}>
          <Text class_="caption" children={"Bill To"} />
          <Headline children={"Alex Grim"} />
          <Text class_="caption" children={"84 Church Way"} />
          <Text class_="caption" children={"Bradford"} />
          <Text class_="caption" children={"BD1 9PB"} />
          <Text class_="caption" children={"United Kingdom"} />
        </div>
        <div className={styles.email}>
          <Text class_="caption" children={"Sent to"} />
          <Headline children={<span>alexgrim@mail.com</span>} />
        </div>
      </div>
      <div />
      <div className={styles.itemsAmount}>
        <div className={styles.items}>
          <table>
            <thead>
              <tr>
                <th>
                  <Text children={"Item Name"} />
                </th>
                <th>
                  <Text children={"QTY."} />
                </th>
                <th>
                  <Text children={"Price"} />
                </th>
                <th>
                  <Text children={"Total"} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Text children={"Graphic Design"} />
                </td>
                <td>
                  <Text children={"1"} />
                </td>
                <td>
                  <Text children={"£556.00"} />
                </td>
                <td>
                  <Text children={"£556.00"} />
                </td>
                
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.amountDue}>
          <Text children={"Amount Due"} />
          <Headline children={`£${`556.00`}`} />
        </div>
      </div>
    </div>
  );
}

export default Invoice__Details__Card;
