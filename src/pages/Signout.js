import axios from "axios";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import authContext from "../context/authContext";

let SERVER_URI = process.env.REACT_APP_SERVER_URI;

export default function Signout() {
  let { setLogined } = useContext(authContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${SERVER_URI}/auth/signout`, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/signin");
        setLogined(false);
      });
  });

  return null;
}

// let SERVER_URI = "http://192.168.0.169:3000";
