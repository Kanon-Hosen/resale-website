import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Blog from '../Pages/Blog';
import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import Layout from '../Pages/Layout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Services from '../Pages/Services';
const MainRoutes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout></Layout>,
            children: [
                {
                    path: '/',
                    element:<Home></Home>
                },
                {
                    path: '/services',
                    element:<Services></Services>,
                },
                {
                    path: '/blog',
                    element:<Blog></Blog>
                },
                {
                    path: '/login',
                    element:<Login></Login>
                },
                {
                    path: '/register',
                    element:<Register></Register>
                },
                {
                    path: '/dashboard',
                    element:<Dashboard></Dashboard>
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    );

};

export default MainRoutes;