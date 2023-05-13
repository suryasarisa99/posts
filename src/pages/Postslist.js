import axios from "axios";
import { useState, useEffect, useReducer, useContext } from "react";
import immer from "immer";
import Post from "../components/Post";
import ReactDOM from "react-dom";
import Create from "../components/Create";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// let SERVER_URI = "http://192.168.0.169:3000";
import authContext from "../context/authContext";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;
function Postlist() {
  function reducer(state, action) {
    if (action.type === "updateImg") {
      state.posts[action.index].imageUrl = action.payload;
    } else if (action.type === "setPosts") {
      state.posts = action.payload;
    } else if (action.type === "setLikes") {
      state.posts[action.index].likesCount = action.likesCount;
      state.posts[action.index].liked = action.liked;
    }
  }

  const [showCreate, setShowCreate] = useState(false);
  const [state, dispatch] = useReducer(immer(reducer), {
    posts: [],
  });

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios
      .get(`${SERVER_URI}/p/post`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: "setPosts",
          payload: res.data.posts,
        });
        console.log(res.data);
        res.data.posts.forEach((post, ind) => getPostImg(post.post, ind));
      });
  }

  function getPostImg(post, ind) {
    axios
      .get(`${SERVER_URI}/p/post-img/${post}`, {
        withCredentials: true,
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        dispatch({
          type: "updateImg",
          payload: url,
          index: ind,
        });
      });
  }

  let posts = state.posts?.map((post, ind) => {
    return (
      <Post
        post={{ ...post, editable: true }}
        key={post.id}
        logined={true}
        editable={true}
      />
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let data = {
      post: form.post.files[0],
      caption: form.caption.value,
    };
    setShowCreate(false);
    console.log(form.post.files[0]);
    axios
      .post(`${SERVER_URI}/p/post`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getPosts();
      });
  }

  useEffect(() => {
    if (showCreate) {
      window.addEventListener("scroll", () => {
        setShowCreate(false);
      });
    }
  }, [showCreate]);

  return (
    <>
      {posts}
      {!showCreate &&
        ReactDOM.createPortal(
          <div
            className=""
            style={{ position: "fixed", bottom: "20px", right: "40px" }}
          >
            <button onClick={() => setShowCreate(true)}>
              <div className="rounded-full border-2 p-4 bg-inherit">
                <FaPlus style={{ width: "25px", height: "25px" }} />
              </div>
            </button>
          </div>,
          document.querySelector(".overlay")
        )}
      {showCreate && <Create handleSubmit={handleSubmit} />}
      <div className="mt-18"></div>
    </>
  );
}

export default Postlist;
