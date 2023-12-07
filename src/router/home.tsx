import React from "react";
import Index from "@/view/home/Index";
import Detail from "@/view/home/Detail";
import Confirm from "@/view/home/Confirm";
import Booking from "@/view/home/Booking";
import Coupon from "@/view/home/Coupon";

export default [
    {
        path: '/home',
        element: <Index/>,
        showMenu: true
    },
    {
        path: '/home/detail',
        element: <Detail/>
    },
    {
        path: '/home/confirm',
        element: <Confirm/>
    },
    {
        path: '/home/booking',
        element: <Booking/>
    },
    {
        path: '/home/coupon',
        element: <Coupon/>
    },
]