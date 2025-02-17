import React, { useState } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {

  const [userMessage, setuserMessage] = useState(null)
  const [ErrorMessage, setErrorMessage] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let navigate=useNavigate()
  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Not less than 3 chars")
      .max(18, "Not more than 18 chars"),
    email: Yup.string()
      .required("Email is required")
      .email("Not a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Not a valid password"),
    rePassword: Yup.string()
      .required("Re-enter password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Not a valid phone number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  async function registerForm(values) {
    setisLoading(true)
    return await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    ).then((data)=>{
      console.log(data.data.message);
      setuserMessage(data.data.message)
      setisLoading(false)
      navigate('/login')
    }).catch((err)=>{
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
      setisLoading(false)
      
    });
    
  }

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-main text-3xl">Register Now</h1>
      {userMessage?<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <p>{userMessage}</p>
</div>:null}
{ErrorMessage?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{ErrorMessage}</p>
</div>:null}
      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div className="my-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Trigger validation on blur
            value={formik.values.name}
            name="name"
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

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

        {/* Re-Password Field */}
        <div className="my-2">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Re-password:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            name="rePassword"
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>

        {/* Phone Field */}
        <div className="my-2">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="my-4 text-end">
          {isLoading?<button
            type="submit"
            className="bg-main text-white px-4 py-2 rounded-lg"
          >
            <i className="fa fa-spinner fa-spin"></i>
          </button>: <button
          disabled={!(formik.isValid&&formik.dirty)}
            type="submit"
            className="bg-main text-white px-4 py-2 rounded-lg"
          >
            Register now
          </button>}
         
          
        </div>
      </form>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Sign-up</title>
            </Helmet>
    </div>
  );
}
