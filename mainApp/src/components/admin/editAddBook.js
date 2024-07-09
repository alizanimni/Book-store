import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { AdminAddBook, AdminEditBook } from "../../server/db/adminDB";
import { getBooksByIdFromDB } from "../../server/db/booksDB";

const EditAddBook = () => {
  const [book, setBook] = useState(undefined);
  const [title,setTitle] = useState("Add book")
  const [nameInput, setNameInput] = useState('');
  const [autherInput, setAutherInput] = useState('');
  const [urlPhoto, setUrlPhotoInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [priceInput,setPriceInput] = useState('')
  const location = useLocation();
  const path = location.pathname;
  const id = path.slice(11);
  const navigate = useNavigate()
  console.log(id);
  useEffect(() => {
    getBooksByIdFromDB(id).then((bookData) => {

        if(bookData){
        console.log(bookData.data);            
        const newBook=bookData.data
        setBook({...newBook})     
        setTitle("Edit book")       
        }
    })
    .then(()=>{ 
    })

 
    return () => {
     
    };
  }, []);

  useEffect(() => {
    console.log(book);
    if(book){
    setNameInput(book.name)
    setAutherInput(book.auther)
    setUrlPhotoInput(book.urlPhoto)
    setSummaryInput(book.summary)
    setPriceInput(book.price)        
    }

    return () => {
     
    };
  }, [book]);


  const editBook = (event) => {
    event.preventDefault();

    const bookData = {
      name: nameInput,
      auther: autherInput,
      urlPhoto: urlPhoto,
      summary: summaryInput,
      price: priceInput
    };
    console.log(bookData);
    if(book){
    AdminEditBook(id, bookData);        
    }else{
        AdminAddBook(bookData)
    }
    navigate('/')
    

  };
  const onNameInput = (event) => {
    event.preventDefault();
    console.log(nameInput);
    setNameInput(event.target.value);
  };

  const onAutherInput = (event) => {
    event.preventDefault();

    setAutherInput(event.target.value);
  };
  const onUrlInput = (event) => {
    event.preventDefault();
    setUrlPhotoInput(event.target.value);
  };
  const onSummaryInput = (event) => {
    event.preventDefault();
    setSummaryInput(event.target.value);
  };
  const onPriceInput = (event) => {
    event.preventDefault();
    setPriceInput(event.target.value);
  };


  return (
    <div className="editAdd_container">
      <div className="editAdd_modal">
        <div className="editAdd-form">
          <form onSubmit={editBook}>
            <h1>{title}</h1>
            <label>Book name</label>
            <input type="text" value={nameInput} onChange={onNameInput}></input>

            <label>Auther name</label>
            <input type="text" value={autherInput} onInput={onAutherInput}></input>

            <label>Url photo</label>
            <input value={urlPhoto} onInput={onUrlInput}></input>

            <label>summary</label>
            <textarea
              className="summary"
              rows={10}
              cols={20}
              value={summaryInput}
              onInput={onSummaryInput}
            ></textarea>

            <label>Price</label>
            <div className="priceInput" ><input type="number"value={priceInput} onInput={onPriceInput}></input></div>
            {book?<button type="submit">edit book</button>: <button type="submit">add book</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAddBook;
