import { useParams, useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getBooksByIdFromDB } from "../../server/db/booksDB";
import { AddToCartButton } from "./addToCartButton";
import { Acquired } from "./acquired";
import { getUserFromCookie } from "../../cookies/cookies";

const BooksDetails = (props) => {
  const [book, setBook] = useState({});
  const [cartButton, setCartButton] = useState();
  const user = getUserFromCookie();
  const location = useLocation();
  const path = location.pathname;
  const id = path.slice(9);
  console.log(user);
  useEffect(() => {
    getBooksByIdFromDB(id)
      .then((bookData) => {
        setBook(bookData.data);
      })
      .then(() => {
        setCartButton(includes);
      });

    return () => {};
  }, []);

  const includes = () => {
    if (!user) {
      console.log(props.unSignCart);
      if (props.unSignCart.includes(id)) return true;
    } else if (user.books.includes(id)) return true;

    return false;
  };

  return (
    <div className="books_data_page">
      <div>
        <div className="center">
          <img src={book.urlPhoto} alt={book.name}></img>
        </div>

        <div className="book_name"> {book.name}</div>
        <div className="auther_name">{book.auther}</div>
        <div>
          {" "}
          <div className="center">
          <div
            className={book.discount > 0 ? "price_details_page not-price" : ""}
          >
            ${book.price}</div><div>
            {book.discount > 0 && <div className="discount_details_page">${book.discount}</div>}            
          </div></div>
          <div className="center">
          

            {props.isAdmin ? (
              <Link to={"/edit-book/" + book._id}>
                <div className="edit_book_button">edit</div>
              </Link>
            ) : cartButton ? (
              <Acquired />
            ) : (
              <AddToCartButton
                unSignCart={props.unSignCart}
                setUnSignCart={props.setUnSignCart}
                id={id}
                setCartButton={setCartButton}
                bookPrice={book.discount>0?book.discount:book.price}
                setCost={props.setCost}
                cartCost={props.cost}
              />
            )}
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="center">
          {" "}
          <div className="summary">
            summary:
            <br></br>
            <br></br>
            {book.summary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;
