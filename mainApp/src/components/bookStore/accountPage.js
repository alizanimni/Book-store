
import React, { useContext, useState } from "react";
import { deleteUserFromCookie, getUserFromCookie } from "../../cookies/cookies";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./deleteModal";
import { PriceContext } from "../../context/priceContext";

const AccountPage = (props) =>{
  console.log(props.isAdmin);
  const {setPrice}=useContext(PriceContext)
   const user = getUserFromCookie()
   const navigate = useNavigate()
   const [openModal,setOpenModal]=useState(false)
  
   const logout = () => {

    if(props.isAdmin) props.setIsAdmin(false)
       setPrice(0)
       deleteUserFromCookie()
       navigate('/')
       
   }
   

   const onClickDeleteAccount = () =>{
      setOpenModal(true)
   }


    return(
    <div className="account_page">
     <div className="account_modal">
      <div className="x_my_account_button" onClick={()=>{navigate('/')}}>x</div>
      {openModal && <DeleteModal setOpenModal={setOpenModal} id={user._id}/>}
        <h1>My account</h1>
        <div>Name: {user.name}  </div>
        <div>Email: {user.email} </div>
        <div>Adress: {user.adress} </div>
        
      
      <button onClick={logout} className="account_button">logout</button>

      <button onClick={()=>navigate('/edit-account')} className="account_button">Edit details</button>
    {!props.isAdmin && <button onClick={()=>navigate('/cart')} className="account_button">My cart</button>     }
    <button onClick={onClickDeleteAccount} className="delete_account_button">delete account</button> 
      </div>
    </div>        
    )

}

export default AccountPage;