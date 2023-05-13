import { GoHeart } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
// let SERVER_URI = "http://192.168.0.169:3000";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;
export default function Comment({ comments, postId, fetchComments, logined }) {
  const [commentMessage, setCommentMessage] = useState("");
  function submitComment() {
    let comment = document.querySelector(".comment");
    axios
      .post(
        `${SERVER_URI}/c/comment`,
        {
          comment: commentMessage,
          postId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchComments(postId);
        setCommentMessage("");
      });
  }

  function commentMessageHandle(event) {
    setCommentMessage(event.target.value);
  }

  return (
    <div className="mt-4">
      {logined && (
        <div className="comment-input flex justify-between items-center">
          <input
            className="comment p-1 height-80px border rounded border-black  bg-inherit focus:outline-none "
            type="text"
            style={{}}
            name="comment"
            value={commentMessage}
            onChange={commentMessageHandle}
          />
          <FaLocationArrow
            className="w-80"
            type="submit"
            onClick={submitComment}
          />
        </div>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start mt-4">
          <img
            src="https://source.unsplash.com/random/40x40"
            alt="Commenter"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-4">
            <h3 className="font-semibold">{comment.name}</h3>
            <p className="text-sm text-gray-500">{comment.comment}</p>
            <button className="flex items-center text-gray-600">
              <GoHeart />
              {comment.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
