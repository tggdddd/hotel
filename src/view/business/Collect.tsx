import "@/assets/css/index.css";
import "@/assets/css/swiper-bundle.min.css";
import {Link, useNavigate} from "react-router-dom";
import {InfiniteScroll, NavBar, PullToRefresh, Skeleton} from "antd-mobile";
import React, {MouseEvent, useEffect, useState} from "react";
import {GET} from "@/utils/axios";
import {buildUrl, priceFormat} from "@/utils/common";
import {useRouteStatus} from "@/common";
import {GlobalToast} from "@/utils/toast";
import {collectListApi} from "@/api/business";
import {RoomInfoInterface} from "@/api/home";

// 酒店卡片
function Item({item}: { item: RoomInfoInterface }) {
    const routeStatus = useRouteStatus();

    function toLove(event: MouseEvent<HTMLImageElement>) {
        event.preventDefault()
        event.stopPropagation()
        if (!routeStatus.isLogin) {
            GlobalToast.error("请先登录!");
            return
        }
        GET("/index/love/", {id: item.id}, {}, "加载中").then(res => {
            // GlobalToast.success(res.msg)
            setLove(res.data)
        })
    }

    const navigate = useNavigate();
    const [love, setLove] = useState(item.collect)
    return (<div className="item">
        <div onClick={() => navigate(buildUrl(`/home/detail/`, {id: item.id}))}>
            <div className="collect">
                <img onClick={toLove} src="@/assets/images/heart.png"
                     style={{"filter": love != null && love !== 0 ? 'none' : "sepia(1)"}} alt=""/>
            </div>
            <div className="type_name">新房特惠</div>
            <div className="images">
                <div className="swipers">
                    <img src={item.thumb_text} alt=""/>
                </div>
                <div className="title">{item.name}</div>
            </div>
            <div>
                <div className="item_top">
                    {(item.tags || []).map((e, index) => <span key={index}>{e}</span>)}
                </div>
                <div className="item_bot">
                    <div className="font">
                        <span className="price">￥{priceFormat(item.price)}/晚</span>
                        <span className="market_price">￥{priceFormat(item.price)}/晚</span>
                    </div>
                    <Link to={buildUrl(`/home/detail/`, {id: item.id})}>
                        <span className="btn">立即预定</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>)
}

function Items({items}: { items: Array<RoomInfoInterface> }) {
    return (
        <>
            {items.map(e => <Item item={e} key={e.id}/>)}
        </>
    )
}

export default function () {
    const routeStatus = useRouteStatus();
    let [page, setPage] = useState(1)
    let [list, setList] = useState<Array<RoomInfoInterface>>([])
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
        const result = await collectListApi(page)
        if (result.data) {
            setHasMore(result.data.hasMore)
            setList(data => [...data, ...result.data.list])
        }

    }

    return (
        <>
            <NavBar onBack={routeStatus.back} className="top">首页</NavBar>
            <PullToRefresh onRefresh={() => onRefresh()}>
                <div className="hotellist">
                    {list.length > 0 ? <Items items={list}/>
                        : hasMore ? (<><Skeleton animated style={{
                            "width": "100%",
                            "height": "213px"
                        }}/><Skeleton animated style={{
                            "width": "100%",
                            "height": "213px"
                        }}/><Skeleton animated style={{
                            "width": "100%",
                            "height": "213px"
                        }}/><Skeleton animated style={{
                            "width": "100%",
                            "height": "213px"
                        }}/><Skeleton animated style={{
                            "width": "100%",
                            "height": "213px"
                        }}/></>) : ""}

                </div>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
            </PullToRefresh>
        </>
    )

}