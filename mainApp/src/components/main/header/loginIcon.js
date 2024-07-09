import React from "react";
import Login from "../../login/login";
import { useNavigate } from "react-router-dom";
import PrivateArea from "../../bookStore/accountPage";
import { getUserFromCookie } from "../../../cookies/cookies";
import LoginPage from "../../login/loginForm";

const LoginIcon = (props) => {
  const navigate = useNavigate();
  const user = getUserFromCookie()
  console.log(user);
  return <div>{!user? <LoginPage setCost={props.setCost} setIsAdmin={props.setIsAdmin}/>: <PrivateArea />  }</div>;
};

export default LoginIcon;
