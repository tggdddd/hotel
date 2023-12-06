import {NavBar, Tabs} from "antd-mobile";
import {useRouteStatus} from "@/common";
import "@/assets/css/order.css";

function Tab({title}: any) {
    return (<Tabs.Tab title='水果' key='fruits'>
        菠萝
    </Tabs.Tab>)
}

function Component() {
    const routeStatus = useRouteStatus();
    const list = [
        {
            title: "水果1"
        }, {
            title: "水果2"
        },
        {
            title: "水果3"
        }
    ]
    return (<>
        <NavBar className="top" onBack={routeStatus.back}>房间订单</NavBar>
        <Tabs className="tabs">
            {
                list.map((e, index) => <Tab key={index} title={e.title}/>)
            }
            <Tab/>
        </Tabs>
    </>)
}

export default Component