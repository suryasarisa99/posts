import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import authContext from "../context/authContext";

export default function Navbar() {
  let { logined } = useContext(authContext);

  let navigate = useNavigate();
  return (
    <>
      <nav className="flex p-5 bg-blue-500  mb-10 justify-between items-center">
        <h1 className="ml-5 text-2xl font-medium" onClick={() => navigate("/")}>
          Surya
        </h1>
        <ul className="flex items-center gap-4 text-sm mr-5">
          {!logined && (
            <>
              <li>
                <Link to={"Signup"}>Sign up</Link>
              </li>
              <li>
                <Link to={"signin"}>Sign in</Link>
              </li>
            </>
          )}
          <li>
            <Link to={"discover"}>Discover</Link>
          </li>
          {logined && (
            <>
              <li>
                <Link to="posts">Posts</Link>
              </li>
              <li>
                <Link to="profile">Profile</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
