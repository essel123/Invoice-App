import { useForm } from "react-hook-form";
import InputField from "../../atoms/TextField/TextField";
import styles from "./loginpage.module.css";
import Button from "../../atoms/Button/Button";
import { Text } from "../../atoms/Text/Text";
import Headline from "../../atoms/Headline/Headline";
import LoadingSpinner from "../../atoms/Loader/Loader";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { setDialog, setUser } from "../../../State/stateSlice";
const  LoginPage = () => {
  type formData = {
    username: string;
    password: string;
  };

  type userSignInDataType = {
    username: string;
    password: string;
    token: string;
    loggedIn: boolean;
  }



  const { register, handleSubmit, formState: { errors } } = useForm<formData>();

const [loading, setLoading] = useState(false);
const login = useAppSelector(state => state.pageState.user.loggedIn);
const dispatch = useAppDispatch();


const userData = (data: formData,token:string): userSignInDataType => {
    return { ...data, token, loggedIn: true };
}
const fetchLogin = async (data: formData) => {
    setLoading(true);
    try {
        const response = await fetch("https://invoice-app-bknd-strapi-cloud.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
         
        const data_ =  userData(data, result.token);
         dispatch(setDialog(!login));
         dispatch(setUser({ user: data_ }));
    } catch (error) {
        console.error("Login failed:", error);
    } finally {
        setLoading(false);
    }
};

const onSubmit = (data: formData) => {
    fetchLogin(data);
    dispatch(setDialog(false));
};

return (
    <section className={styles.loginpage}>
        {loading && <LoadingSpinner />}
        <div className={styles.login__form}>
            <Headline children={"Login"} variant="h2" />
            <form onSubmit={handleSubmit(data => onSubmit(data))}>
                <InputField
                    label={<Text class_={`${errors.username ? "error" : ""}`} children={"Email"} />}
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
                    label={<Text class_={`${errors.password ? "error" : ""}`} children={"Password"} />}
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
                    onClick={() => null}
                    children={"Login"}
                />
            </form>
        </div>
    </section>
);
}


export default  LoginPage
