import React from "react";
import { Route, Navigate, Outlet} from "react-router-dom";
import { getUserFromCookie } from "../cookies/cookies";

const PrivetRoute = ({redirectPath='/login'}) =>{
    const user = getUserFromCookie()
    if(!user){
    return <Navigate to={redirectPath} replace/>  
    }
   return <Outlet/>
}

export default PrivetRoute;