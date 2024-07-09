import React from "react";
import { deleteBookFromCart, deleteUser } from "../../server/db/userDB";
import { useNavigate } from "react-router-dom";
import { deleteUserFromCookie } from "../../cookies/cookies";


const DeleteModal = (props) => {

    const navigate=useNavigate()
 const closeDeleteModal = () => {
      props.setOpenModal(false)
 }
 const deleteAccount = async() =>{
    try{
     await deleteUser(props.id)
     deleteUserFromCookie()
     navigate('/')        
    }catch(err){
        console.log(err);
    }


 }
    return(
<div className="delete_modal">
    <div className="modal-content">
       <div>Do you want to Delete your account?</div>
       <div className="yes_no_buttons">
       <button onClick={deleteAccount}>Yes</button>
       <button onClick={closeDeleteModal}>No</button>
       </div>
    </div>
</div>
    )
}
 export default DeleteModal