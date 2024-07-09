import React, { useState } from "react";
import Login from "./login";
import Subscribe from "./subscribe";
import { getUserFromCookie } from "../../cookies/cookies";

const LoginPage = (props) => {
    const user= getUserFromCookie()
	const errorMessage = user ? "You must to login!" : "";
	const [isLoginMode, setIsLoginMode] = useState(true);

	return (
		<div className="login-page">
			<div className="login-page__form">
				{ isLoginMode ?
					<Login setCost={props.setCost} setIsLoginMode={ setIsLoginMode } errorMessage={ errorMessage } setIsAdmin={props.setIsAdmin}/> :
					<Subscribe setIsLoginMode={ setIsLoginMode } /> }
			</div>
		</div>
	);
};

export default LoginPage;