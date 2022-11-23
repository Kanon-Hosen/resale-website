import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from '../Pages/Home';
import Layout from '../Pages/Layout';
const MainRoutes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout></Layout>,
            children: [
                {
                    path: '/',
                    element:<Home></Home>
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    );

};

export default MainRoutes;