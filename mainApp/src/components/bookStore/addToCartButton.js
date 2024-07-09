import React, { useContext } from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { addBookToCart, getUserById } from "../../server/db/userDB";
import { getUserFromCookie, saveUserOnCookie } from "../../cookies/cookies";
import { PriceContext } from "../../context/priceContext";

export const AddToCartButton = (props) => {
  const {price,setPrice}=useContext(PriceContext)
  const user = getUserFromCookie();

  const onClickAdd = () => {
    if (!user) {
      const bookArr = props.unSignCart
      bookArr.push(props.id);
      props.setUnSignCart(bookArr);
      props.setCartButton(true);
      console.log(props.unSignCart);
    } else {
      console.log(user);
      addBookToCart(props.id)
        .then(() => {
          return getUserById(user._id);
        })
        .then((user) => {
          console.log(user);
          saveUserOnCookie(user.data);
        })
        .then(() => {
          props.setCartButton(true);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
    console.log(props.bookPrice);
    console.log(props.cartCost);
    const newCost = (parseFloat(price) + parseFloat(props.bookPrice)).toFixed(1)
    console.log(newCost);
   setPrice(newCost)
  };

  return (
    <button className="add_to_cart" onClick={onClickAdd}>
      I want to read
      <br></br>
      <TfiShoppingCart size={35} className="icons_div" />
    </button>
  );
};