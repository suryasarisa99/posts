import axios from "axios";
import { useState, useEffect, useContext, useReducer } from "react";
import immer from "immer";
import Post from "../components/Post";
import authContext from "../context/authContext";
// let SERVER_URI = "http://192.168.0.169:3000";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;
export default function Discover() {
  let { logined } = useContext(authContext);

  function reducer(state, action) {
    if (action.type === "updateImg") {
      state.posts[action.index].imageUrl = action.payload;
    } else if (action.type === "setPosts") {
      state.posts = action.payload;
    }
  }

  const [state, dispatch] = useReducer(immer(reducer), {
    posts: [],
  });
  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios
      .get(`${SERVER_URI}/p/all-posts`, {
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
    const id = post.split("/").pop();
    axios
      .get(`${SERVER_URI}/p/post-img/${id}`, {
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

  return state.posts?.map((post, ind) => {
    return (
      <Post post={post} logined={logined} getPosts={getPosts} key={post.id} />
    );
  });
}
