import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {signOut} from 'firebase/auth'
const Navbar = () => {
  const [user] = useAuthState(auth);
  const handleLogout = async() => {
    await signOut(auth);
  }
  return (
    <div className="navbar bg-blue-100 px-4 md:px-16 shadow-md shadow-gray-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-slate-900"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Service</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="normal-case text-xl">
          <p className="font-serif font-semibold text-slate-900 text-xl" ><span className="text-blue-500 drop-shadow-sm">Uni</span>Car</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 text-slate-900 drop-shadow-lg shadow-blue-400">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Service</Link>
          </li>
          <li>
            <Link to="blog">Blog</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3 md:gap-5">
            <Link><img className="w-10 h-10 rounded-full ring-2 shadow-lg shab" src={user?.photoURL} alt="" /></Link>
            <Link onClick={handleLogout} className=" px-5 py-2 rounded-md border-none shadow-lg shadow-blue-300 bg-blue-400 rounde text-white">
            Log Out
          </Link>
          </div>
        ) : (
          <Link to="/login" className=" px-5 py-2 rounded-md border-none shadow-lg shadow-blue-300 bg-blue-400 text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
