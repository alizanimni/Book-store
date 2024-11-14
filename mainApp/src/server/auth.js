import Axios from "axios";

const url ="https://book-store-backend-oo3h.onrender.com"

export const subscribeToSite = async(name,email,adress,password)=>{
    try{
        console.log(name,email,password);
    const res = await Axios.post(`${url}/add-user`, {name,email,adress,password})
    console.log(res)
    }catch(err){
      console.log(err.response.data.message);
        throw new Error(err.response.data.message)
    }
}

// export const loginToSite = async(email,password)=>{
//   try{
//   const res = await Axios.post(
//     process.env.REACT_APP_LOGIN,
//      {email,password,returnSecureToken:true})

//   return{
//       token: res.data.idToken,
//       user: {username: "ReactIsTheBest", id: res.data.localId}
//   }
//   }catch(err){
//     if(err.response && err.response.status === 400){
//       throw new Error("Email or password are invalid")
//     }
//   }
// }
