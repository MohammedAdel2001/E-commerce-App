import React, { useContext, useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
  const [paymentType, setpaymentType] = useState(null)
 let {onlinePayment,CashPayment}=useContext(CartContext)
  let navigate = useNavigate();
  let {state}=useLocation()
 console.log(state);
 useEffect(() => {
   setpaymentType(state.type)
 }, [])
 
 
  let mySchema = Yup.object({
      city: Yup.string()
        .required("Name is required")
        .min(3, "Not less than 3 chars")
        .max(18, "Not more than 18 chars"),
      details: Yup.string()
        .required("Name is required")
        .min(3, "Not less than 3 chars")
        .max(18, "Not more than 18 chars"),
     
      
      
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^(002)?01[0125][0-9]{8}$/, "Not a valid phone number"),
    });
   let formik = useFormik({
      initialValues: {
       details: "",
        phone: "",
        city: ""
      }, validationSchema: mySchema,
     
      onSubmit: (values) => {
        PayOnline(values);
      },
    });
   
 
   async function PayOnline(values) {
    // await onlinePayment(values)
    if(paymentType=='online payment'){
      await onlinePayment(values)
    }else{
      await CashPayment(values)
    }
   }
  return (
    <>
    <div className="w-3/4 mx-auto">
    <h1 className='text-main text-lg font-extrabold'>{paymentType}</h1>
    <form onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <div className="my-2 py-6">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Details
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            name="details"
            type="text"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="text-red-500 text-sm">{formik.errors.details}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="my-2 pb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            phone
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
        <div className="my-2 pb-6">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            city
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            name="city"
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="my-4 text-end">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className=" !bg-white border !border-cyan-400 !text-cyan-400 py-2 hover:!bg-cyan-400 hover:!text-black hover:!border hover:!border-cyan-400  w-full px-4  rounded-lg"
            >
              Pay now
            </button>
          
        </div>
      </form>
      </div>
   
    </>
  )
}
