import Headline from "../../atoms/Headline/Headline";
import styles from "./delete.module.css";
import { Text } from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import {
  removeInvoice,
  setDialog,
  setNotification,
  setNotificationType
} from "../../../State/stateSlice";
import { useNavigate } from "react-router-dom";

type DeleteProps = {
  id?: string;
};
function Delete({ id }: DeleteProps) {
  const isOpen = useAppSelector(state => state.pageState.isOpen);

  const selectedInvoice = useAppSelector(
    state => state.pageState.selectedInvoice
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCancel = () => {
    dispatch(setDialog(!isOpen));
  };
  const handledDelete = () => {
    handleCancel();
    dispatch(removeInvoice(`${selectedInvoice}`));
    navigate("/");
    dispatch(setNotification(true));
    dispatch(setNotificationType("delete"));
    setTimeout(() => {
      dispatch(setNotification(false));
    }, 2000);
  };
  return (
    <div className={styles.deleteInvoiceCard}>
      <div className={styles.deleteInvoice}>
        <Headline variant="h3" children={"Confirm Deletion"} />
        <Text
          class_="caption"
          children={
            <span className="span">
              Are you sure you want to delete invoice # {id || "n/a"}? This
              action cannot be undone.
            </span>
          }
        />

        <div className={styles.actionButtons}>
          <Button
            size={"lg"}
            radius={"full"}
            bgColor={"tertiary"}
            children={<span>Cancel</span>}
            onClick={handleCancel}
          />
          <Button
            size={"lg"}
            radius={"full"}
            bgColor={"danger"}
            children={<span>Delete</span>}
            onClick={handledDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Delete;
