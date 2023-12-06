import {useNavigate} from "react-router-dom";
import React from 'react';
import {useRouteStatus} from "@/common";
import {TabBar} from "antd-mobile";
import {FileOutline, UserCircleOutline} from "antd-mobile-icons"
import "./Menu.css"

const Menu = function () {
    const navigate = useNavigate()
    const routeStatus = useRouteStatus()
    let tabs: Array<any> = [
        {key: "/home", icon: <FileOutline/>, title: "首页"},
        // {key: "/reserve", icon: <CheckShieldOutline/>, title: "预定", needLogin: true},
        {key: "/business", icon: <UserCircleOutline/>, title: "我的"},
    ]
    if (!routeStatus.isLogin) {
        tabs = tabs.filter(e => e.needLogin !== true)
    }

    function setRouteActive(path: string) {
        navigate(path)
    }

    function calcActiveKey() {
        let path = routeStatus.path
        if (path === "/login") {
            return "/business"
        }
        return path
    }

    if (routeStatus.showMenu) {
        return (
            <>
                <div className="footerEmpty"></div>
                <div className="footer">
                    <TabBar activeKey={calcActiveKey()} onChange={value => setRouteActive(value)}>
                        {tabs.map(item => (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                        ))}
                    </TabBar>
                </div>
            </>
        )
    }
    return (<></>)
}
export default Menu