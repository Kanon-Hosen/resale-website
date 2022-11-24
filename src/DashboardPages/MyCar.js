import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/Firebase";

const MyCar = () => {
  const [user, loading] = useAuthState(auth);

  const email = user?.email;
  const [allcar, setAllcar] = useState([]);
  console.log("🚀 ~ file: MyCar.js ~ line 14 ~ MyCar ~ allcar", allcar);
  useEffect(() => {
    fetch(`http://localhost:5000/mycar?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setAllcar(data.car);
      });
  }, [email]);
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs input-bordered"
        />
        <button className="btn btn-primary text-gray-50">Add Car</button>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Car Image</th>
                <th>Car name</th>
                <th>Resell Price</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allcar?.map((car, i) => (
                <tr key={car?._id}>
                  <th>{1 + i}</th>
                  <td>
                    <img
                      className="w-24 h-24 rounded-full"
                      src={car?.image}
                      alt=""
                    />
                  </td>
                  <td>{car?.carName}</td>
                  <td>{car?.reSellPrice}</td>
                  <td>{car?.category}</td>
                  <td>{car?.location}</td>
                  <td>
                    {car.sold ? (
                      <p className="text-red-500">Sold</p>
                    ) : (
                      <p className="text-green-50 bg-green-500 border-none btn btn-sm">
                        Active
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCar;
