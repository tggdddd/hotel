import React from "react";
import Index from "@/view/home/Index";
import Detail from "@/view/home/Detail";
import Confirm from "@/view/home/Confirm";
import Booking from "@/view/home/Booking";

export default [
    {
        path: '/home',
        element: <Index/>,
        showMenu: true
    },
    {
        path: '/home/detail/:id',
        element: <Detail/>
    },
    {
        path: '/home/confirm/:id',
        element: <Confirm/>
    },
    {
        path: '/home/booking/:id',
        element: <Booking/>
    },
]