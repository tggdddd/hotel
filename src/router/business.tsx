import React from "react";
import Index from "@/view/business/Index";
import Login from "@/view/business/Login";
import Register from "@/view/business/Register";
import Profile from "@/view/business/Profile";
import Collect from "@/view/business/Collect";
import Order from "@/view/business/Order";
import Coupon from "@/view/business/Coupon";

const routes: Array<any> = [
    {
        path: '/business',
        auth: true,
        element: <Index/>,
        showMenu: true
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/collect',
        element: <Collect/>
    },
    {
        path: '/order',
        element: <Order/>
    },
    {
        path: '/business/coupon',
        element: <Coupon/>
    }
]

export default routes