import Dialog from "../../atoms/Dialog/Dialog";
import Delete from "../Delete/Delete";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import data from "../../../assets/data.json";
import "../../../App.css";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/Header";
import Filter from "../../atoms/Filter/Filter";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Headline from "../../atoms/Headline/Headline";
import { Text } from "../../atoms/Text/Text";
import Invoice from "../Invoice/Invoice";
import { useState } from "react";
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
  const navigate = useNavigate();
  const isOpen = useAppSelector(state => state.pageState.isOpen);
  const selectedInvoice = useAppSelector(
    state => state.pageState.selectedInvoice
  );
  const dispatch = useAppDispatch();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const calculatePaymentDueDate = (date: string, terms?: number) => {
    const dueDate = new Date(date);
    if (terms) {
      dueDate.setDate(dueDate.getDate() + terms);
    }
    return dueDate.toDateString();
  };

  const handleClick = () => {
    dispatch(setDelete(false));
    dispatch(setEdit(false));
    dispatch(setDialog(!isOpen));
  };

  const handleFilterChange = (selectedValues: string[]) => {
    setSelectedFilters(selectedValues);
  };

  const filteredInvoices = data.filter(invoice => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(invoice.status);
  });

  const InvoicesList = filteredInvoices.map(invoice =>
    <Invoice
      key={invoice.id}
      id={invoice.id}
      status={invoice.status}
      clientName={invoice.clientName}
      paymentDue={`Due ${calculatePaymentDueDate(
        invoice.paymentDue,
        invoice.paymentTerms
      )}`}
      total={invoice.total}
      onClick={() => {
        navigate(`/invoice/${invoice.id}`);
        dispatch(setSelectedInvoice(invoice.id));
      }}
    />
  );

  const invoiceDetails = data.map(invoice => {
    if (invoice.id === selectedInvoice) {
      return (
        <InvoiceDetailsCard
          key={invoice.id}
          senderAddress={invoice.senderAddress}
          clientAddress={invoice.clientAddress}
          clientName={invoice.clientName}
          clientEmail={invoice.clientEmail}
          invoiceDate={invoice.createdAt}
          projectDescription={invoice.description}
          id={invoice.id}
          items={invoice.items}
          status={invoice.status}
          amountDue={invoice.total}
        />
      );
    }
    return null;
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
              children={
                filteredInvoices.length === 0
                  ? "No invoices"
                  : <div className="invoice__count">
                      <span className="desktopview">{`There are ${filteredInvoices.length} invoices`}</span>
                      <span className="mobileview">{`${filteredInvoices.length} invoices`}</span>
                    </div>
              }
            />
          </div>
        }
        rightElements={
          <div className="rightElements">
            <Filter
              onSelectionChange={handleFilterChange}
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
        {filteredInvoices.length === 0 ? <No__Invoice /> : InvoicesList}
      </div>
    </section>
  );

  return (
    <section className="home">
      <Dialog children={isDelete ? <Delete /> : <Form />} />
      <Sidebar />
      <main>
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
