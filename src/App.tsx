import "./App.css";
import Invoice from "./components/molecules/Invoice/Invoice";
import data from "./assets/data.json";
import Sidebar from "./components/molecules/SideBar/SideBar";
import Dialog from "./components/atoms/Dialog/Dialog";
import Form from "./components/molecules/Form/Form";
import InvoiceDetails from "./components/molecules/InvoiceDetails/InvoiceDetails";
import { useAppDispatch, useAppSelector } from "./State/hooks";
import { setDialog } from "./State/stateSlice";

function App() {
  const Inovices = data.map(invoice =>
    <Invoice
      id={invoice.id}
      key={invoice.id}
      status={invoice.status}
      clientName={invoice.clientName}
      onClick={() => null}
      paymentDue={invoice.paymentDue}
      total={invoice.total}
    />
  );

  const isOpen = useAppSelector(state => state.pageState.isOpen);
  const controller = useAppDispatch();
  const handleClick = () => {
    controller(setDialog(!isOpen));
  };

  return (
    <section className="home">
      <Dialog children={<Form />} />
      <Sidebar />
      <main>
        {/* <Header
          leftElements={
            <div>
              {" "}<Headline children={"Invoices"} />
              <Text children={"There are 7 total invoices"} />
            </div>
          }
          rightElements={
            <div>
              <Filter
                onSelectionChange={function(selectedValues: string[]): void {
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
                    {" "}<Icon src={"./assets/icon-plus.svg"} alt={""} /> New
                    Invoice
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
          {Inovices}
        </div> */}
        <InvoiceDetails />
      </main>
    </section>
  );
}

export default App;
