import {Button, Card, Image, InfiniteScroll, NavBar, PullToRefresh, Space, Tabs} from "antd-mobile";
import {useRouteStatus} from "@/common";
import "@/assets/css/order.css";
import {getOrderListApi, OrderDetailInterface} from "@/api/business";
import React, {useState} from "react";
import {AntOutline} from "antd-mobile-icons";
import {GlobalToast} from "@/utils/toast";

function Tab({title}: any) {
    return (<Tabs.Tab title='水果' key='fruits'>
        菠萝
    </Tabs.Tab>)
}

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
        {
            title: "全部订单",
            key: ""
        },
        {
            title: "已支付",
            key: "1"
        },
        {
            title: "已入住",
            key: "2"
        },
        {
            title: "已退房",
            key: "3"
        },
        {
            title: "已评价",
            key: "4"
        },
        {
            title: "申请退款",
            key: "-1"
        },
        {
            title: "审核通过",
            key: "-2"
        },
        {
            title: "审核不通过",
            key: "-3"
        }
    ]

    function onBodyClick() {

    }

    function onHeaderClick() {

    }

    function orderDetail(id: string) {
        GlobalToast.show("不支持")
    }

    function orderComment(id: string) {
        GlobalToast.show("不支持")

    }

    function orderRefund(id: string) {
        GlobalToast.show("不支持")

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
            {list.map(item => (<>
                <Card
                    title={
                        <div style={{fontWeight: 'normal'}}>
                            <AntOutline style={{marginRight: '4px', color: '#1677ff'}}/>
                            {item.room.name}
                        </div>
                    }
                    onBodyClick={onBodyClick}
                    onHeaderClick={onHeaderClick}
                    style={{borderRadius: '4px', marginTop: '4px', boxShadow: "1px 1px 2px #77777733"}}
                >
                    <div style={{}}>
                        <div style={{display: "flex", maxHeight: "80px"}}>
                            <div style={{flex: 3, paddingRight: "12px"}}>
                                <Image lazy style={{borderRadius: "4px"}} fit="contain" src={item.room.thumb_text}/>
                            </div>
                            <div style={{flex: 5}}>
                                <div>人员：{item.guests.map(e => e.nickname).join(",")}</div>
                                <div>开始：{item.starttime_text}</div>
                                <div>结束：{item.endtime_text}</div>
                            </div>
                        </div>
                        {/*<div>{item.createtime_text}</div>*/}
                    </div>
                    <div style={{
                        paddingTop: "11px",
                        borderTop: "1px solid #e5e5e5",
                        display: "flex",
                        justifyContent: "flex-end"
                    }} onClick={e => e.stopPropagation()}>
                        <Space>
                            <Button
                                color='primary'
                                size="mini"
                                onClick={() => {
                                    orderDetail(item.id)
                                }}
                            >
                                详情
                            </Button>
                            <Button
                                color='primary'
                                size="mini"
                                onClick={() => {
                                    orderComment(item.id)
                                }}
                            >
                                评价
                            </Button>
                            <Button
                                color='primary'
                                size="mini"
                                onClick={() => {
                                    orderRefund(item.id)
                                }}
                            >
                                退款
                            </Button>
                        </Space>
                    </div>
                </Card>
            </>))}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
        </PullToRefresh>
    </>)
}

export default Component