import React from 'react';

import '@/assets/css/order_info.css'
import {useSearchParams} from "react-router-dom";
import {useRouteStatus} from "@/common";
import {getOrderInfoApi, OrderDetailInterface} from "@/api/business";
import {NavBar} from "antd-mobile";
import {buildUrl, dateFormat, diffDay} from "@/utils/common";

const Component = () => {
    //接收跳转参数
    const routeStatus = useRouteStatus();
    const [searchParams] = useSearchParams()
    let [orderId, SetOrderId] = React.useState(searchParams.get('orderid') || "0")
    let [order, SetOrder] = React.useState<OrderDetailInterface>({
        busid: "",
        code: "",
        comment: "",
        coupon: undefined,
        coupon_receive_id: "",
        createtime: 0,
        createtime_text: "",
        endtime: 0,
        endtime_text: "",
        guests: [],
        id: "",
        orgin_price: 0,
        price: 0,
        room: undefined,
        roomid: "",
        starttime: 0,
        starttime_text: "",
        status: 0,
        status_text: ""
    })

    React.useEffect(() => {
        getOrderData()
    }, [])

    //请求详情
    const getOrderData = async () => {
        const result = await getOrderInfoApi(orderId)
        SetOrder(result.data)
    }


    return (
        <>
            <NavBar
                back='返回'
                className="top"
                onBack={routeStatus.back}
            >订单详情</NavBar>

            <div className="order_info">
                <div className="info_title">
                    <h3>待评价</h3>
                    <p>感谢您的光临，请给我们打个分吧</p>
                    <button className="info_rate"
                            onClick={() => routeStatus.navigate(buildUrl("/toComment", {id: orderId}))}>立即评价
                    </button>
                </div>

                <div className="info_content">
                    <div className="content_title">订单信息：</div>
                    <div className="content_item">
                        <p>订单金额</p>
                        <div className="content_price">￥{order?.price}</div>
                    </div>
                    <div className="content_item">
                        <p>开始时间</p>
                        <div>{order?.starttime_text}({dateFormat(order?.starttime, "week")})</div>
                    </div>
                    <div className="content_item">
                        <p>结束时间</p>
                        <div>{order?.endtime_text}({dateFormat(order?.endtime, "week")})</div>
                    </div>
                    <div className="content_item">
                        <p style={{minWidth: "4em", marginRight: "12px"}}>统计时间</p>
                        <div>
                            {/*{order?.starttime_text}({dateFormat(order?.starttime, "week")})<br/> */}
                            {/*{order?.endtime_text}({dateFormat(order?.endtime, "week")})<br/>*/}
                            共 {diffDay(order?.starttime, order?.endtime)} 晚
                        </div>
                    </div>
                    {order?.guests?.map(guest => {
                        return (<div key={guest.id}>
                            <div className="content_item">
                                <p>入住人</p>
                                <div>{guest.nickname}</div>
                            </div>
                            <div className="content_item">
                                <p>联系电话</p>
                                <div>{guest.mobile}</div>
                            </div>
                        </div>)
                    })}
                </div>
                <div className="info_footer">
                    <div className="content_title">房屋信息：</div>
                    <div className="detail">
                        <div className="thumb">
                            <img src={order?.room?.thumb_text} alt=""/>
                        </div>
                        <div className="right">
                            <p>{order?.room?.name}</p>
                            <div className="tips">
                                {(order?.room?.tags || []).map((e, index) => <span style={{
                                    marginRight: "4px",
                                    display: "block"
                                }} key={index}>{e}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Component