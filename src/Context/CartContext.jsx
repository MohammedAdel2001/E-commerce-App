import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
export let CartContext = createContext();

export default function CartContextProvider(props) {
   const [numberOfCartItems, setnumberOfCartItems] = useState(0)
   const [TotalCartPrice, setTotalCartPrice] = useState(0)
   const [cartId, setcartId] = useState(null)
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers,
        }
      )
      .then((response) => {
        setnumberOfCartItems(response.data.numOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        toast(response.data.message, {
            icon: '👏',
          });
        return response;
      })
      .catch((err) => {
        toast.error('it can not be added')
        return err;
      });
  }
  async function removeCart(productId) {
    return await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        
        {
          headers,
        }
      )
      .then((response) => {
        setnumberOfCartItems(response.data.numOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
        toast(response.data.message, {
            icon: '👏',
          });
        return response;
      })
      .catch((err) => {
       
        return err;
      });
  }
  async function clearAll() {
    return await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        
        {
          headers,
        }
      )
      .then((response) => {
        setnumberOfCartItems(0)
        setTotalCartPrice(0)
        toast(response.data.message, {
            icon: '👏',
          });
        return response;
      })
      .catch((err) => {
       
        return err;
      });
  }
  async function updateCart(productId,count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {
          headers,
        }
      )
      .then((response) => {
        setnumberOfCartItems(response.data.numOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response;
      })
      .catch((err) => {
       
        return err;
      });
  }
  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {shippingAddress},
        {
          headers,
        }
      )
      .then((response) => {
        window.location.href=response.data.session.url 
        setnumberOfCartItems(response.data.numOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
      })
      .catch((err) => {
       
      });
  }
  async function CashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {shippingAddress},
        {
          headers,
        }
      )
      .then((response) => {
        window.location.href=response.data.session.url 
        setnumberOfCartItems(response.data.numOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
      })
      .catch((err) => {
       
      });
  }
  async function getCart() {
    return await axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",
       
        {
          headers,
        }
      )
      .then((response) => {
        setnumberOfCartItems(response.data.numOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response;
      })
      .catch((err) => {
       
        return err;
      });
  }
  return (
    <CartContext.Provider value={{ addToCart,getCart,removeCart,updateCart,onlinePayment,CashPayment ,clearAll,numberOfCartItems,TotalCartPrice}}>
    {props.children}
  </CartContext.Provider>
       
    
    );
}
