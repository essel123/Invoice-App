import Headline from "../../atoms/Headline/Headline";
import styles from "./delete.module.css";
import { Text } from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import {
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

  const refreshPage = () => {
    window.location.reload();
  };

  const token = useAppSelector(state => state.pageState.user.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCancel = () => {
    dispatch(setDialog(!isOpen));
  };

  const handledDelete = async () => {
    try {
      const response = await fetch(
        `https://invoice-app-bknd-strapi-cloud.onrender.com/invoices/${selectedInvoice.trim()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.ok) {
        handleCancel();
        navigate("/");
        dispatch(setNotification(true));
        dispatch(setNotificationType("delete"));
        setTimeout(() => {
          refreshPage();
        }, 2500);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setTimeout(() => {
        dispatch(setNotification(false));
      }, 2000);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setTimeout(() => {
        dispatch(setNotification(false));
      }, 2000);
    }
  };
  return (
    <div className={styles.deleteInvoiceCard}>
      <div className={styles.deleteInvoice}>
        <Headline variant="h3" children={"Confirm Deletion"} />
        <Text
          class_="caption"
          children={
            <span className="span">
              Are you sure you want to delete invoice{" "}
              <span className={styles.id__delete}># {id || "n/a"}</span> ? This
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
