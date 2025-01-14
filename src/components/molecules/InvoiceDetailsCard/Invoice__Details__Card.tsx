// InvoiceDetailsCard.tsx

import Headline from "../../atoms/Headline/Headline";
import styles from "./Invoice__Details__Card.module.css";
import { Text } from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import Header from "../../molecules/Header/Header";
import Icon from "../../atoms/Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import {
  setDelete,
  setDialog,
  setEdit,
  updateInvoiceStatusToPaid
} from "../../../State/stateSlice";
import { useNavigate } from "react-router-dom";

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceDetailsCardProps {
  senderAddress: Address;
  clientAddress: Address;
  clientName: string;
  clientEmail: string;
  invoiceDate: string;
  paymentTerms?: number;
  projectDescription: string;
  id: string;
  items: Item[];
  status: string;
  amountDue: number;
}

function AddressDetails({ address }: { address: Address }) {
  return (
    <div className={styles.Address}>
      <Text class_="description" children={`${address.street}`} />
      <Text class_="description" children={`${address.city}`} />
      <Text class_="description" children={`${address.postCode}`} />
      <Text  class_= "description" children={`${address.country}`} />
    </div>
  );
}

function InvoiceDetailsCard({
  senderAddress,
  clientAddress,
  clientEmail,
  clientName,
  invoiceDate,
  projectDescription,
  id,
  items,
  amountDue,
  status
}: InvoiceDetailsCardProps) {
  const navigate = useNavigate();

  const calculatePaymentDueDate = (date: string, terms?: number) => {
    const dueDate = new Date(date);
    if (terms) {
      dueDate.setDate(dueDate.getDate() + terms);
    }
    return dueDate.toDateString();
  };

  const isOpen = useAppSelector(state => state.pageState.isOpen);
  const dispatch = useAppDispatch();
  const selectedInvoice = useAppSelector(
    state => state.pageState.selectedInvoice
  );

  const handleEdit = () => {
    dispatch(setEdit(true));
    dispatch(setDelete(false));
    dispatch(setDialog(!isOpen));
  };

  const handleDelete = () => {
    dispatch(setDelete(true));
    dispatch(setDialog(!isOpen));

  };

  const handleMarkAsPaid = () => {
    dispatch(updateInvoiceStatusToPaid(selectedInvoice));
    navigate("/");
  };

  return (
    <section className={styles.invoice__details}>
      <Headline
        children={
          <div className={styles.goBack} onClick={() => navigate("/")}>
            <Icon
              size="sm"
              isClickable={true}
              src="../assets/icon-arrow-left.svg"
              alt={"go back"}
              onClick={() => navigate("/")}
            />Go back
          </div>
        }
      />
      <header className={styles.header}>
        <Header
          leftElements={
            <div className={styles.leftElements}>
              <Text children={"Status"} class_={status} />{" "}
              <Badge status={status} />
            </div>
          }
          rightElements={
            <div className={styles.rightElements}>
              <Button
                size={"lg"}
                radius={"full"}
                bgColor={"tertiary"}
                onClick={handleEdit}
                children={"Edit"}
              />
              <Button
                size={"lg"}
                radius={"full"}
                bgColor={"danger"}
                children={"Delete"}
                onClick={handleDelete}
              />
              <Button
                size={"lg"}
                radius={"full"}
                bgColor={"primary"}
                children={"Mark as Paid"}
                onClick={handleMarkAsPaid}
              />
            </div>
          }
        />
      </header>
      <div className={styles.card}>
        <div className={styles.senderInfo}>
          <div>
            <Headline
              variant="h4"
              children={
                <span>
                  #{id}
                </span>
              }
            />
            <Text children={`${projectDescription}`} />
          </div>
          <AddressDetails address={senderAddress} />
        </div>

        <div className={styles.recipientInfo}>
          <div className={styles.left}>
            <Text class_="caption" children={"Invoice Date"} />
            <Headline children={`${invoiceDate}`} />
            <br />
            <Text class_="caption" children={"Payment Due"} />
            <Headline children={calculatePaymentDueDate(invoiceDate, 30)} />
          </div>
          <div className={styles.right}>
            <Text class_="caption" children={"Bill To"} />
            <Headline children={`${clientName}`} />
            <br />
            <AddressDetails address={clientAddress} />
          </div>
          <div className={styles.email}>
            <Text class_="caption" children={"Sent to"} />
            <Headline
              children={
                <span>
                  {clientEmail}
                </span>
              }
            />
          </div>
        </div>

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
                {items.map((item, index) =>
                  <tr key={index}>
                    <td>
                      <Text children={item.name} />
                    </td>
                    <td>
                      <Text children={`${item.quantity}`} />
                    </td>
                    <td>
                      <Text children={`£${item.price}`} />
                    </td>
                    <td>
                      <Text children={`£${item.total}`} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.amountDue}>
            <Text children={"Amount Due"} />
            <Headline children={`£${amountDue}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvoiceDetailsCard;
