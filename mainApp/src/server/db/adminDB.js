import Axios from 'axios'

const url = "http://localhost:4000"

export const AdminAddBook = async(bookData)=>{
    try{
        const res=await Axios.post("${url}/add-book",bookData)     
        return
      }catch(err){
        console.log(err)
      }
   };

export const AdminEditBook = async(bookId,bookData)=>{
    console.log(bookId);
    console.log(bookData);
    try{
        const res = await Axios.patch(`${url}/edit-book?id=${bookId}`,bookData)
        console.log(res)
        return
    }catch(err){
        console.log(err);
    }
}

export const GetAllUsers = async()=>{
    try{
        const res = await Axios.get(`${url}/get-all-users`)
        const users = []
        for(let user in res.data){
           users.push({
            id:res.data[user]._id,
            name:res.data[user].name,
            email:res.data[user].email,
            adress:res.data[user].adress,
            password: res.data[user].password,
            books: res.data[user].books
           })
        }
        return users
    }catch(err){
        console.log(err);
    }
}
