import React from "react";
import styles from "./MainSlider.module.css";
import style1 from "./../../assets/slider1.jpg";
import style2 from "./../../assets/slider2.jpg";
import style3 from "./../../assets/slider3.jpg";
import style4 from "./../../assets/static1.jpg";
import style5 from "./../../assets/static2.jpg";

import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="md:flex md:justify-center pb-6 pt-12 gap-4">
      
      <div className="w-full md:w-1/4">
        <Slider {...settings}>
          <div>
            <img src={style1} className="w-full h-auto lg:h-[550px] object-cover rounded-lg" alt="" />
          </div>
          <div>
            <img src={style2} className="w-full h-auto lg:h-[275px] object-cover rounded-lg" alt="" />
          </div>
          <div>
            <img src={style3} className="w-full h-auto lg:h-[550px] object-cover rounded-lg" alt="" />
          </div>
        </Slider>
      </div>
    
      <div className="w-full md:w-1/4 space-y-4">
        <img src={style4} className="w-full h-auto lg:h-[275px] object-cover rounded-md" alt="" />
        <img src={style5} className="w-full h-auto lg:h-[275px] object-cover rounded-md" alt="" />
      </div>
    </div>
  </div>
</div>

  );
}
