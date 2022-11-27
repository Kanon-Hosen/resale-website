import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { auth } from "../Config/Firebase";

const MyCar = () => {
  const [user, loading] = useAuthState(auth);

  const email = user?.email;
  const [allcar, setAllcar] = useState([]);
  const [refres, setRefres] = useState(false);
  console.log("🚀 ~ file: MyCar.js ~ line 14 ~ MyCar ~ allcar", allcar);
  useEffect(() => {
    fetch(
      `https://resell-4tq3lnx88-kanon-hosen.vercel.app/mycar?email=${email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllcar(data.car);
      });
  }, [email, refres]);

  const handleStatus = (id) => {
    console.log("🚀 ~ file: MyCar.js ~ line 24 ~ handleStatus ~ id", id);
    // const status = "sold"
    fetch(
      `https://resell-4tq3lnx88-kanon-hosen.vercel.app/mycar/${id}?email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify("sold"),
      }
    ).then(() => {
      setRefres(!refres);
    });
  };
  const handleAdd = (car) => {
    fetch(
      `https://resell-4tq3lnx88-kanon-hosen.vercel.app/advertise/${car?._id}?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(car),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return toast.success("Advertise Successfully");
        }
        return toast.error("Already added");
      });
  };
  // ? Delete Sold out Product:::::::::::::::::
  const handleDelelte = (id) => {
    const procced = window.confirm("Delete car");
    if (procced) {
      fetch(`https://resell-4tq3lnx88-kanon-hosen.vercel.app/mycar/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(
            `https://resell-4tq3lnx88-kanon-hosen.vercel.app/advertise/${id}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .then(() => {
              setRefres(!refres);
            });
          return toast.success("Delete Success");
        });
    }
    return toast.error("Cancel");
  };
  if (allcar?.length < 1) {
    return (
      <div className="text-center text-4xl mt-8 text-slate-800">
        No car available
      </div>
    );
  } else {
    return (
      <div>
        <h1 className=" font-bold text-3xl">All Cars</h1>
        <div className="mt-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Car Image</th>
                  <th>Carname</th>
                  <th>Resell Price</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Advertise</th>
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
                      {car?.status === "sold" ? (
                        <p className="btn btn-sm bg-red-600 border-none">
                          Sold
                        </p>
                      ) : (
                        <p
                          onClick={() => handleStatus(car?._id)}
                          className="text-green-50 bg-green-500 border-none btn btn-sm"
                        >
                          Avilable
                        </p>
                      )}
                    </td>
                    <td>
                      {car?.status === "sold" ? (
                        <p
                          onClick={() => handleDelelte(car?._id)}
                          className="btn btn-sm bg-red-600 border-none"
                        >
                          Delete
                        </p>
                      ) : (
                        <p
                          onClick={() => handleAdd(car)}
                          className="text-green-50 bg-blue-400 border-none btn btn-sm"
                        >
                          Advertise
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
  }
};

export default MyCar;
