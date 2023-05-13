import { createContext, useState, useEffect } from "react";
import axios from "axios";

let authContext = createContext();

let SERVER_URI = process.env.REACT_APP_SERVER_URI;

function AuthProvider({ children }) {
  const [logined, setLogined] = useState(false);

  useEffect(() => {
    axios
      // .get(`${SERVER_URI}/login-status`, {
      .get(`${SERVER_URI}/login-status`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "isLogined") setLogined(true);
      });
  }, []);

  return (
    <authContext.Provider value={{ logined, setLogined }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext;
export { AuthProvider };
// let SERVER_URI = "http://192.168.0.169:3000";
