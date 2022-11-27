import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [refres, setRefres] = useState(false);
  useEffect(() => {
    fetch("https://resell-4tq3lnx88-kanon-hosen.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setBuyers(data);
      });
  }, [refres]);
  const handleDelete = (email) => {
    const procced = window.confirm("Delete seller");
    if (procced) {
      fetch(
        `https://resell-4tq3lnx88-kanon-hosen.vercel.app/user?email=${email}`,
        {
          method: "delete",
        }
      ).then(() => {
        setRefres(!refres);
      });

      return toast.success("Delete seller Successfuly");
    }
    return;
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((buyer, i) => {
              if (buyer.accountType === "Buyer") {
                return (
                  <tr>
                    <th>{1 + i}</th>
                    <td>{buyer.username}</td>
                    <td>{buyer.email}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(buyer?.email)}
                        className="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
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

export default AllBuyers;
