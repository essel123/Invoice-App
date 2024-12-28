import { useForm, Controller } from "react-hook-form";
import Button from "../../atoms/Button/Button";
import Headline from "../../atoms/Headline/Headline";
import InputField from "../../atoms/Input/InputField";
import styles from "./form.module.css";

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface FormData {
  senderAddress: Address;
  clientAddress: Address;
  clientName: string;
  clientEmail: string;
  invoiceDate: string;
  paymentTerms: number;
  projectDescription: string;
}

const defaultValues: FormData = {
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: ""
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: ""
  },
  clientName: "",
  clientEmail: "",
  invoiceDate: "",
  paymentTerms: 1,
  projectDescription: ""
};

function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({ defaultValues });

  const onSubmit = (data: FormData) => {
    console.log("Form data submitted", data);
    // Handle submission logic here
  };

  const handleDiscard = () => {
    reset();
    alert("Form discarded");
  };

  return (
    <div className={styles.form__page}>
      <Headline variant="h1">New Invoice</Headline>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.bill__sender}>
          <Headline className="form__captions" variant="h4">
            Bill From
          </Headline>
          <Controller
            name="senderAddress.street"
            control={control}
            rules={{ required: "Street Address is required" }}
            render={({ field }) => (
              <InputField
                label="Street Address"
                type="text"
                {...field}
                error={errors.senderAddress?.street?.message}
              />
            )}
          />
          <div className={styles.form__group}>
            <Controller
              name="senderAddress.city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <InputField
                  label="City"
                  type="text"
                  {...field}
                  error={errors.senderAddress?.city?.message}
                />
              )}
            />
            <Controller
              name="senderAddress.postCode"
              control={control}
              rules={{ required: "Post Code is required" }}
              render={({ field }) => (
                <InputField
                  label="Post Code"
                  type="text"
                  {...field}
                  error={errors.senderAddress?.postCode?.message}
                />
              )}
            />
            <Controller
              name="senderAddress.country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <InputField
                  label="Country"
                  type="text"
                  {...field}
                  error={errors.senderAddress?.country?.message}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.bill__reciever}>
          <Headline className="form__captions" variant="h4">
            Bill To
          </Headline>
          <Controller
            name="clientName"
            control={control}
            rules={{ required: "Client’s Name is required" }}
            render={({ field }) => (
              <InputField
                label="Client’s Name"
                type="text"
                {...field}
                error={errors.clientName?.message}
              />
            )}
          />
          <Controller
            name="clientEmail"
            control={control}
            rules={{
              required: "Client’s Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <InputField
                label="Client’s Email"
                type="email"
                {...field}
                error={errors.clientEmail?.message}
              />
            )}
          />
          <Controller
            name="clientAddress.street"
            control={control}
            rules={{ required: "Client’s Street Address is required" }}
            render={({ field }) => (
              <InputField
                label="Street Address"
                type="text"
                {...field}
                error={errors.clientAddress?.street?.message}
              />
            )}
          />
          <div className={styles.form__group}>
            <Controller
              name="clientAddress.city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <InputField
                  label="City"
                  type="text"
                  {...field}
                  error={errors.clientAddress?.city?.message}
                />
              )}
            />
            <Controller
              name="clientAddress.postCode"
              control={control}
              rules={{ required: "Post Code is required" }}
              render={({ field }) => (
                <InputField
                  label="Post Code"
                  type="text"
                  {...field}
                  error={errors.clientAddress?.postCode?.message}
                />
              )}
            />
            <Controller
              name="clientAddress.country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <InputField
                  label="Country"
                  type="text"
                  {...field}
                  error={errors.clientAddress?.country?.message}
                />
              )}
            />
          </div>
          <div className={styles.form__group}>
            <Controller
              name="invoiceDate"
              control={control}
              rules={{ required: "Invoice Date is required" }}
              render={({ field }) => (
                <InputField
                  label="Invoice Date"
                  type="date"
                  {...field}
                  error={errors.invoiceDate?.message}
                />
              )}
            />
            <Controller
              name="paymentTerms"
              control={control}
              rules={{ required: "Payment Terms is required" }}
              render={({ field }) => (
                <InputField
                  label="Payment Terms"
                  type="number"
                  {...field}
                  error={errors.paymentTerms?.message}
                />
              )}
            />
          </div>
          <Controller
            name="projectDescription"
            control={control}
            rules={{ required: "Project Description is required" }}
            render={({ field }) => (
              <InputField
                label="Project Description"
                type="text"
                {...field}
                error={errors.projectDescription?.message}
              />
            )}
          />
        </div>
        <div className={styles.action__buttons}>
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleDiscard();
            }}
            size="lg"
            radius="full"
            bgColor="tertiary"
            children={"Discard"}
          />
          <div className={styles.right__action_buttons}>
            <Button
              size="lg"
              radius="full"
              bgColor="danger"
              children={"Save as Draft"}
            />
            <Button
              size="lg"
              radius="full"
              bgColor="primary"
              children={"Save & Send"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
