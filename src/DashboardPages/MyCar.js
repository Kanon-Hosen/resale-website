import React from 'react';

const MyCar = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <input type="text" placeholder="Type here" className="input w-full max-w-xs input-bordered" />
                <button className='btn btn-primary text-gray-50'>Add Car</button>
            </div>
        </div>
    );
};

export default MyCar;