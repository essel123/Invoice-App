import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { addInvoice, setDialog, setNotification, setNotificationType } from "../../../State/stateSlice";
import Button from "../../atoms/Button/Button";
import Headline from "../../atoms/Headline/Headline";
import Icon from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";
import styles from "./form.module.css";
import InputField from "../../atoms/TextField/TextField";
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

interface FormData {
  id: string;
  senderAddress: Address;
  clientAddress: Address;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  paymentTerms: number;
  description: string;
  status: string;
  items: Item[];
  total: number;
}


function Form() {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(state => state.pageState.isEdit);
  const selectedInvoice = useAppSelector(state => state.pageState.selectedInvoice);
  const isOpen = useAppSelector(state => state.pageState.isOpen);
  const [items, setItems] = useState<Item[]>([]);

  const generateInvoiceId = () => {
    const letters = Array.from({ length: 2 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    return `${letters}${numbers}`;
  };

  const handleChange = (index: number, field: keyof Item, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value as never;
    if (field === "price" || field === "quantity") {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (items: Item[]) => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    setValue('total', total);
  };



  const defaultValues: FormData = {
    id: generateInvoiceId(),
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    clientAddress: { street: "", city: "", postCode: "", country: "" },
    clientName: "",
    clientEmail: "",
    createdAt: "",
    paymentTerms: 1,
    description: "",
    items: [],
    status: 'pending',
    total: 0
  };

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({ defaultValues });

  const onSubmit = (data: FormData, status: string) => {
     defaultValues.items = items;
    const invoiceData = {
      ...data,
      status,
      items,
      paymentDue: new Date(new Date().setDate(new Date(data.createdAt).getDate() + data.paymentTerms)).toISOString().split('T')[0],
    };
    dispatch(addInvoice(invoiceData));
    dispatch(setDialog(!isOpen));
    dispatch(setNotification(true));
    dispatch(setNotificationType('create'))
    setTimeout(() => {
      dispatch(setNotification(false));
    }, 2000);
  };

  const handleSaveAsDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('status', 'draft');
    handleSubmit((data) => onSubmit(data, 'draft'))();
  };

  const handleSaveAndSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('status', 'pending');
    handleSubmit((data) => onSubmit(data, 'pending'))();
  };

  const handleDiscard = () => {
    reset();
  };

  return (
    <div className={styles.form__page}>
      <Headline variant="h1">{isEdit ? `Edit #${selectedInvoice}` : 'New Invoice'}</Headline>
      <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data, 'pending'))}>
        <div className={styles.bill__sender}>
          <Headline className="form__captions" variant="h4">Bill From</Headline>
          <InputField
            label={<Text children={"Street Address"} />}
            register={register}
            name="senderAddress.street"
            validation={{ required: "Street Address is required" }}
            error={errors.senderAddress?.street}
          />
          <div className={styles.form__group}>
            <InputField
              label={<Text children={"City"} />}
              register={register}
              name="senderAddress.city"
              validation={{ required: "Required" }}
              error={errors.senderAddress?.city}
            />
            <InputField
              label={<Text children={"Post Code"} />}
              register={register}
              name="senderAddress.postCode"
              validation={{ required: "Required" }}
              error={errors.senderAddress?.postCode}
            />
            <InputField
              label={<Text children={"Country"} />}
              register={register}
              name="senderAddress.country"
              validation={{ required: "Required" }}
              error={errors.senderAddress?.country}
            />
          </div>

          {/* Client Address */}
          <div className={styles.bill__reciever}>
            <Headline className="form__captions" variant="h4">Bill To</Headline>
            <InputField
              label={<Text children={"Client’s Name"} />}
              register={register}
              name="clientName"
              validation={{ required: "Client’s Name is required" }}
              error={errors.clientName}
            />
            <InputField
              label={<Text children={"Client’s Email"} />}
              register={register}
              name="clientEmail"
              validation={{
                required: "Client’s Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Invalid email address"
                }
              }}
              error={errors.clientEmail}
            />
            <InputField
              label={<Text children={"Street Address"} />}
              register={register}
              name="clientAddress.street"
              validation={{ required: "Client’s Street Address is required" }}
              error={errors.clientAddress?.street}
            />
            <div className={styles.form__group}>
              <InputField
                label={<Text children={"City"} />}
                register={register}
                name="clientAddress.city"
                validation={{ required: "Required" }}
                error={errors.clientAddress?.city}
              />
              <InputField
                label={<Text children={"Post Code"} />}
                register={register}
                name="clientAddress.postCode"
                validation={{ required: "Required" }}
                error={errors.clientAddress?.postCode}
              />
              <InputField
                label={<Text children={"Country"} />}
                register={register}
                name="clientAddress.country"
                validation={{ required: "Required" }}
                error={errors.clientAddress?.country}
              />
            </div>
            <div className={styles.form__group}>
              <InputField
                type={"date"}
                label={<Text class_="caption" children={"Invoice Date"} />}
                register={register}
                name="createdAt"
                validation={{ required: "Required" }}
                error={errors.createdAt}
              />
              <div>
                <Text class_="caption" children={"Payment Terms"} />
                <select
                  {...register("paymentTerms", { required: "Payment Terms is required" })}
                  className={`${styles.paymentTerms} ${errors.paymentTerms ? styles.error : ''}`}
                  aria-invalid={!!errors.paymentTerms}
                >
                  <option value="1">Next 1 Day</option>
                  <option value="7">Next 7 Days</option>
                  <option value="14">Next 14 Days</option>
                  <option value="30">Next 30 Days</option>
                </select>
                {errors.paymentTerms && <Text class_="error" children={`${errors.paymentTerms.message}`} />}
              </div>
            </div>
            <InputField
              label={<Text children={"Project Description"} />}
              register={register}
              name="description"
              validation={{ required: "Project Description is required" }}
              error={errors.description}
            />

            {items.length > 0 && (
              <div>
                <div className={styles.items__header}>
                  <Text class_="caption" children="Item Name" />
                  <Text class_="caption" children="Qty." />
                  <Text class_="caption" children="Price" />
                  <Text class_="caption" children="Total" />
                </div>
                <div className={styles.itemTable}>
                  {items.map((item, index) => (
                    <div key={index} className={styles.itemRow}>
                      <input
                        className={styles.itemName}
                        type="text"
                        value={item.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        aria-label="Item Name"
                      />
                      <input
                        className={styles.quantity}
                        type="text"
                        value={item.quantity}
                        onChange={(e) => handleChange(index, "quantity", e.target.value)}
                        aria-label="Quantity"
                      />
                      <input
                        className={styles.price}
                        type="text"
                        value={item.price}
                        onChange={(e) => handleChange(index, "price", e.target.value)}
                        aria-label="Price"
                      />
                      <Text children={item.total} />
                      <Icon src={"../assets/icon-delete.svg"} alt={" image of delete icon"} isClickable={true} size="sm" onClick={() => alert(index)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              size="lg"
              radius="full"
              bgColor="tertiary"
              children={<span className={styles.addinvoicebtn}><Icon src={"../assets/lus.svg"} alt={""} />Add New Item</span>}
              btnwidth="addbtn"
              onClick={(e) => {
                e.preventDefault();
                setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
              }}
            />
            <div className={styles.vertical__spacer} />
          </div>
        </div>

        {isEdit ? (
          <div className={styles.edit__action__buttons}>
            <Button size="lg" radius="full" bgColor="tertiary" children={"cancel"} onClick={handleSaveAsDraft} />
            <Button size="lg" radius="full" bgColor="primary" children={"Save Changes"} onClick={handleSaveAndSend} />
          </div>
        ) : (
          <div className={styles.action__buttons}>
            <Button onClick={(e) => { e.preventDefault(); handleDiscard(); }} size="lg" radius="full" bgColor="tertiary" children={"Discard"} />
            <div className={styles.right__action_buttons}>
              <Button size="lg" radius="full" bgColor="danger" children={"Save as Draft"} onClick={handleSaveAsDraft} />
              <Button size="lg" radius="full" bgColor="primary" children={"Save & Send"} onClick={handleSaveAndSend} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
