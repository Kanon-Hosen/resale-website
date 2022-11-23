import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Config/Firebase";
import toast from 'react-hot-toast';
const Register = () => {
  document.title = "Register";
  const url =
    "https://api.imgbb.com/1/upload?key=ff2b48e99f3ed8f260b16b42b028c8f5";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.file.files[0];
    const acocunt = e.target.account.value;
    const formData = new FormData();
    formData.append("image", image);
    const password = e.target.password.value;
      const user = { username: name, email, accountType: acocunt };
    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((currentUser) => {
            console.log(currentUser);
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: data.data.display_url,
            }).then(() => {
              e.target.reset();
              setLoading(false);
              fetch("http://localhost:4000/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(user),
              }).then(() => {});
              navigate("/");
              toast.success('Register Successfully');
            });
          })
          .catch((err) => {
            console.log(err.message);
            e.target.reset();
            setLoading(false);
            setError(err.message);
          });
      })
      .catch((err) => console.log(err.message));
  };
  // google::::::::::::::::::::
  const hanedleGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="flex items-center justify-center w-full h-full my-10">
      <div
        className={`${
          loading ? "visible" : "hidden"
        } absolute top-16 flex items-center justify-center w-full h-screen bg-gray-900 bg-opacity-20`}
      >
        <div role="status" className="z-50">
          <svg
            className="inline z-50 mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="w-96 shadow p-6 text-slate-800">
        <h1 className="text-4xl font-bold mb-8">Sign up</h1>
        <div>
          <form onSubmit={handleSignUp} className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              name="name"
              className="border p-3 border-gray-500 rounded mb-2"
              type="text"
              required
              placeholder="Username"
            />
            <label htmlFor="username">Profile Picture</label>
            <input
              name="file"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full"
            />
            <label htmlFor="Email">Email</label>
            <input
              name="email"
              className="border p-3 border-gray-500 rounded mb-2"
              type="email"
              required
              placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              className="border p-3 border-gray-500 rounded mb-5"
              type="password"
              required
              placeholder="Enter your password"
            />
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Select account type</span>
              </label>
              <select required name="account" className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option value='Buyer'>Buyer</option>
                <option value='Seller'>Seller</option>
              </select>
            </div>
            <p>{error}</p>
            <button
              type="submit"
              className="btn bg-gradient-to-r from-primary to-blue-700 border-none text-white"
            >
              Sign up
            </button>
          </form>
          <p className="text-center mt-5 font-semibold">Or register with </p>
          <div className="mt-3 flex items-center justify-center gap-8">
            <div
              onClick={hanedleGoogle}
              className="flex items-center justify-center gap-4 text-base font-semibold cursor-pointer hover:text-primary btn transition-colors w-full text-slate-50 border-2"
            >
              <BsGoogle></BsGoogle>
              <p>Google</p>
            </div>
          </div>
          <p className="mt-3 text-center text-sm">
            Already have an account ?{" "}
            <Link
              className="font-semibold hover:underline transition-all"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
