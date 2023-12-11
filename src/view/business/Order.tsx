import {Button, InfiniteScroll, NavBar, PullToRefresh, Space, Tabs} from "antd-mobile";
import {useRouteStatus} from "@/common";
import '@/assets/css/order.css'
import {cancelOrderApi, getOrderListApi, OrderDetailInterface} from "@/api/business";
import React, {useState} from "react";
import {dateFormat, diffDay} from "@/utils/common";


function Component() {
    const routeStatus = useRouteStatus();
    let [page, setPage] = useState(1)
    let [list, setList] = useState<Array<OrderDetailInterface>>([])
    let [hasMore, setHasMore] = useState(true)
    const [status, setStatus] = useState<number | null>(null)
    // 下拉刷新
    const onRefresh = async () => {
        setPage(1)
        setHasMore(true)
        setList([])
        const result = await getOrderListApi(page, status)
        if (result.data) {
            setHasMore(result.data.hasMore)
            setList(data => [...data, ...result.data.list])
        }
    }

    //上拉加载
    async function loadMore() {
        const result = await getOrderListApi(page, status)
        if (result.data) {
            setHasMore(result.data.hasMore)
            setList(data => [...data, ...result.data.list])
        }
    }

    function changeStaus(value: string) {
        setStatus(Number.parseInt(value))
        onRefresh()
    }

    const tabList = [
        {title: "全部", key: ""},
        {title: "已支付", key: "1"},
        {title: "已入住", key: "2"},
        {title: "已退房", key: "3"},
        {title: "已评价", key: "4"},
        {title: "申请退款", key: "-1"}
    ]


    function cancelOrder(id: string) {
        cancelOrderApi(id);
    }

    return (<>
        <NavBar className="top" onBack={routeStatus.back}>房间订单</NavBar>
        <Tabs className="tabs" onChange={changeStaus}>
            {
                tabList.map((e, index) => <Tabs.Tab key={index} title={e.title}>
                </Tabs.Tab>)
            }
        </Tabs>
        <PullToRefresh onRefresh={() => onRefresh()}>
            <div className="order_list">
                {list.map((item, key) =>
                    <div className="item" key={key}>
                        <div className="item_top">
                            <p>{item?.room?.name}</p>
                            <div className="top_tag">{item?.status_text}</div>
                        </div>
                        <div className="house">
                            <div className="item_swipers">
                                <img src="@/assets/images/hotel1.jpg" alt=""/>
                            </div>
                            <div className="item_times">
                                <div>
                                    <div>{dateFormat(item?.starttime, "MM月dd日")}</div>
                                    <div>{dateFormat(item?.starttime, "week hh:mm")}</div>
                                </div>
                                <div>
                                    <div>共{diffDay(item?.starttime, item?.endtime)}晚</div>
                                    <div className="item_right">
                                        <img src="@/assets/images/right1.png" alt=""/>
                                    </div>
                                </div>
                                <div>
                                    <div>{dateFormat(item?.endtime, "MM月dd日")}</div>
                                    <div>{dateFormat(item?.endtime, "week hh:mm")}</div>
                                </div>
                                <div>
                                    <div className="item_pay">订单总价</div>
                                    <div className="item_price">￥{item.price}</div>
                                </div>
                            </div>
                        </div>
                        <div className="item_bar">
                            <Space>
                                {(item.status == 0 || item.status == 1) &&
                                    <Button size="small" onClick={() => cancelOrder(item.id)}
                                            color="danger">取消订单</Button>}
                                {item.status == 3 && <Button size="small" color="success">评价</Button>}
                                <Button size="small" color="primary"
                                        onClick={() => routeStatus.navigate(`/orderInfo?orderid=${item.id}`)}>订单详情</Button>
                            </Space>
                        </div>

                    </div>
                )}
            </div>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
        </PullToRefresh>
    </>)
}

export default Component