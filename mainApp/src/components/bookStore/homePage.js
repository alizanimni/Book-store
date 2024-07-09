import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getBooksByIdFromDB, getBooksFromDB } from "../../server/db/booksDB";
import { getUserFromCookie } from "../../cookies/cookies";
import { TfiSearch } from "react-icons/tfi";
import { BooksContext } from "../../context/booksContext";
import { PriceContext } from "../../context/priceContext";

const HomePage = (props) => {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState([]);
  const [showSearchRes, setShowSearchRes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userBooks, setUserBooks] = useState([]);
  const { setPrice } = useContext(PriceContext);
  const user = getUserFromCookie();
  const onInputSearch = (event) => {
    setSearchInput(event.target.value.trim().toLowerCase());
    console.log(searchInput);
  };

  useEffect(() => {
    getBooksFromDB().then((books) => {
      setBooks(books);
      setShowBooks(books);
    });

    return () => {};
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (user)
        try {
          const bookPromises = user.books.map(async (id) => {
            console.log(id);
            const book = await getBooksByIdFromDB(id);
            console.log(book);
            return book.data;
          });

          const userBooks = await Promise.all(bookPromises);

          setUserBooks(userBooks);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (user) {
      let price = 0;

      for (let book of userBooks) {
        console.log(price);
        console.log(book);
        let newBookPrice =
          book.discount > 0
            ? parseFloat(book.discount)
            : parseFloat(book.price);
        console.log(newBookPrice);
        price += newBookPrice;
      }
      setPrice(price.toFixed(1));
    }
  }, [userBooks]);

  useEffect(() => {
    const booksArr = [...books];

    setShowSearchRes(
      searchInput === ""
        ? []
        : booksArr.filter((book) =>
            book.name.toLowerCase().includes(searchInput)
          )
    );
    console.log(showSearchRes);
  }, [searchInput]);

  const onClickScreen = () => {
    setShowSearchRes([]);
    setSearchInput("");
  };

  const onClickSearch = () => {
    const booksArr = [...books];
    if (searchInput.length > 0) {
      setShowBooks(
        booksArr.filter((book) => book.name.toLowerCase().includes(searchInput))
      );
    }
  };

  return (
    <div onClick={onClickScreen} className="home_page_main">
      <div className="center">
        <div className="search_icon_input_container">
          <input
            value={searchInput}
            className="search_input"
            placeholder="search book"
            onInput={onInputSearch}
          ></input>
          <div className="searchButton" onClick={onClickSearch}>
            <TfiSearch size={35} style={{ color: "white" }} />
          </div>
        </div>
      </div>
      <div className="center">
        <div className="search_res_containet">
          {showSearchRes.map((book, i) => (
            <Link to={"/book/id=" + book.id}>
              {" "}
              <div key={i} className="book_name_search">
                <div> {book.name}</div>
                {props.isAdmin && (
                  <Link to={"/edit-book/" + book.id}>
                    <div className="edit_book_button">edit</div>
                  </Link>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {props.isAdmin && (
          <div>
            {" "}
            <button className="add_discount_buttons">
              {" "}
              <Link to={"/add-book"}>+ Add book</Link>
            </button>
            <button className="add_discount_buttons">
              <Link to={"/discount"}>Manage discount</Link>
            </button>
          </div>
        )}
      </div>

      <div className="books_container">
        {showBooks.map((book, i) => (
          <div key={i} className="book_div">
            <Link to={"/book/id=" + book.id}>
              <img src={book.urlPhoto} alt={book.name}></img>
            </Link>
            <br />
            <div className="book">
              {" "}
              {book.name}
              <br />
              <div className="auther">{book.auther}</div>
            </div>
            <br />
            <div className={book.discount > 0 ? "price not-price" : "price"}>
              ${book.price}{" "}
            </div>
            {book.discount > 0 && <div className="price">${book.discount}</div>}

            {props.isAdmin && (
              <Link to={"/edit-book/" + book.id}>
                <div className="edit_book_button">edit</div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
