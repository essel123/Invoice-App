import Headline from "../Headline/Headline";
import { Text } from "../Text/Text";
import Icon from "../Icon/Icon";

import './no__invoice.css'

function No__Invoice() {
  return (
    <div className="no__invoice">
      <section>
        <Icon
          src="../assets/illustration-empty.svg"
          alt={"image of illustration"}
        />
       <div className="text__area">
       <Headline variant="h2" children={"There is nothing here"} />
        <Text
          variant="center"
          children={
            <span className="span">
              Create an invoice by clicking the 
              <strong>New Invoice</strong> button and get started
            </span>
          }
        />
       </div>
      </section>
    </div>
  );
}

export default No__Invoice;
