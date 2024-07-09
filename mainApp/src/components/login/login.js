import React from "react";
import { HiX } from "react-icons/hi";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { useState ,useEffect} from "react";
import { getUser } from "../../server/db/userDB";
import { saveUserOnCookie } from "../../cookies/cookies";
import { getBooksByIdFromDB } from "../../server/db/booksDB";

const Login = (props) => {
	

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEmailinputValid, setIsEmailInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [books, setBooks] = useState([]);
	const location = useLocation();
    const path= location.pathname
	const admin = path.includes("book-store-admin-746")

	
	useEffect(() => {
		if (props.errorMessage !== "") {
			setErrorMessage(props.errorMessage);
		}
	}, [props.errorMessage]);

    const navigate = useNavigate()
	const isFormInavlid = () => {
		return email === "" || password === "";
	};

	const cost=() => {
		console.log(books);
		let newPrice = 0;
	  
		for (let book of books) {
		  // Assuming book.price is a string representing the price
		  if(book.discount>0){
		  newPrice += parseFloat(book.discount);          
		  }else{
			newPrice += parseFloat(book.price);    
		  }
  
		}
	    console.log(newPrice);
		props.setCost(newPrice.toFixed(2));
	  }

	const onBlurEmailInput = (event) => {
		const theEmail = event.target.value.trim();
		if (theEmail === "") {
			setEmail("");
			// emailState[1]("")
			setIsEmailInputValid(false);
		} else {
			setEmail(theEmail);
			setIsEmailInputValid(true);
		}
	};

	const onBlurPasswordInput = (event) => {
		const thePassword = event.target.value.trim();
		setPassword(thePassword === "" ? "" : thePassword);
		setIsPasswordInputValid(thePassword !== "");
    
	};

	const setNewCost=async(user)=>{
		console.log(user);
		try {
			const bookPromises = user.books.map(async (id) => {
			  console.log(id);
			  const book = await getBooksByIdFromDB(id);
			  console.log(book);
			  return book.data;
			});
	
			const userBooks = await Promise.all(bookPromises);
	        console.log(userBooks);
			setBooks(userBooks);

			
		  } catch (error) {
			console.error("Error fetching books:", error);
		  }
  
			cost()		  
		
	}


    const onSubmit = async(event) =>{
       event.preventDefault();       
	   try {
		const user = await getUser(email, password);
		if (user && !user.isAdmin && !admin) {
		//   await setNewCost(user.data);
		  saveUserOnCookie(user.data);
		  navigate("/");
		} else if (user && user.isAdmin && admin) {
		  props.setIsAdmin(true);
		  saveUserOnCookie(user.data);
		  navigate("/");
		} else {
		  setErrorMessage("Invalid email or password");
		}
	  } catch (error) {
		console.error("Error fetching user:", error);
	  }
  };
    
       
    

	

	const onClickLogin = () => {

		props.setIsLoginMode(false);
	};

	return (
		<div className="login_page">
            <div className="login_container drop-shadow-lg">
            <Link to="/"><HiX size={20} className="x_button" />       </Link>  
			<h2>Login</h2>
			{errorMessage !== "" && <div className="error-message">{ errorMessage }</div> }
			<form onSubmit={ onSubmit } className="login_form">
				<input placeholder="Email" onBlur={ onBlurEmailInput } />
				{ !isEmailinputValid && <div className="invalid-message">You must enter your email.</div> }
				<input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } />
				{ !isPasswordInputValid && <div className="invalid-message">You must enter your password.</div> }
				<div className="login-form__nav">
					<button type="submit">Submit</button>
					<div onClick={onClickLogin}>Subscribe</div>
				</div>
			</form>
            </div>
		</div>
	);
};

export default Login;