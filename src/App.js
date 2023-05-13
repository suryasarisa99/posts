import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Postlist from "./pages/Postslist";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import authContext from "./context/authContext";
import { useContext } from "react";
import Sharedpost from "./components/Sharedpost";
// import { useHistory } from "react-router-dom";
import "./styles.css";
import { unstable_HistoryRouter } from "react-router-dom";
export default function App() {
  let navigate = useNavigate();
  let { logined } = useContext(authContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/signup"} Component={Signup} />
        <Route path={"/signin"} Component={Signin} />
        <Route path={"/discover"} Component={Discover} />
        <Route path={"/shared-post/:postId"} Component={Sharedpost} />
        {logined && (
          <>
            <Route path={"/signout"} Component={Signout} />
            <Route path={"/posts"} Component={Postlist} />
            <Route path={"/profile"} Component={Profile} />
          </>
        )}
      </Routes>
    </>
  );
}
