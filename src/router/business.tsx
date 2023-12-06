import React from "react";
import Index from "@/view/business/Index";
import Login from "@/view/business/Login";
import Register from "@/view/business/Register";
import Profile from "@/view/business/Profile";
import Collect from "@/view/business/Collect";
import Order from "@/view/business/Order";

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
    }
]

export default routes