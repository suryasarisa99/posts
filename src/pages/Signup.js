import axios from "axios";
import { useNavigate } from "react-router";
// let SERVER_URI = "http://192.168.0.169:3000";
let SERVER_URI = process.env.REACT_APP_SERVER_URI;

export default function Signup() {
  let navigate = useNavigate();
  let submitHandle = (e) => {
    e.preventDefault();
    let form = e.target;
    let data = {
      fname: form.fname.value,
      lname: form.lname.value,
      email: form.email.value,
      password: form.password.value,
    };
    console.log("data: ");
    console.log(data);
    axios.post(`${SERVER_URI}/auth/signup`, data).then((res) => {
      console.log(res);
      if (res.data.message === "userCreated") navigate("/signin");
    });
  };
  return (
    <>
      <div className=" mx-auto flex justify-center">
        <form
          className="w-full max-w-sm  mx-auto rounded-lg p-10"
          action="/signup"
          method="POST"
          style={{ display: "inline-block" }}
          onSubmit={submitHandle}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="fname"
            >
              First Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fname"
              name="fname"
              type="text"
              placeholder="John"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lname"
            >
              Last Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lname"
              name="lname"
              type="text"
              placeholder="Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
