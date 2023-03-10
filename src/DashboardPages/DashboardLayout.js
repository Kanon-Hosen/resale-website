import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router';
import Sppiner from '../Components/Sppiner';
import { auth } from '../Config/Firebase';
import Sidebar from '../DashComponents/Sidebar';

const DashboardLayout = () => {
    const [user,loading] = useAuthState(auth);
    if (loading) {
        return <Sppiner></Sppiner>
    }
    return (
        <div className='flex md:justify-between'>
            <div className='md:w-1/5 w-1/3 h-screen'>
            <Sidebar></Sidebar>
            </div>
            <div className='w-4/5 md:my-10 my-3 md:mx-16 ml-3'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;