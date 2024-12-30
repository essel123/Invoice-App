import Dialog from "../../atoms/Dialog/Dialog";
import Delete from "../Delete/Delete";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";

import "../../../App.css";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/Header";
import Filter from "../../atoms/Filter/Filter";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Headline from "../../atoms/Headline/Headline";
import { Text } from "../../atoms/Text/Text";
import Invoice from "../Invoice/Invoice";
import {
  setDelete,
  setDialog,
  setEdit,
  setSelectedInvoice
} from "../../../State/stateSlice";
import Form from "../Form/Form";
import { Route, Routes, useNavigate } from "react-router-dom";
import InvoiceDetailsCard from "../InvoiceDetailsCard/Invoice__Details__Card";
import No__Invoice from "../../atoms/NoInvoice/No__Invoice";

function Home() {
  const isDelete = useAppSelector(state => state.pageState.isDelete);
  const invoices = useAppSelector(state => state.pageState.invoices);
  const navigate = useNavigate();
  const isOpen = useAppSelector(state => state.pageState.isOpen);
  const selectedInvoice = useAppSelector(
    state => state.pageState.selectedInvoice
  );
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setDelete(false));
    dispatch(setEdit(false));
    dispatch(setDialog(!isOpen));
  };

  const InvoicesList = invoices.map(invoice =>
    <Invoice
      key={invoice.id}
      id={invoice.id}
      status={invoice.status}
      clientName={invoice.clientName}
      paymentDue={invoice.paymentDue}
      total={invoice.total}
      onClick={() => {
        navigate(`/invoice/${invoice.id}`);
        dispatch(setSelectedInvoice(invoice.id));
      }}
    />
  );

  const invoiceDetails = invoices.map(invoice => {
    if (invoice.id === selectedInvoice) {
      return (
        <InvoiceDetailsCard
          senderAddress={invoice.senderAddress}
          clientAddress={invoice.clientAddress}
          clientName={invoice.clientName}
          clientEmail={invoice.clientEmail}
          invoiceDate={invoice.createdAt}
          projectDescription={invoice.description}
          id={invoice.id}
          items={[]}
          status={invoice.status}
          amountDue={0}
        />
      );
    }
  });

  const Invoices = (
    <section>
      <Header
        leftElements={
          <div className="leftElements">
            <Headline children={"Invoices"} />
            <br />
            <Text
              class_="caption"
              children={` ${invoices.length === 0
                ? "No invoice"
                : `There are ${invoices.length} total invoices`}`}
            />
          </div>
        }
        rightElements={
          <div className="rightElements">
            <Filter
              onSelectionChange={selectedValues => {
                console.log(selectedValues);
              }}
              items={[
                { title: "Pending", value: "Pending" },
                { title: "Paid", value: "Paid" },
                { title: "Draft", value: "Draft" }
              ]}
            />
            <Button
              children={
                <span className="center">
                  <Icon src={"./assets/icon-plus.svg"} alt={""} /> New Invoice
                </span>
              }
              size={"lg"}
              radius={"full"}
              bgColor={"primary"}
              onClick={() => handleClick()}
            />
          </div>
        }
      />
      <div className="scrolling">
        {invoices.length === 0 ? <No__Invoice /> : InvoicesList}
      </div>
    </section>
  );

  return (
    <section className="home">
      <Dialog children={isDelete ? <Delete /> : <Form />} />
      <Sidebar />
      <main>
        {/* Routes for rendering content dynamically */}

        <Routes>
          <Route path="/" element={Invoices} />
          <Route
            path="/invoice/:id"
            element={
              <div className="scrolling">
                {invoiceDetails}
              </div>
            }
          />
        </Routes>
      </main>
    </section>
  );
}

export default Home;
