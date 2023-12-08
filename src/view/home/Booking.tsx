import "@/assets/css/booking.css"
import React, {useEffect, useState} from "react";
import {Image, NavBar, Radio, Space} from "antd-mobile";
import {useRouteStatus} from "@/common";
import {useSearchParams} from "react-router-dom";
import {getOrderDetailApi, OrderDetailInterface} from "@/api/business";

function Component() {
    const routeStatus = useRouteStatus();
    const [params, setParams] = useSearchParams();
    const [orderDetail, setOrderDetail] = useState<OrderDetailInterface>()
    useEffect(() => {
        const id = params.get("id")
        getOrderDetailApi(id).then(res => {
            setOrderDetail(res.data)
        })
    }, []);
    const [payType, setPayType] = useState<string | number>("0")
    return (<>
        <NavBar className="top" onBack={routeStatus.back}>订单支付</NavBar>
        <div className="pay_skeleton">
            <div className="tips">
                <span>订单编号：</span>
                <span>{orderDetail?.code}</span>
            </div>
            <div className="detail">
                <div className="thumb">
                    <img src={orderDetail?.room?.thumb_text} alt=""/>
                </div>
                <div className="right">
                    <p>{orderDetail?.room?.name}</p>
                    <div className="detail_tips">
                        <span>房型:新房特惠</span>
                        <span>面积:10.00㎡</span>
                        <span>宜住1人</span>
                    </div>
                    <div className="detail_price">
                        ￥{orderDetail?.price}
                    </div>
                </div>
            </div>
            <div className="pay_amount">
                <span>合计：</span>
                <span>￥{orderDetail?.price}</span>
            </div>
        </div>
        <div className="pay_payment">
            <div className="pay_amount">
                支付方式
            </div>
            <Radio.Group defaultValue={payType} onChange={setPayType}>
                <Space direction='vertical' style={{width: "100%", padding: "24px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Image src="@/assets/images/weixin.png" style={{width: "1em", height: "1em"}}/>
                        <Radio value='0' style={{
                            color: "#909399",
                            flexDirection: "row-reverse",
                            width: "100%",
                            justifyContent: "space-between",
                            '--icon-size': '18px',
                            '--font-size': '14px',
                            '--gap': '6px',
                        }}>微信支付</Radio>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Image src="@/assets/images/zhifubao.png" style={{width: "1em", height: "1em"}}/>
                        <Radio value='1' style={{
                            color: "#909399",
                            flexDirection: "row-reverse",
                            width: "100%",
                            justifyContent: "space-between",
                            '--icon-size': '18px',
                            '--font-size': '14px',
                            '--gap': '6px',
                        }}>支付宝支付</Radio>
                    </div>
                </Space>
            </Radio.Group>
        </div>
        <div className="pay_payment_footer">
            <button className="pay_button">立即支付</button>
        </div>
    </>)
}

export default Component