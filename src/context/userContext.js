//1 initlise the context
//2 inilise the context with a default value
//3 create a reducer function
//4 create a context provider

import { createContext, useEffect, useReducer } from "react";

export const userContext = createContext();

const initialValues =JSON.parse(localStorage.getItem("user")) ||
 {
  user: null,
  isAuth: false,
  userInfo: null,
};

const reducer = (state, action) => {
  var data = null;
  switch (action.type) {
    case "LOGIN":
      data = {
        ...state,
        user: action.payload,
        isAuth: true,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    case "ADDUSERINFO":
      data = {
        ...state,
        userInfo: action.payload,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    case "LOGOUT":
      data = {
        ...state,
        user: null,
        isAuth: false,
        userInfo: null,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    console.log("user context", userState);
  }, [userState]);

  return (
    <userContext.Provider value={[userState, dispatch]}>
      {children}
    </userContext.Provider>
  );
};
