import React from "react";
import Menu from "@/components/Menu";
import "@/assets/css/reset.css"
import {Navigate, Outlet} from "react-router-dom";
import {useRouteStatus} from "@/common";

export default function () {
    const routeStatus = useRouteStatus();
    // 跳转
    if (routeStatus.redirect) {
        return <Navigate to={routeStatus.redirect}/>
    }
    return (<>
        <Outlet/>
        <Menu/>
    </>)
}