import React, { useContext } from "react";
import { useEffect , useState } from "react";
import { getUserFromCookie, saveUserOnCookie } from "../../cookies/cookies";
import { getBooksByIdFromDB } from "../../server/db/booksDB";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
import { deleteBookFromCart, getUserById } from "../../server/db/userDB";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import PayModal from "./payModal";
import { PriceContext } from "../../context/priceContext";
const Cart =(props)=>{
  const {price ,setPrice}= useContext(PriceContext)
  const [books, setBooks] = useState([]);
  const user = getUserFromCookie();
  console.log(user);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBooks = async () => {
      if(!user){
        try {
          console.log(props.unSignCart);
          const bookPromises = props.unSignCart.map(async (id) => {
            const book = await getBooksByIdFromDB(id);
            console.log(book);
            return book.data;
          });
  
          const userBooks = await Promise.all(bookPromises);
  
          setBooks(userBooks);
          console.log(books);
        } catch (error) {
          console.error("Error fetching books:", error);
        }

      }else{
      try {
        const bookPromises = user.books.map(async (id) => {
          console.log(id);
          const book = await getBooksByIdFromDB(id);
          console.log(book);
          return book.data;
        });

        const userBooks = await Promise.all(bookPromises);

        setBooks(userBooks);
        
      } catch (error) {
        console.error("Error fetching books:", error);
      }}
    };

    fetchBooks();

  }, []);


    useEffect(() => {
      let newPrice = 0;
    
      for (let book of books) {
        // Assuming book.price is a string representing the price
        if(book.discount>0){
        newPrice += parseFloat(book.discount);          
        }else{
          newPrice += parseFloat(book.price);    
        }

      }
    
     setPrice(newPrice.toFixed(2));
    }, [books]);

 console.log(books);

 const removeBook = async (bookId) => {
  if(!user){
    const updatedBooks = books.filter((book) => book._id !== bookId);
     setBooks(updatedBooks)
     console.log(updatedBooks);
     const newBooksCart = []
     updatedBooks.map((book)=>{
      newBooksCart.push(book._id)
     })
     console.log(props.unSignCart);
    props.setUnSignCart(newBooksCart)
  }else{
  try {
    await deleteBookFromCart(bookId);

    const userDataResponse = await getUserById(user._id);
    console.log(userDataResponse);
    const userData = userDataResponse.data;
    
    const updatedBooks = books.filter((book) => book._id !== bookId);
    console.log(updatedBooks);
    setBooks(updatedBooks);
     const newBooksIdArr = []
    updatedBooks.map((book)=>{
       newBooksIdArr.push(book._id)
    })
   

    const newUserData = { ...userData, books: newBooksIdArr };
    saveUserOnCookie(newUserData);
   

    console.log(newUserData);
  } catch (error) {
    console.error("Error removing book:", error);
  }}
};

const onClickPayButton = () =>{
  navigate('/payment',{state:{cost:props.cost} } )
}
    return(

<div>
<div className="cart_page">

<div className="books_in_cart">
<div className="books_area">
  
<div className="books_container_cart">
{books.length===0 && <div className="empty_cart"><div className="center">< BsCart4 size={200} className="empty_cart_icon"  /></div>
<div className="empty_cart_text">Ooops your cart is still empty</div>
</div>
}
        {books.map((book,i)=>(
           <div className="book" key={i} >
            
               <Link to={'/book/id='+book._id}> <img src={book.urlPhoto} alt={book.name}></img></Link>
                <br/>
                <div className="book_details">
                  <h3>{book.name}  </h3>  
                    
                   <p className="auther">{book.auther}</p> 
                 <div>  
                  <p className={book.discount>0?"price not-price":"price"}>${book.price}</p>
                  {book.discount>0 && <p className="price">${book.discount} </p>}
                  </div>
                 </div>  
                 
                <button onClick={()=>{removeBook(book._id)}} className="trash_button"> <HiTrash size={25} /></button>              
            </div>

        ))}

      </div> 

</div >
</div>
 { books.length>0 &&     <div className="final_price">${price}</div>}
       {books.length>0 &&<div className="pay_button" onClick={onClickPayButton}><button>Lets pay</button></div>} 

</div>

</div>

    )

}

export default Cart;