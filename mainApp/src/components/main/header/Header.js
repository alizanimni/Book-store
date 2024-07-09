import React, { useContext, useEffect, useState } from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { TfiSearch } from "react-icons/tfi";
import { TfiMenu } from "react-icons/tfi";
import { BsPersonCircle } from "react-icons/bs";
import { Link ,useNavigate} from "react-router-dom";
import { getUserFromCookie } from "../../../cookies/cookies";
import { PriceContext } from "../../../context/priceContext";

const Header = (props) => {
  const user= getUserFromCookie()
  const [userName,setUserName]=useState("")
  const {price} = useContext(PriceContext)
  useEffect(() => {
  if(props.isAdmin){
   setUserName("admin")  
  }else if(!user){
    setUserName("guest")
  }else{
    setUserName(user.name)
  }
  },[])

  const navigate = useNavigate()
  return (
    <div className="header">
      <div>
      {price>0&&<div className="header_price">{price}$</div>}
        {!props.isAdmin &&         <Link to="/cart"> 
          {(props.cost>0)?<TfiShoppingCartFull size={30} className="icons_div" />
          :<TfiShoppingCart size={30} className="icons_div" />}
        </Link>}
    

         
          <Link to={user? "/my-account":"/login"}> 
          <BsPersonCircle size={30} className="icons_div" />
          </Link>      
            


      </div>
<div className="hello">hello {userName}</div>  
      <Link to="/" className="logo">Digital Book Store</Link>

   </div>
  );
};

export default Header;
