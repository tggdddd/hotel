import "@/assets/css/booking.css"
import React from "react";
import {NavBar} from "antd-mobile";
import {useRouteStatus} from "@/common";

function Component() {
    const routeStatus = useRouteStatus();
    return (<>
        <NavBar className="top" onBack={routeStatus.back}>订单支付</NavBar>
        <div className="pay_skeleton">
            <div className="tips">
                <span>订单编号：</span>
                <span>20230817061723000000015861</span>
            </div>
            <div className="detail">
                <div className="thumb">
                    <img src="@/assets/images/hotel1.jpg" alt=""/>
                </div>
                <div className="right">
                    <p>暑假特价房</p>
                    <div className="detail_tips">
                        <span>房型:新房特惠</span>
                        <span>面积:10.00㎡</span>
                        <span>宜住1人</span>
                    </div>
                    <div className="detail_price">
                        ￥60.00
                    </div>
                </div>
            </div>
            <div className="pay_amount">
                <span>合计：</span>
                <span>￥60.00</span>
            </div>
        </div>
        <div className="pay_payment">
            <div className="pay_amount">
                支付方式
            </div>
            <div>
                <img src="@/assets/images/pay.png" alt=""/>
            </div>
        </div>
        <div className="pay_payment_footer">
            <button className="pay_button">立即支付</button>
        </div>
    </>)
}

export default Component