import Axios from 'axios'
import { getUserFromCookie } from '../../cookies/cookies';

//const DB_URL = process.env.REACT_APP_DB;

export const getUser = async (email,password) => {
   try{
     const user=await Axios.get(`http://localhost:4000/user/get-user?email=${email}&password=${password}`)
     console.log(user);
      if(!user.data){

         throw new Error("Room not found")

      }     
     return user
   }catch(err){
     console.log(err)
   }
};

export const addBookToCart = async(bookId)=>{

  console.log(bookId);
  const user = getUserFromCookie()
    console.log(user);
  try{
    await Axios.patch(`http://localhost:4000/user/add-book`,{userId:user._id,bookId})
    return
  }catch(err){
    console.log(err)
  }
}

export const deleteBookFromCart = async(bookId)=>{
  console.log(bookId);
  const user = getUserFromCookie()
    console.log(user);
  try{
    await Axios.patch(`http://localhost:4000/user/delete-book`,{userId:user._id,bookId})
    return
  }catch(err){
    console.log(err)
  }
}

export const getUserById = async(id)=>{
  try{
    const user=await Axios.get(`http://localhost:4000/user/get-user-By-id?id=${id}`)
    console.log(user);
     if(!user.data){

        throw new Error("Room not found")

     }     
    return user
  }catch(err){
    console.log(err)
  }
}


export const editUserDetails = async(userNewData)=>{
  console.log(userNewData);
  const user = getUserFromCookie()
  console.log(user);
    console.log(user);
  try{
    await Axios.patch(`http://localhost:4000/user/edit-details?id=${user._id}`,userNewData)
    return
  }catch(err){
    console.log(err)
  }
}

export const deleteUser = async(id)=>{
  try{
    await Axios.delete(`http://localhost:4000/user/delete-user?id=${id}`)
  }catch(err){
    console.log(err)
  }
}
