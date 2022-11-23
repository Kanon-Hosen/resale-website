import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
<div className="navbar bg-blue-50 px-16 shadow-md border-b-2 border">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-slate-900">
      <li><Link>Home</Link></li>
      <li><Link>Service</Link></li>
              <li><Link>Blog</Link></li>
      <li><Link>Dashboard</Link></li>
              
      </ul>
    </div>
    <a className="normal-case text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal p-0 text-slate-900">
      <li><Link>Home</Link></li>
      <li><Link>Service</Link></li>
      <li><Link>Blog</Link></li>
      <li><Link>Dashboard</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link className=" px-5 py-2 btn-primary text-white">Login</Link>
  </div>
</div>
    );
};

export default Navbar;