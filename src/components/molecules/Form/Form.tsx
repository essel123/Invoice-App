import { useForm } from "react-hook-form";
import Button from "../../atoms/Button/Button";
import Headline from "../../atoms/Headline/Headline";
import styles from "./form.module.css";
import { Text } from "../../atoms/Text/Text";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { addInvoice, setDialog } from "../../../State/stateSlice";
import { useState } from "react";

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

import { FieldError, UseFormRegister } from "react-hook-form";
import Icon from "../../atoms/Icon/Icon";

interface InputFieldProps {
  label: React.ReactNode;
  register: UseFormRegister<any>;
  name: string;
  validation?: any;
  error?: FieldError;
  type?: string;
}

const InputField = ({ label, register, name, validation, error, type }: InputFieldProps) => (
  <div className={styles.input__field}>
    <div className={styles.error__label}> 
      <label>{label} </label>{error &&  <Text class_="error" children={`${error.message}`} />}
    </div>
    <input 
      className={`${error ? styles.error : ''}`} 
      type={type} 
      aria-invalid={!!error}
      {...register(name, validation)} 
    />
  </div>
);


function Form() {
  function generateInvoiceId() {
    const letters = Array.from({ length: 2 }, () => 
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    const numbers = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 10)
    ).join('');
    return `${letters}${numbers}`;
  }

  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(state => state.pageState.isEdit);
  const selectedInvoice = useAppSelector(state => state.pageState.selectedInvoice);
  const isOpen = useAppSelector(state => state.pageState.isOpen);

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
    const invoiceData = {
      ...data,
      status,
      paymentDue: new Date(new Date().setDate(new Date(data.createdAt).getDate() + data.paymentTerms)).toISOString(),
    };
    dispatch(addInvoice(invoiceData));
    dispatch(setDialog(!isOpen));
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

  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, total: 0 }
  ]);

  // Handle input changes
  const handleChange = (index: number, field: keyof Item, value: string | number) => {
    const updatedItems = [...items];

    // Update the value of the specified field
    updatedItems[index][field] = value as never;

    // Calculate total if price or quantity changes
    if (field === "price" || field === "quantity") {
      updatedItems[index].total =
        updatedItems[index].quantity * updatedItems[index].price;
    }
    setItems(updatedItems);
  };
  return (
    <div className={styles.form__page}>
      <Headline variant="h1"> {isEdit ? `Edit #${selectedInvoice}` : 'New Invoice'}</Headline>
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
            label= {<Text children={"Street Address"} />}
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
            label= {<Text children={"Project Description"} />}
            register={register}
            name="description"
            validation={{ required: "Project Description is required" }}
            error={errors.description}
          />

        <div className={styles.items__header}>
          <Text class_="caption" children="Item Name" />
          <Text class_="caption" children="Qty." />
          <Text class_="caption" children="Price" />
          <Text class_="caption" children="Total" />
        </div>

        <div className="items">
                {items.map((item, index) => (
                  <div key={index} className={styles.itemRow}>
                    <input
                      type="text"
                      value={item.name}
                      placeholder="Item Name"
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                    />

                    <input
                      type="number"
                      value={item.quantity}
                      placeholder="Qty"
                      onChange={(e) =>
                        handleChange(index, "quantity", parseInt(e.target.value, 10))
                      }
                    />
                    <input
                      type="text"
                      value={item.price}
                      placeholder="Price"
                      onChange={(e) =>
                        handleChange(index, "price", parseFloat(e.target.value))
                      }
                    />
                  
                  </div>
                ))}
        </div>
       
           <Button size="lg" radius="full" bgColor="tertiary" children={<span><Icon src={"../assets/"} alt={""} />Add New Item</span>} btnwidth="addbtn" onClick={(e)=>{
            e.preventDefault();
            setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
           }} />
          <div className={styles.vertical__spacer} />
        </div>
       
        </div>

        {isEdit?<div className={styles.edit__action__buttons}>
         
            <Button size="lg" radius="full" bgColor="tertiary" children={"cancel"} onClick={handleSaveAsDraft} />
            <Button size="lg" radius="full" bgColor="primary" children={"Save Changes"} onClick={handleSaveAndSend} />
        
        </div>:<div className={styles.action__buttons}>
          <Button onClick={(e) => { e.preventDefault(); handleDiscard(); }} size="lg" radius="full" bgColor="tertiary" children={"Discard"} />
          <div className={styles.right__action_buttons}>
            <Button size="lg" radius="full" bgColor="danger" children={"Save as Draft"} onClick={handleSaveAsDraft} />
            <Button size="lg" radius="full" bgColor="primary" children={"Save & Send"} onClick={handleSaveAndSend} />
          </div>
        </div>}
      </form>
    </div>
  );
}

export default Form;
