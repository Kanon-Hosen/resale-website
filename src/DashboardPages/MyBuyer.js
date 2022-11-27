import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Config/Firebase';

const MyBuyer = () => {
    const [user] = useAuthState(auth);
  const [buyers, setBuyers] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:5000/myorder/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('Token')}`
          }
        })
            .then(res => res.json())
            .then(data => {
                setBuyers(data);
        })
    }, [user?.email]);
  
    return (
        <div>
              <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Buyer Image</th>
                <th>Name</th>
                <th>Buyer Email</th>
                <th>Buyer Number</th>
                <th>Buyer Location</th>
                {/* <th>Location</th>
                <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {buyers?.map((buyer, i) => (
                <tr key={buyer?._id}>
                  <th>{1 + i}</th>
                  <td>
                    <img
                      className="w-16 h-16 rounded-full"
                      src={buyer?.buyerPic}
                      alt=""
                    />
                  </td>
                  <td>{buyer?.buyerName}</td>
                  <td>{buyer?.buyerEmail}</td>
                  <td>{buyer?.buyerPhone}</td>
                  <td>
                        {buyer?.meetingLocation}
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

export default MyBuyer;