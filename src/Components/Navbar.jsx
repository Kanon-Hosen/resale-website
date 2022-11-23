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
    <div className="navbar bg-blue-50 px-16 shadow border-b-2 border">
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
              <Link to="/home">Home</Link>
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
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 text-slate-900">
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
          <Link onClick={handleLogout} className=" px-5 py-2 btn-primary text-white">
            Log Out
          </Link>
        ) : (
          <Link to="/login" className=" px-5 py-2 btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
