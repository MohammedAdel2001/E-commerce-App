import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  let {addToCart} = useContext(CartContext);
    
    async function addProductToCart(productId) {
      let response=await addToCart(productId)
      console.log(response);
      
    }
  let { id } = useParams();
  console.log(id);
  const [ProductDetails, setProductDetails] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function GetProductDetails() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProductDetails(data?.data.data);
        setisLoading(false);
        console.log(data?.data.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setisLoading(false);
      });
  }

  useEffect(() => {
    GetProductDetails();
  }, []);

  return (
    <>
      <div className="lg:max-w-screen-xl md:container mx-auto pt-6 pb-16">
        {isLoading ? <Loader /> : null}
        <div className="flex items-center">
          <div className="w-2/6">
            {/* <img src={ProductDetails.imageCover} alt="" /> */}
            <Slider {...settings}>
              {ProductDetails?.images?.map((src) => (
                <img src={src} alt="" />
              ))}
            </Slider>
          </div>
          
          <div className="w-4/6  ms-4">
            <h1 className="text-black font-bold text-2xl my-5">
              {ProductDetails.title}
            </h1>
            <h3 className="text-gray-700 my-5">{ProductDetails.description}</h3>

            <div className="flex justify-between align-center">
              <p className="">{ProductDetails.price} EGp</p>
              <div className="">
                <i className="rating-color fa fa-star"></i>
                {ProductDetails.ratingsAverage}
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={()=>addProductToCart(ProductDetails._id)} className="btn bg-main w-9/12 mt-4 rounded-lg text-white px-3 py-2">
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>ProductDetails Component</title>
                
            </Helmet>
    </>
  );
}
