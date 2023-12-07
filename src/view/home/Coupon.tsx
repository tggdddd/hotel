import React from 'react';

import '@/assets/css/coupon-info.css'
import {useRouteStatus} from "@/common";
import {couponInfoApi, CouponInterface, couponPickApi, CouponReceiveInterface} from "@/api/home";
import {GlobalToast} from "@/utils/toast";
import {AutoCenter, Button, Image, NavBar, NoticeBar, Skeleton, Swiper} from 'antd-mobile';
import {useSearchParams} from "react-router-dom";


function Component() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id") || ""
    const routeStatus = useRouteStatus();
    let [coupon, SetCoupon] = React.useState<CouponInterface>({
        createtime: 0,
        createtime_text: "",
        endtime: 0,
        endtime_text: "",
        id: "",
        rate: 0,
        status: 0,
        status_text: "",
        thumb: "",
        thumb_text: "",
        title: "",
        total: 0,
        receive: false
    });
    let [receive, SetReceive] = React.useState<Array<CouponReceiveInterface>>([])

    React.useEffect(() => {
        CouponData()
    }, [])

    //请求优惠券详情
    const CouponData = async () => {
        couponInfoApi(id)
            .then(result => {
                SetCoupon(result.data.coupon)
                SetReceive(result.data.receive)
            })

    }
    //领取优惠券
    const CounponReceive = async () => {
        if (!routeStatus.isLogin) {
            await GlobalToast.error('请先登录')
            return false
        }
        //发请求
        var result = await couponPickApi(id)
        await CouponData()
        await GlobalToast.success(result.msg)
    }
    console.log("items", receive)
    const Items = receive.map((item: any, key) =>
        <Swiper.Item key={key}>
            <NoticeBar
                style={{'border': '0px'}}
                content={`用户：${item.business.nickname ? item.business.nickname : '匿名用户'} 在 ${item.createtime_text} 领取了优惠券`}
                color='info'
            />
        </Swiper.Item>
    )

    return (
        <>
            <NavBar
                className="top"
                back='返回'
                onBack={routeStatus.back}
            >{coupon.title}</NavBar>
            <AutoCenter>
                {coupon && coupon.thumb_text ?
                    <Image src={coupon.thumb_text} style={{width: "100vw", height: "123px"}} fit="contain"/> :
                    <Skeleton style={{width: "100vw", height: "123px"}} animated/>
                }
            </AutoCenter>

            <Swiper
                autoplay={true}
                autoplayInterval={1000}
                loop={true}
                indicator={() => false}
                direction='vertical'
                style={{'--height': '40px', 'border': '0px'}}
            >
                {Items}
            </Swiper>

            <div className="coupon_detail">
                <div className="coupon_info">
                    <div className="left">
                        <div className="left_top">
                            <div>
                                <span>{coupon.rate * 10}</span>折
                            </div>
                            <div className="top_info">
                                <div>优惠券</div>
                                <div>COUPON</div>
                            </div>
                        </div>
                    </div>
                    <div className="receive">
                        {
                            coupon.receive ?
                                <Button size="small" disabled color='primary'>您已领取</Button> :
                                <Button onClick={CounponReceive} size="small" color='primary'>领取</Button>
                        }
                    </div>
                </div>
                <div className="coupon_prompt">
                    <div className="prompt_title">温馨提示：</div>
                    <div>
                        <span>•</span>
                        领取后 {coupon.createtime_text} 至 {coupon.endtime_text} 有效
                    </div>
                    <div><span>•</span>仅限量{coupon.total}张，赶快领取！</div>
                </div>
            </div>
        </>
    )
}

export default Component