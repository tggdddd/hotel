import "@/assets/css/index.css";
import "@/assets/css/swiper-bundle.min.css";
import {Button, InfiniteScroll, NavBar, PullToRefresh} from "antd-mobile";
import React, {useEffect, useState} from "react";
import {CouponReceiveInterface} from "@/api/home";
import {useRouteStatus} from "@/common";
import {collectPickListApi} from "@/api/business";

export default function () {
    const routeStatus = useRouteStatus();
    let [page, setPage] = useState(1)
    let [list, setList] = useState<Array<CouponReceiveInterface>>([])
    let [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        loadMore().then()
    }, []);

    // 下拉刷新
    const onRefresh = async () => {
        setPage(1)
        setHasMore(true)
        setList([])
        await loadMore()
    }

    //上拉加载
    async function loadMore() {
        const result = await collectPickListApi(page)
        if (result.data) {
            setHasMore(result.data.hasMore)
            setList(data => [...data, ...result.data.list])
        }

    }

    return (
        <>
            <NavBar onBack={routeStatus.back} className="top">首页</NavBar>
            <PullToRefresh onRefresh={() => onRefresh()}>
                {list.map(item => (<>
                    <div className="coupon_detail">
                        <div className="coupon_info">
                            <div className="left">
                                <div className="left_top">
                                    <div>
                                        <span>{item.coupon.rate * 10}</span>折
                                    </div>
                                    <div className="top_info">
                                        <div>优惠券</div>
                                        <div>COUPON</div>
                                    </div>
                                </div>
                            </div>
                            <div className="receive">
                                {item.coupon.status == 0 ?
                                    <Button size="small" color='primary'
                                            onClick={() => routeStatus.navigate("/home")}>{item.coupon.status_text}</Button> :
                                    <Button size="small" disabled color='primary'>{item.coupon.status_text}</Button>
                                }
                            </div>
                        </div>
                    </div>
                </>))}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
            </PullToRefresh>
        </>
    )

}