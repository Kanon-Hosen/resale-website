import React from "react";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Sppiner from "../Components/Sppiner";
const Sidebar = () => {
  const [user, loading] = useAuthState(auth);
  const [Mainuser, setUser] = useState({});
  console.log(
    "🚀 ~ file: Sidebar.jsx ~ line 11 ~ Sidebar ~ Mainuser",
    Mainuser
  );
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [user?.email]);
  if (loading) {
    return <Sppiner></Sppiner>
  }
  return (
    <div className="bg-gray-100 border-r-2">
      <div className="w-full flex flex-col items-center justify-center py-5">
        <img
          className="rounded-full w-24 h-24 ring-2 mb-3"
          src={user?.photoURL}
          alt=""
        />
        <div className="flex items-center justify-center gap-2">
          <p className="text-center font-semibold text-xl text-slate-900">
            {user?.displayName}
          </p>
          {Mainuser.accountType === "Seller" ? (
            <BsFillPatchCheckFill
              title="Verifyed"
              className="text-blue-500 font-bold text-xl"
            ></BsFillPatchCheckFill>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="drawer drawer-mobile shadow-lg ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content ">
            {
              Mainuser?.role === 'admin' ? <ul>
              <li><Link to='/dashboard/allsellers'>All sellers</Link></li>
              <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
              </ul> : <ul>
              {Mainuser?.accountType === "Seller" ? (
              <ul>
                <li>
                  <Link to="/dashboard/mycar">All Car</Link>
                </li>
                <li>
                  <Link to="/dashboard/addcar">Add Car</Link>
                </li>
                <li>
                  <Link to="/dashboard/myorder">All Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/mybuyer">My Buyer</Link>
                </li>
              </ul>
            ) : (
              <li>
                <Link to="/dashboard/myorder">My Order</Link>
              </li>
            )}
              </ul>
            }
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
