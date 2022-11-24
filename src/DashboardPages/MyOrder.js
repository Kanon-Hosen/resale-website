import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/Firebase";
import { useState } from "react";

const MyOrder = () => {
  const [user] = useAuthState(auth);

  const [orders, setOrders] = useState([]);
  console.log("🚀 ~ file: MyOrder.js ~ line 11 ~ MyOrder ~ orders", orders);

  useEffect(() => {
    fetch(`http://localhost:5000/myorder/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, [user?.email]);

  if (!orders?.length) {
    return (
      <div className="w-full h-full  text-slate-700 font-semibold text-3xl text-center">
        <p>No order avilabe</p>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Car Image</th>
              <th>Car Name</th>
              <th>Car Price</th>
              <th>Seller Name</th>
              <th>Meeting Location</th>
              <th>Seller Number</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr>
                <th>{1 + i}</th>
                <td>
                  <img
                    className="w-16 h-16 object-cover rounded-full ring-2"
                    src={order.carImage}
                    alt=""
                  />
                </td>
                <td>{order.carName}</td>
                <td>{order.price}</td>
                <td>{order.sellerName}</td>
                <td>{order.meetingLocation}</td>
                <td>{order.sellerNumber}</td>
                <td>
                  <button className="btn btn-primary btn-sm">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
