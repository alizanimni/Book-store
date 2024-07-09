import React, { createContext, useReducer, useState } from "react";
import { getUserFromCookie } from "../cookies/cookies";

export const PriceContext = createContext();

const PriceContextProvider = (props) => {

  const [price, setPrice] = useState()

  return (
    <PriceContext.Provider value={{ price, setPrice }}>
      {props.children}
    </PriceContext.Provider>
  );
};

export default PriceContextProvider;