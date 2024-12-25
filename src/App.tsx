import "./App.css";
import Invoice from "./components/molecules/Invoice/Invoice";

import data from "./assets/data.json";
import Sidebar from "./components/molecules/SideBar/SidebAr";

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
  return (
    <section className="home">
       <Sidebar />
      <div className="scroll">
        {Inovices}
      </div>
    </section>
  );
}

export default App;
