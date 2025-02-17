import React from "react";
import styles from "./CategorySlider.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 756,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 957,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true
        }
      },
      
    ]
  };

  function getcatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery({
    queryKey: ["categoryslider"],
    queryFn: getcatSlider,
  });

  return (
    <>
      <div className="overflow-hidden">
        <Slider {...settings}>
        {data?.data.data.map((cat) => (
            <div className="">
              <img src={cat.image} className="sm:w-full h-[250px] w-[255px] " alt="" />
              <p className="text-2xl font-semibold">{cat.name}</p>
            </div>
          ))}
        </Slider>
        
      </div>
    </>
  );
}
