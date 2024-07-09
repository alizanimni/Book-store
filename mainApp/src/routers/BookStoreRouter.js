import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/main/footer";
import Header from "../components/main/header/Header";
import HomePage from "../components/bookStore/homePage";
import LoginIcon from "../components/main/header/loginIcon";
import AccountPage from "../components/bookStore/accountPage";
import Cart from "../components/bookStore/cart";
import BooksDetails from "../components/bookStore/booksDetails";
import EditAddBook from "../components/admin/editAddBook";
import Subscribe from "../components/login/subscribe";
import PayModal from "../components/bookStore/payModal";
import PageNotFound from "../components/bookStore/pageNotFound";
import PrivetRoute from "./PrivateRoute";
import Login from "../components/login/login";
import Discount from "../components/admin/discount";
import LoginPage from "../components/login/loginForm";
import PriceContextProvider from "../context/priceContext";
import BooksContextProvider from "../context/booksContext";


const BookStoreRouter = () => {
   const [unSignCart, setUnSignCart] = useState([]);
   const [isAdmin,setIsAdmin]=useState(false)
   const [cartCost,setCartCost]=useState([])
  return (
    <BrowserRouter>

<PriceContextProvider>
        <Header cost={cartCost} isAdmin={isAdmin}  />
        <Routes>
          <Route path="/" element={<HomePage isAdmin={isAdmin} setCost={setCartCost}/>} />
          <Route
            path="/login"
            element={<LoginIcon setCost={setCartCost}/>}
          />
      
          <Route path="/cart" element={<Cart unSignCart={unSignCart} setUnSignCart={setUnSignCart} cost={cartCost} setCost={setCartCost}/>} />
          <Route path="/book/:id" element={<BooksDetails isAdmin={isAdmin} unSignCart={unSignCart} cost={cartCost} setCost={setCartCost} setUnSignCart={setUnSignCart}/>}/>
          <Route path="/subscribe" element={<Subscribe isAdmin={isAdmin}/>} />
         

          <Route path="/book-store-admin-746/login" element={<LoginPage setIsAdmin={setIsAdmin}/>}/>
          <Route path="/payment" element={<PayModal/>}/>

    
                <Route path="/my-account" element={<AccountPage setIsAdmin={setIsAdmin} isAdmin={isAdmin}  setCost={setCartCost}/>} />
          <Route path="/edit-account" element={<Subscribe/>}/>



              <Route path="/add-book" element={<EditAddBook/>}/>
              <Route path="/edit-book/:id" element={<EditAddBook/>}/>
              <Route path="/discount" element={<Discount/>}/>
          <Route path="*" element={<PageNotFound />} />

        </Routes>
        <Footer />
</PriceContextProvider>

    </BrowserRouter>
  );
};

export default BookStoreRouter;
