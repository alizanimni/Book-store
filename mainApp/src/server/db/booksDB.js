import Axios from 'axios'

//const DB_URL = process.env.REACT_APP_DB;
const url = "https://book-store-backend-oo3h.onrender.com"

export const getBooksFromDB = async () => {
   try{
     const res=await Axios.get(url)

    const books=[];
     for(let id in res.data){
        books.push({
            id:res.data[id]._id,
            name: res.data[id].name,
            auther:res.data[id].auther,
            urlPhoto : res.data[id].urlPhoto,
            price: res.data[id].price,
            discount: res.data[id].discount
        })
     }
     console.log(books);     
     return books
   }catch(err){
     console.log(err)
   }
};

export const getBooksByIdFromDB = async (id) => {
  try{
    const book=await Axios.get(`${url}/books/find-book?id=${id}`)
    if(!book){
        throw new Error("Book not found")
    }
    console.log(book)
    return book
  }catch(err){
    console.log(err)
  }
};

export const getBooksByAutherName = async (auther) => {
  try{
    const books=await Axios.get(`${url}/books/find-auther-books?auther=${auther}`)
    if(!books){
        throw new Error("Auther not found")
    }
    console.log(books)
    return books.data
  }catch(err){
    console.log(err)
  }
};


// export const getRoomData = async(roomId,token)=>{
//     try{
//        const res = await Axios.get(DB_URL + "rooms/" + roomId + ".json",
//        {params:{auth:token}})
//        if(!res.data){
//         throw new Error("Room not found")
//        }

//        return({
//         name: res.data.name,
//         users: res.data.users || []
//        })
//     }catch(err){
//       throw err;
//     }
// }
