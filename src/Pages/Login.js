import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {BsGoogle} from 'react-icons/bs'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Login = () => {
    document.title = "Login";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  
    const handleLogin = (e) => {
      setLoading(true);
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(false);
          e.target.reset();
          const currentUser = { email: email };
          fetch("http://localhost:5000/jwt", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          }).then(res => res.json())
            .then((data) => {
              console.log("🚀 ~ file: Login.js ~ line 34 ~ .then ~ data", data)
              localStorage.setItem("Token", data.data);
          e.target.reset();
          navigate(from, { replace: true });
            })
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
          e.target.reset();
          setError(err.message);
        });
    };
    // Google sign in:::::::::::::::
  const [user] =useAuthState(auth)
    const googleLogin = () => {
      const gProvider = new GoogleAuthProvider();
      const currentUser = { email: user?.email };
  
      signInWithPopup(auth, gProvider).then((user) => {
        fetch("http://localhost:5000/jwt", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          }).then(res => res.json())
            .then((data) => {
              localStorage.setItem("Token", data.data);
              navigate(from, { replace: true });
            })
      });
    };
    return (
        <div className="flex items-center justify-center w-full h-screen text-slate-800">
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
          <div className="w-96 shadow p-6">
            <h1 className="text-4xl font-bold mb-8">Sign in</h1>
            <div>
              <form onSubmit={handleLogin} className="flex flex-col gap-2">
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
                <p className="text-red-500 text-sm my-1">{error}</p>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-primary to-blue-700 border-none text-white"
                >
                  Sign in
                </button>
              </form>
              <p className="text-center mt-5 font-semibold">Or login with </p>
              <div className="mt-3 flex items-center justify-center gap-8">
                <div
                  onClick={googleLogin}
                            className="flex items-center justify-center gap-4 text-base font-semibold cursor-pointer hover:text-primary btn transition-colors w-full text-slate-50 border-2"
                >
                  <BsGoogle></BsGoogle>
                  <p>Google</p>
                </div>
              </div>
              <p className="mt-3 text-center text-sm">
                Don't have an account ?{" "}
                <Link
                  className="font-semibold hover:underline transition-all"
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
};

export default Login;