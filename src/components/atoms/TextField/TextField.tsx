import { FieldError, UseFormRegister } from "react-hook-form";
import styles from '../../molecules/Form/form.module.css'
import { Text } from "../Text/Text";
interface InputFieldProps {
  label: React.ReactNode;
  register: UseFormRegister<any>;
  name: string;
  validation?: any;
  error?: FieldError;
  type?: string;
  value?: string | number | readonly string[] | undefined
  placeholder?: string;
}

const InputField = ({ label, register, name, validation, error, type,value,placeholder }: InputFieldProps) => (
  <div className={styles.input__field}>
    <div className={styles.error__label}>
      <label>{label}</label>
      {error && <Text class_="error" children={`${error.message}`} />}
    </div>
    <input
    placeholder={placeholder}
      className={`${error ? styles.error : ''}`}
      type={type}
      aria-invalid={!!error}
      {...register(name, validation)}
      value={value}
    />
  </div>
);



export default InputField;

