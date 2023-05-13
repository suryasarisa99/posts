import axios from "axios";
import ReactDOM from "react-dom";
// let SERVER_URI = "http://192.168.0.169:3000";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;

export default function Create({ handleSubmit }) {
  return ReactDOM.createPortal(
    <form
      action=""
      className="border-2 p-4 rounded-md shadow-md mx-auto bg-gray-950"
      style={{
        display: "inline-block",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
        position: "fixed",
        left: "50%",
        bottom: "10px",
      }}
      onSubmit={handleSubmit}
    >
      <textarea
        className="border focus:outline-none p-3 bg-gray-800"
        style={{ width: "400px", height: "100px" }}
        id=""
        cols="30"
        rows="10"
        name="caption"
      ></textarea>
      <br />
      <input type="file" name="post" />
      <button className="py-2 px-5 text-lg text-white font-bold rounded-lg bg-blue-500">
        Post
      </button>
    </form>,
    document.querySelector(".overlay")
  );
}
