import React from "react";
import styles from "./input.module.css";

import { Text } from "../Text/Text";

interface InputFieldProps {
  type: string;
  value: string;
  label: string;
  name: string;
  error: string | undefined | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  label,
  name,
  error,

  onChange
}) => {
  return (
    <label htmlFor={label} className={styles.inputLabel}>
      <Text variant="caption">
        {label}
        <span className={styles.error}>
          {error}
        </span>
      </Text>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.inputField}
      />
    </label>
  );
};

export default InputField;
