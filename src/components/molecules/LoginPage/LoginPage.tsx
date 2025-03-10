// LoginPage.tsx

import { useForm } from "react-hook-form";
import InputField from "../../atoms/TextField/TextField";
import styles from "./loginpage.module.css";
import Button from "../../atoms/Button/Button";
import { Text } from "../../atoms/Text/Text";
import Headline from "../../atoms/Headline/Headline";
import LoadingSpinner from "../../atoms/Loader/Loader";
import { useState } from "react";
import { useAppDispatch } from "../../../State/hooks";
import { setUser } from "../../../State/stateSlice";

const LoginPage = () => {
  type FormData = {
    username: string;
    password: string;
  };

  type UserSignInDataType = {
    username: string;
    password: string;
    token: string;
    loggedIn: boolean;
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Create user data with token and loggedIn status
  const userData = (data: FormData, token: string): UserSignInDataType => {
    return { ...data, token, loggedIn: true };
  };

  // Authenticate user with API request
  const authenticateUser = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://invoice-app-bknd-strapi-cloud.onrender.com/login", // Can be moved to an env variable
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        const result = await response.json();
        const user = userData(data, result.token);

        dispatch(setUser({ user }));
      } else {
        throw new Error(`Login failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again."); // You can improve this to show a better error message
    } finally {
      setLoading(false);
    }
  };

  // On form submit
  const onSubmit = (data: FormData) => {
    authenticateUser(data);
  };

  return (
    <section className={styles.loginpage}>
      {loading && <LoadingSpinner />}
      <div className={styles.login__form}>
        <br />
        <Headline children={"Login"} variant="h2" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={
              <Text
                class_={`${errors.username ? "error" : ""}`}
                children={"Email"}
              />
            }
            register={register}
            name="username"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Invalid email address"
              }
            }}
            error={errors.username}
            placeholder="essel.abraham@amalitech.com"
          />
          <InputField
            label={
              <Text
                class_={`${errors.password ? "error" : ""}`}
                children={"Password"}
              />
            }
            register={register}
            name="password"
            type="password"
            validation={{ required: "Password is required" }}
            error={errors.password}
          />
          <Button
            btnwidth="loginbtn"
            size={"lg"}
            radius={"lg"}
            type="submit" // Ensures the button triggers form submission
            children={"Login"}
          />
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
