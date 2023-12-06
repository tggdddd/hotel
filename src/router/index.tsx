import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from "@/App";
import {buildKey, StateEnum} from "@/state/stateEnum";
import {setState} from "@/state/state";
import Error from "@/components/Error";

const files = require.context("./", true, /.*tsx?$/)
const ignores = ["index"]
const routes: Array<any> = []
files.keys().map(async (path: string) => {
    let temp = path.replace(/.*?\/?(\w+)\.tsx/, "$1");
    if (!ignores.includes(temp)) {
        let module = files(path);
        routes.push(...module.default)
    }
})
// 配置页面是否显示底部菜单
routes.forEach(value => {
    const key = buildKey(StateEnum.SHOW_MENU, value.path);
    setState(key, value.showMenu)
})

// 配置页面是否需要登录
routes.forEach(value => {
    const key = buildKey(StateEnum.SHOULD_LOGIN, value.path);
    setState(key, value.auth)
})

function RouteViewProvider() {
    const routerList = createBrowserRouter([
        {
            path: '/',
            element: (
                <App/>
            ),
            errorElement: <Error/>,
            children: routes
        }
    ], {
        basename: "/",
    })

    return (
        <RouterProvider router={routerList}/>
    )
}

export default RouteViewProvider