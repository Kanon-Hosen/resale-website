import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [refres, setRefres] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
      });
  }, [refres]);

  const handleVerify = (seller) => {
    fetch(`http://localhost:5000/users/${seller?._id}`, {
      method: "PUT",
      headers: {
        "content-type":"application/json"
      },
    })
    .then((res) => res.json())
    .then((data) => {
      fetch(`http://localhost:5000/mycar?email=${seller?.email}`, {
        method: "PUT",
        headers: {
          "content-type":"application/json",
        }
      }).then(res => res.json())
        .then(() => {
          setRefres(!refres)
      })
     
    });
  }
  const handleDelete = (email) => {
    const procced = window.confirm("Delete seller");
    if (procced) {
      fetch(`http://localhost:5000/user?email=${email}`, {
        method:"delete"
      }).then(() => {
        setRefres(!refres)

      })
        
        return toast.success("Delete seller Successfuly");
    }return 
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => {
              if (seller.accountType === "Seller") {
                return (
                  <tr>
                    <th>{1 + i}</th>
                    <td>{seller.username}</td>
                    <td>{seller.email}</td>
                    <td>
                      {seller?.status ? (
                        <p className="btn btn-xs btn-primary">Verifyed</p>
                      ) : (
                          <div>
                            {
                              seller?.verify ? <p className="text-green-500">Verified</p> :<p
                              onClick={()=>handleVerify(seller)}
                              className="btn btn-xs btn-primary"
                            >
                              Verify
                            </p>
                            }
                        </div>
                      )}
                    </td>
                    <td>
                      <button onClick={()=>handleDelete(seller?.email)} className="btn btn-error btn-xs">Delete</button>
                    </td>
                  </tr>
                );
              }
              return "";
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
