import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AllSellers = () => {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setSellers(data);
        })
    },[])
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
    {
                sellers.map((seller, i) => {
                    if (seller.accountType === 'Seller') {
                        return  <tr>
                            <th>{1+ i}</th>
                            <td>{seller.username}</td>
                            <td>{seller.email}</td>
                            <td>{seller?.status ? <p className='btn btn-xs btn-primary'>Verifyed</p> : <p>Verify</p>}</td>
                        <td><button className='btn btn-error btn-xs'>Delete</button></td>
                      </tr>
                    }
                   return ''
                })
            }
    </tbody>
  </table>
</div>
          
        </div>
    );
};

export default AllSellers;