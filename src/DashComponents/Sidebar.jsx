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
    return <Sppiner></Sppiner>;
  }
  return (
    <div className="bg-gray-100 w-full overflow-x-hidden h-screen border-r-2 shadow p-2">
      <div className="w-full flex flex-col items-center justify-center py-5">
        <img
          className="rounded-full md:w-24 md:h-24 w-12 h-12 ring-2 mb-3"
          src={user?.photoURL}
          alt=""
        />
        <div className="flex items-center justify-center gap-2">
          <p className="text-center font-semibold md:text-xl text-xs text-slate-900">
            {user?.displayName}
          </p>
          {Mainuser.verify && (
            <BsFillPatchCheckFill
              title="Verifyed"
              className="text-blue-500 font-bold text-xl"
            ></BsFillPatchCheckFill>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="  ">
        <div className=" flex flex-col items-center justify-center">
          {/* <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> */}
        </div>
        <div className="w-full ">
          <ul className="md:menu md:p-4 w-full md:w-80 text-base-content ">
            {Mainuser?.role === "admin" ? (
              <ul>
                <li>
                  <Link className="text-sm my-3" to="/dashboard/allsellers">All sellers</Link>
                </li>
                <li>
                  <Link className="text-sm" to="/dashboard/allbuyers">All Buyers</Link>
                </li>
                <li>
                  <Link className="text-sm" to="/dashboard/report">Report item</Link>
                </li>
              </ul>
            ) : (
              <ul>
                {Mainuser?.accountType === "Seller" ? (
                  <ul className="flex flex-col gap-4">
                    <li>
                      <Link className="text-sm w-full" to="/dashboard/mycar">All Car</Link>
                    </li>
                    <li>
                      <Link className="text-sm w-full" to="/dashboard/addcar">Add Car</Link>
                    </li>
                    <li>
                      <Link className="text-sm w-full" to="/dashboard/myorder">All Orders</Link>
                    </li>
                    <li>
                      <Link className="text-sm w-full" to="/dashboard/mybuyer">My Buyer</Link>
                    </li>
                  </ul>
                ) : (
                  <li>
                    <Link className="text-sm w-full" to="/dashboard/myorder">My Order</Link>
                  </li>
                )}
              </ul>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
