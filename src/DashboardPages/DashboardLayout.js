import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../DashComponents/Sidebar';

const DashboardLayout = () => {
    return (
        <div className='flex justify-between'>
            <div className='w-1/5'>
            <Sidebar></Sidebar>
            </div>
            <div className='w-4/5 my-10 mx-16'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;