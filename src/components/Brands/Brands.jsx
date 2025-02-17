import React, { useEffect, useState } from "react";
import styles from './Brands.module.css'
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
export default function Brands() {
  const [brands, setbrands] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  async function GetAllbrands() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((data) => {
        console.log(data.data.data);
        setbrands(data.data.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }

  useEffect(() => {
    GetAllbrands();
  }, []);
  return (
     <div className="lg:max-w-screen-xl md:container mx-auto ">
      <h1 className="text-center text-main text-4xl font-semibold py-5">All Brands</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap">
              
              {brands.map((brand) => (
                <div key={brand._id} className="sm:w-full md:w-1/4">
                  <div className="brands  my-2 mx-2 text-center transition-transform  pb-6">
                    <img
                      className=" w-full mx-auto "
                      src={brand.image}
                      alt={brand.name}
                    />
                    <h3 className="mt-2 ">
                      {brand.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
                <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
        </div>
        
  )
}
