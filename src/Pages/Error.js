import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='text-9xl font-bold text-slate-800'>404</h1>
            <p className='text-xl font-semibold font-serif  text-blue-400'>Page not found</p>
            <Link to='/' className='bg-blue-400 text-white font-semibold mt-4 px-5 py-3 rounded-xl'>Back to home</Link>
        </div>
    );
};

export default Error;