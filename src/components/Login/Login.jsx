import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { Helmet } from "react-helmet";
export default function Login() {
  const [userMessage, setuserMessage] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  let { Token, setToken } = useContext(TokenContext);
  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Not a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Not a valid password"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      LoginForm(values);
    },
  });

  async function LoginForm(values) {
    setisLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        console.log(data.data.token);
        //1-save to local storage
        localStorage.setItem("userToken", data.data.token);
        //2-save token to token context

        setToken(data.data.token);

        setuserMessage(data.data.message);
        setisLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
        setisLoading(false);
      });
  }

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-main text-3xl">Login Now</h1>
      {userMessage ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <p>{userMessage}</p>
        </div>
      ) : null}
      {ErrorMessage ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <p>{ErrorMessage}</p>
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <div className="my-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="my-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="my-4 text-end">
          {isLoading ? (
            <button
              type="submit"
              className="bg-main text-white px-4 py-2 rounded-lg"
            >
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="bg-main text-white px-4 py-2 rounded-lg"
            >
              Login now
            </button>
          )}
        </div>
      </form>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Sign-in</title>
            </Helmet>
    </div>
  );
}
