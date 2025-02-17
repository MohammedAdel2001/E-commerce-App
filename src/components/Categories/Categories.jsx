import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  async function GetAllCategories() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((data) => {
        console.log(data.data.data);
        setCategories(data.data.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }

  useEffect(() => {
    GetAllCategories();
  }, []);

  return (
    <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto md:px-5 sm:px-10 lg:px-0">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap">
          {Categories.map((category) => (
            <div key={category._id} className="sm:w-full md:w-1/3">
              <div className="categories  my-2 mx-2 text-center transition-transform  pb-6">
                <img
                  className="h-[300px] w-full mx-auto object-cover rounded "
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="text-main mt-2 text-2xl text2-main font-semibold">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
            </Helmet>
    </div>
  );
}
