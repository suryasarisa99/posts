import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import immer from "immer";
import { useNavigate } from "react-router-dom";
// let SERVER_URI = "http://192.168.0.169:3000";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [fnameValue, setFnameValue] = useState("");
  const [lnameValue, setLnameValue] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${SERVER_URI}/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setFnameValue(res.data.fname);
        setLnameValue(res.data.lname);
        setEmailValue(res.data.email);
      });
  }, []);

  function editFnameHandle(e) {
    setFnameValue(e.target.value);
  }
  function editLnameHandle(e) {
    setLnameValue(e.target.value);
  }
  function editEmailHandle(e) {
    setEmailValue(e.target.value);
  }

  function submitEditHandle(e) {
    e.preventDefault();
    let data = {
      fname: fnameValue,
      lname: lnameValue,
      email: emailValue,
    };
    profile.fname = fnameValue;
    profile.lname = lnameValue;
    profile.email = emailValue;
    setEditMode(false);
    axios
      .patch(`${SERVER_URI}/auth/profile-edit`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <form action="">
      <div className="max-w-xs border mx-auto  mt-16 bg-white  rounded-md p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div
          className="flex items-center justify-between"
          onClick={() => setEditMode(!editMode)}
        >
          <h1 className="text-lg font-bold mb-4">Profile</h1>
          <FaEdit />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="fname">
            First Name:
          </label>
          {!editMode && <p className="text-gray-700">{profile.fname}</p>}
          {editMode && (
            <input
              className="bg-inherit border rounded pl-2 focus:outline-none "
              style={{ height: "40px" }}
              name="fname"
              value={fnameValue}
              onChange={editFnameHandle}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="lname">
            Last Name:
          </label>
          {!editMode && <p className="text-gray-700">{profile.lname}</p>}
          {editMode && (
            <input
              className="bg-inherit border rounded pl-2 focus:outline-none "
              style={{ height: "40px" }}
              name="lname"
              value={lnameValue}
              onChange={editLnameHandle}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          {!editMode && <p className="text-gray-700">{profile.email}</p>}
          {editMode && (
            <input
              className="bg-inherit border rounded pl-2 focus:outline-none  "
              style={{ height: "40px" }}
              name="email"
              value={emailValue}
              onChange={editEmailHandle}
            />
          )}
        </div>
        {!editMode && (
          <>
            <div
              style={{ display: "inline-block" }}
              className="bg-blue-500 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Link to="/">Home</Link>
            </div>
            <div
              style={{ display: "inline-block" }}
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Link to="/signout">Logout</Link>
            </div>
          </>
        )}
        {editMode && (
          <div
            style={{ display: "inline-block" }}
            className="bg-blue-500 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <button onClick={submitEditHandle}>Submit</button>
          </div>
        )}
      </div>
    </form>
  );
}
