import React, { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let navigate = useNavigate();
  const [CartItems, setCartItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const dropdownRef = useRef(null); // Ref for dropdown

  let {
    getCart,
    removeCart,
    updateCart,
    clearAll,
    TotalCartPrice,
    numberOfCartItems,
  } = useContext(CartContext);

  async function removeProduct(productId) {
    setisLoading(true);
    let response = await removeCart(productId);
    setisLoading(false);
    setCartItems(response.data.data.products);
  }

  async function updateProduct(productId, count) {
    setisLoading(true);
    let response = await updateCart(productId, count);
    setisLoading(false);
    setCartItems(response.data.data.products);
  }

  async function clearAllCart() {
    setisLoading(true);
    let response = await clearAll();
    setisLoading(false);
    setCartItems([]);
  }

  async function GetAllCarts() {
    let response = await getCart();
    setCartItems(response.data.data.products);
    setisLoading(false);
  }

  useEffect(() => {
    GetAllCarts();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container lg:max-w-screen-xl mx-auto pt-6 pb-16 overflow-x-hidden p-6">
          <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold pt-14">Cart Shop</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-xl font-semibold text-gray-700">
                Total Price:
                <span className="text-main"> {TotalCartPrice} EGP</span>
              </span>

              <div className="flex flex-col text-center" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Check Out
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  className={`z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute mt-2`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to='/checkout'
                        state={{type:'online payment'}}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Online
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/checkout'
                        state={{type:'cash on delivery'}}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Cash
                      </Link>
                    </li>
                   
                  </ul>
                </div>
              </div>

              <span className="text-xl font-semibold pt-4 pb-4 text-gray-700">
                Total number of items:
                <span className="text-main"> {numberOfCartItems}</span>
              </span>
            </div>

            {CartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-4 mb-4 shadow-md gap-4"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.name}
                  className="w-full max-w-[150px] h-auto rounded-md object-cover"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-600">{item.price} EGP</p>
                  <button
                    onClick={() => removeProduct(item.product.id)}
                    className="text-red-500 mt-2"
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="flex justify-center items-center">
                        <i className="fa-solid fa-trash pe-3"></i>
                        <p>Remove</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center py-5">
            <button
              onClick={() => clearAllCart()}
              className="border-2 border-green-400 text-black px-5 text-xl py-2 rounded-lg"
            >
              Clear Your Cart
            </button>
          </div>
        </div>
      )}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
    </>
  );
}
