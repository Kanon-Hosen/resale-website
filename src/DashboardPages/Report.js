import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Report = () => {
  const [reports, setReport] = useState([]);
  const [refres, setRefres] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/report")
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
      });
  }, [refres]);
    const handleDelete = (id) => {
            fetch(`http://localhost:5000/report/${id}`, {
                method: "DELETE",
            }).then(() => {
                    fetch(`http://localhost:5000/mycar/${id}`, {
                        method: "delete",
                    }).then((res) => {
                       res.json()
                    }).then(() => {
                    setRefres(!refres);
                    toast.success("Delete Successfully");
                })
        })
    }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Car Name</th>
              <th>Seller Name</th>
              <th>Seller email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((order, i) => (
              <tr key={order._id}>
                <th>{1 + i}</th>
                <td>{order.carName}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>
                  <button onClick={()=>handleDelete(order?._id)} className="btn btn-error btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
