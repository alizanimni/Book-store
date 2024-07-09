import React, {createContext,useEffect,useState} from "react";
import { getBooksFromDB } from "../server/db/booksDB";

export const BooksContext = createContext();

const BooksContextProvider = (props) =>{

   const[allBooks,setAllBooks]=useState()
   useEffect(()=>{
   getBooksFromDB().then((books)=>{
    setAllBooks(books)
   })
   },[])

   return (
    <BooksContext.Provider value={{ allBooks, setAllBooks }}>
      {props.children}
    </BooksContext.Provider>
  );

}

export default BooksContextProvider;