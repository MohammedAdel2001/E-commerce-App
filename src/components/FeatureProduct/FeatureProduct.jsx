import React, { useContext, useEffect, useState } from "react";
import styles from "./FeatureProduct.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
export default function FeatureProduct() {

  let {addToCart} = useContext(CartContext);
  
  async function addProductToCart(productId) {
    let response=await addToCart(productId)
    console.log(response);
    
  }
  
  // const [Products, setProducts] = useState([]);
  // const [isLoading, setisLoading] = useState(true)

  // async function GetProducts() {
  //   return await axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((data) => {
  //       console.log(data.data.data);
  //       setProducts(data.data.data);
  //       setisLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setisLoading(false)
  //     });
  // }

  // useEffect(() => {
  //   GetProducts();
  // }, []);
  //                       We will replace the previous with reactQuery...

  let { isError, isLoading, data, error, isFetching } = useQuery({
    queryKey: ["featureProduct"],
    queryFn: getAllProducts,
  });

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  return (
    <>
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto md:px-5 sm:px-10 lg:px-0  ">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap ">
            {data?.data.data.map((product) => (
              <div
                key={product._id}
                className="sm:w-full md:w-1/2 lg:w-1/4 px-2"
              >
                <div className="product ">
                  <Link to={`/productdetails/${product._id}`}>
                    <img src={product.imageCover} alt="" />
                    <h3 className="text-main ">{product.category.name}</h3>
                    <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                    <div className="flex justify-between align-center">
                      <div>{product.price} EGp</div>
                      <div>
                        <i className="rating-color fa fa-star"></i>{" "}
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center">
                    <button onClick={()=>addProductToCart(product._id)} className="btn bg-main w-52  rounded-lg text-white px-3 py-2">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
