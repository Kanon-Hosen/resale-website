import React, { useEffect, useState } from 'react';

const AllBuyers = () => {
    const [buyers, setBuyers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setBuyers(data);
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
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {
                buyers?.map((buyer, i) => {
                    if (buyer.accountType === 'Buyer') {
                        return  <tr>
                            <th>{1+ i}</th>
                            <td>{buyer.username}</td>
                            <td>{buyer.email}</td>
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

export default AllBuyers;