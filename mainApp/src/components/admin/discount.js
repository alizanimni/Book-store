import React, { useEffect, useState } from "react";
import { getBooksByAutherName, getBooksByIdFromDB, getBooksFromDB } from "../../server/db/booksDB";
import { TfiSearch } from "react-icons/tfi";
import { AdminEditBook } from "../../server/db/adminDB";
const Discount = () => {
  const [books, setBooks] = useState([]);
  const [change, setChange] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [authers, setAuthers] = useState([]);
  const [ searchAuthers , setSearchAuther]=useState([])
  const [select, setSelect] = useState("book");
  const [discount, setDiscount] = useState(0);
  const [bookId,setBookId]=useState()
  const [autherSelected,setAutherSelected]=useState()
  const [booksToUpdate,setBooksToUpdate]=useState([])

  useEffect(() => {
    getBooksFromDB().then((books) => {
      setBooks(books);
    });

    return () => {};
  }, []);

  useEffect(() => {
    const tempAuters = [];
    for (let book of books) {
      console.log(book.auther);
      if (!tempAuters.includes(book.auther)) {
        tempAuters.push(book.auther);
      }
    }
    setAuthers(tempAuters);
    setSearchAuther(tempAuters)
    console.log(authers);
  }, [books]);

  useEffect(() => {
       booksToUpdate.map((book)=>{
        const priceAfterDiscount = (book.price-(book.price*(discount/100))).toFixed(1)
        
        AdminEditBook(book._id,{discount:priceAfterDiscount})
       })
  }, [booksToUpdate]);




  useEffect(() => {
    if(select==="book"){
    const booksArr = [...books];

     setSearchBooks(searchInput === "" ?
    [] :
    booksArr.filter((book) => book.name.toLowerCase().includes(searchInput)));        
    }else{
        const authersArr = [...authers];

        setSearchAuther(searchInput === "" ?
       authersArr :
       authersArr.filter((auther) => auther.toLowerCase().includes(searchInput)));        
    }


  }, [searchInput]);



  console.log(select);
  console.log(authers);

  
  const onClickDiscount = async () => {
    if (select === "auther") {
      console.log(autherSelected);
      try {
        const autherBooks = await getBooksByAutherName(autherSelected);
        setBooksToUpdate(autherBooks);
      } catch (err) {
        console.log(err);
      }
    } else {
      await getBooksByIdFromDB(bookId).then((book)=>{
      const priceAfterDiscount = (book.data.price-(book.data.price*(discount/100))).toFixed(1)
      AdminEditBook(bookId, { discount: priceAfterDiscount });     
      })

      
    }
  };
  const onClickBook = (bookName,bookId) => {

    console.log(bookName);
    setSearchInput(bookName)
    setBookId(bookId)
  };

  const onClickAuther=(autherName)=>{
    setAutherSelected(autherName)
    setSearchInput(autherName)
  }

  return (
    <div className="discount_page">
      <div>
        <h1>Discount</h1>
        <select onChange={(event) => setSelect(event.target.value)}>
          <option value="book">Book</option>
          <option value="auther">Auther</option>
        </select>
        {select === "auther" && (
          <div>
          <div  className="search_book_input">   
          <input placeholder="search auther" value={searchInput} onChange={(event)=>{setSearchInput(event.target.value)}}></input></div>
             <div className="books_search">
               {searchAuthers.map((auther, i) => (
                 <div onClick={()=>{onClickAuther(auther)}}>{auther}</div>
               ))}
             </div>
           </div>

        )}
        {select === "book" && (
          <div>
         <div  className="search_book_input">   
         <input placeholder="search book" value={searchInput} onChange={(event)=>{setSearchInput(event.target.value)}}></input></div>
            <div className="books_search">
              {searchBooks.map((book, i) => (
                <div onClick={()=>{onClickBook(book.name,book.id)}}>{book.name}</div>
              ))}
            </div>
          </div>
        )}
        <br />
        <br />
        <input
          onBlur={(event) => {
            setDiscount(event.target.value);
          }}
          placeholder="Discount"
        ></input>
        %
        <br />
        <br />
        <button onClick={onClickDiscount}>Add discount</button>
      </div>
    </div>
  );
};

export default Discount;
