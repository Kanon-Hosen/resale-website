import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Blog from '../Pages/Blog';
import Category from '../Pages/Category';
import Dashboard from '../DashboardPages/DashboardLayout';
import Home from '../Pages/Home';
import Layout from '../Pages/Layout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Services from '../Pages/Services';
import MyCar from '../DashboardPages/MyCar';
import Orders from '../DashboardPages/Orders';
import AddCar from '../DashboardPages/AddCar';
import MyOrder from '../DashboardPages/MyOrder';
import MyBuyer from '../DashboardPages/MyBuyer';
import PrivateRoute from '../Private/PrivateRoute';
import AllBuyers from '../DashboardPages/AllBuyers';
import AllSellers from '../DashboardPages/AllSellers';
import Report from '../DashboardPages/Report';
import DashboardDefault from '../DashComponents/DashboardDefault';
import Payment from '../DashboardPages/Payment';
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
                    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                    children: [
                        {
                            path: '/dashboard',
                            element:<DashboardDefault></DashboardDefault>
                    },
                        {
                            path: '/dashboard/mycar',
                            element:<MyCar></MyCar>
                        },
                        {
                            path: '/dashboard/orders',
                            element:<Orders></Orders>
                        },
                        {
                            path: '/dashboard/addcar',
                            element:<AddCar></AddCar>
                        },
                        {
                            path: '/dashboard/myorder',
                            element:<MyOrder></MyOrder>
                        },
                        {
                            path: '/dashboard/mybuyer',
                            element:<MyBuyer></MyBuyer>
                        },
                        {
                            path: '/dashboard/allsellers',
                            element:<AllSellers></AllSellers>
                        },
                        {
                            path: '/dashboard/allbuyers',
                            element:<AllBuyers></AllBuyers>
                        },
                        {
                            path: '/dashboard/report',
                            element:<Report></Report>
                        },
                        {
                            path: '/dashboard/payment',
                            element:<Payment></Payment>
                        },
                    ]
                },
                {
                    path: '/category/:name',
                    element:<PrivateRoute><Category></Category></PrivateRoute>
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    );

};

export default MainRoutes;