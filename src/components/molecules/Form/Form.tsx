import { useForm } from "react-hook-form";
import Button from "../../atoms/Button/Button";
import Headline from "../../atoms/Headline/Headline";
import styles from "./form.module.css";

import { Text } from "../../atoms/Text/Text";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { addInvoice, setDialog } from "../../../State/stateSlice";

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

const InputField = ({ label, register, name, validation, error, type }: any) => (
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
            <InputField
              label={<Text class_="caption" children={"Payment Terms"} />}
              register={register}
              name="paymentTerms"
              validation={{ 
                required: "Payment Terms is required",
                min: { value: 1, message: "Minimum 1 day required" },
                max: { value: 365, message: "Maximum 365 days allowed" }
              }}
              error={errors.paymentTerms}
            />
          </div>
          <InputField
            label= {<Text children={"Project Description"} />}
            register={register}
            name="description"
            validation={{ required: "Project Description is required" }}
            error={errors.description}
          />
          <div className={styles.vertical__spacer} />
        </div>
        </div>

        <div className={styles.action__buttons}>
          <Button onClick={(e) => { e.preventDefault(); handleDiscard(); }} size="lg" radius="full" bgColor="tertiary" children={"Discard"} />
          <div className={styles.right__action_buttons}>
            <Button size="lg" radius="full" bgColor="danger" children={"Save as Draft"} onClick={handleSaveAsDraft} />
            <Button size="lg" radius="full" bgColor="primary" children={"Save & Send"} onClick={handleSaveAndSend} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
