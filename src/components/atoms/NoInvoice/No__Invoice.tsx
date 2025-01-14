import Headline from "../Headline/Headline";
import { Text } from "../Text/Text";
import Icon from "../Icon/Icon";

function No__Invoice() {
  return (
    <div className="no__invoice">
      <section>
        <Icon
          src="../assets/illustration-empty.svg"
          alt={"image of illustration"}
        />
        <Headline variant="h2" children={"There is nothing here"} />
        <Text
          variant="caption"
          children={
            <span className="span">
              Create an invoice by clicking the <br />{" "}
              <strong>New Invoice</strong> button and get started
            </span>
          }
        />
      </section>
    </div>
  );
}

export default No__Invoice;
