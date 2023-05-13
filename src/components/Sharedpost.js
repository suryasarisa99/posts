import { useState, useContext, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import Loading from "./loading.jpg";
import axios from "axios";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import authContext from "../context/authContext";

// let SERVER_URI = "http://192.168.0.169:3000";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;

export default function Sharedpost(
  {
    /* post, logined, getPosts */
  }
) {
  let [post, setPost] = useState({});
  const [likeStatus, setLikeStatus] = useState({
    liked: post.liked || false,
    likesCount: post.likesCount || 0,
  });
  useEffect(() => {
    fetchPost(postId);
    fetchLikeDetails();
  }, []);
  let { logined } = useContext(authContext);
  const [showComments, setShowComments] = useState(false);
  const [postEditMode, setPostEditMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [captionEditText, setCaptionEditText] = useState(post.caption);
  let [postDeleted, setPostDeleted] = useState(false);
  let { postId } = useParams();
  function fetchPost(postId) {
    axios
      .get(`${SERVER_URI}/p/post-shared/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPost(res.data.postToShare);
        setCaptionEditText(res.data.postToShare.caption);
        getPostImg(res.data.postToShare);
      });
  }
  function getPostImg(postToShare) {
    axios
      .get(`${SERVER_URI}/p/post-img/${postToShare.post}`, {
        withCredentials: true,
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setPost({ ...postToShare, imageUrl: url });
      });
  }
  const toggleLike = async () => {
    // logic to toggle like
    setLikeStatus({
      liked: !likeStatus.liked,
      likesCount: likeStatus.likesCount + (likeStatus.liked ? -1 : 1),
    });
    updateLikeDetails();
  };
  function fetchLikeDetails() {
    axios
      .get(`${SERVER_URI}/l/like-status/${post.id}/post`, {
        withCredentials: true,
      })
      .then((res) => {
        setLikeStatus({
          liked: res.data.liked,
          likesCount: res.data.likesCount,
        });
      });
  }
  function updateLikeDetails() {
    axios
      .post(
        `${SERVER_URI}/l/liked/${post.id}/post`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  function fetchComments(id) {
    axios.get(`${SERVER_URI}/c/comments/${id}`, { postId: id }).then((res) => {
      console.log(res.data);
      setComments(res.data);
    });
  }

  function handleComments() {
    if (!showComments) {
      fetchComments(post.id);
      setShowComments(true);
    } else setShowComments(false);
  }

  function deletePost() {
    let url = `${SERVER_URI}/p/post/${post.id}`;
    console.log(url);
    axios
      .delete(url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setPostDeleted(true);
      });
  }

  function captionEditHandler(event) {
    setCaptionEditText(event.target.value);
  }

  function editPost() {
    post.caption = captionEditText;
    if (postEditMode) {
      console.log(post.id);
      let url = `${SERVER_URI}/p/post-edit/${post.id}`;
      console.log(url);
      axios
        .post(
          url,
          {
            caption: captionEditText,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    }
    setPostEditMode(!postEditMode);
  }

  return (
    !postDeleted && (
      <div
        className="bg-white rounded-lg  mx-auto mb-5 shadow-lg border p-6"
        style={{ width: "400px" }}
        key={post.id}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {(
              <img
                src={dummyPostData.imageUrl || Loading}
                alt="Post"
                className="w-16 h-16 rounded-full"
                style={{ width: "40px", height: "40px" }}
              />
            ) || "Loading..."}
            <div className="ml-4">
              {/* <h2 className="font-semibold">{dummyPostData.posterName}</h2> */}
              <h2 className="font-semibold">{post.name}</h2>
            </div>
          </div>

          {post.editable && (
            <div className="actions flex gap-3">
              <FaTrashAlt
                className="bg-gray-90"
                style={{
                  color: "rgb(100,50,50)",
                }}
                onClick={deletePost}
              />
              <FaEdit
                className="bg-gray-90"
                style={{
                  color: "rgb(30,30,30)",
                }}
                onClick={editPost}
              />
            </div>
          )}
        </div>
        {(
          <img
            src={post.imageUrl || Loading}
            style={{ height: "500px", objectFit: "cover" }}
            className="py-5"
            alt="#a"
          />
        ) || "Loading..."}
        {!postEditMode && (
          <p className="text-md text-gray-500">{post.caption}</p>
        )}
        {postEditMode && (
          <textarea
            name=""
            onChange={captionEditHandler}
            value={captionEditText}
            id=""
            cols="30"
            rows="2"
            style={{ background: "inherit", width: "330px" }}
            className="focus:outline-none p-2"
          ></textarea>
        )}
        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center text-gray-600">
            <GoHeart
              className={"text-2xl " + (likeStatus.liked ? "text-red-500" : "")}
              onClick={toggleLike}
            />
            {/* {dummyPostData.likeCount} likes */}
            {likeStatus.likesCount} likes
          </button>
          <FaShare
            onClick={() =>
              navigator.clipboard.writeText(
                "http:localhost:3001/shared-post/" + post.id
              )
            }
          />
          <button className="text-gray-600" onClick={handleComments}>
            {showComments ? "Hide" : "View"} comments
          </button>
        </div>
        {showComments && (
          <Comment
            comments={comments}
            fetchComments={fetchComments}
            postId={post.id}
            logined={logined}
          />
        )}
      </div>
    )
  );
}

const dummyPostData = {
  imageUrl: "https://source.unsplash.com/random/400x400",
};
