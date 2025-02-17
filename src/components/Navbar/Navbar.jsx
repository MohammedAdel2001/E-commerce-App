import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import logo from "./../../assets/freshcart-logo.svg";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let {numberOfCartItems,getCart}=useContext(CartContext)
  let { Token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();
  let location = useLocation();

  // State to handle mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "text-black "
      : "text-gray-500 hover:text-black";

  function LogOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  async function GetAllCarts() {
    let response = await getCart();
    
  }
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      GetAllCarts()
    }
  },[])

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-10 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around  p-4">
        <Link to="/" className="flex  ">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          {Token ? (
            <ul className="flex flex-col px-4  mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="home"
                  className={`block py-2 px-3 rounded-sm ${isActive("/home")}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="cart"
                  className={`block py-2 px-3 rounded-sm ${isActive("/cart")}`}
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="products"
                  className={`block py-2 px-3 rounded-sm ${isActive(
                    "/products"
                  )}`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="categories"
                  className={`block py-2 px-3 rounded-sm ${isActive(
                    "/categories"
                  )}`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="brands"
                  className={`block py-2 px-3 rounded-sm ${isActive(
                    "/brands"
                  )}`}
                >
                  Brands
                </Link>
              </li>

              <li className="nav-item relative md:ps-16 sm:pb-10 md:pb-0 text-center">
  <Link to="/cart" className="nav-link" >
    <i className="fa-solid fa-cart-shopping text-3xl text-zinc-600" />
    <div  className="badge absolute px-1   text-sm text-white top-0 end-0 bg-main">
      {numberOfCartItems}
    </div>
  </Link>
</li>

              <li>
                <a
                  onClick={() => LogOut()}
                  href="#"
                  className="block py-2   rounded-sm text-gray-500 hover:text-black"
                >
                  LogOut
                </a>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="login"
                  className={`block py-2 px-3 rounded-sm ${isActive("/login")}`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="register"
                  className={`block py-2 px-3 rounded-sm ${isActive(
                    "/register"
                  )}`}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
