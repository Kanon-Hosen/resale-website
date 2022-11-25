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