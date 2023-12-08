import "@/assets/css/index.css";
import {Link, useNavigate} from "react-router-dom";
import {Image, InfiniteScroll, PullToRefresh, Skeleton, Swiper} from "antd-mobile";
import {MouseEvent, useEffect, useState} from "react";
import {GET} from "@/utils/axios";
import {CouponInterface, homeInfoApi, homeInfoListApi, RoomInfoInterface} from "@/api/home";
import {buildUrl, priceFormat} from "@/utils/common";
import {useRouteStatus} from "@/common";
import {GlobalToast} from "@/utils/toast";

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
        <div onClick={() => navigate(buildUrl("/home/detail/", {id: item.id}))}>
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

// 轮播图
function Carsouel({rooms}: { rooms: Array<CouponInterface> }) {
    const navigate = useNavigate();
    return (
        <Swiper loop>

            {rooms.length > 0 ? rooms.map((e, index) => {
                return (<Swiper.Item key={e.id}>
                    <Image src={e.thumb_text} fit='fill' style={{
                        "width": "100%",
                        "height": "123px"
                    }} onClick={() => navigate(buildUrl("/home/coupon/", {id: e.id}))}/>
                </Swiper.Item>)
            }) : <Swiper.Item><Skeleton animated style={{
                "width": "100%",
                "height": "123px"
            }}/></Swiper.Item>}
        </Swiper>
    )
}

function Items({items}: { items: Array<RoomInfoInterface> }) {
    return (
        <>
            {items.map(e => <Item item={e} key={e.id}/>)}
        </>
    )
}

export default function () {
    const [carousel, setCarousel] = useState<Array<CouponInterface>>([])
    const [itemsData, setItemsData] = useState<Array<RoomInfoInterface>>([])
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState<string>("")
    useEffect(() => {
        homeInfoApi(filter).then(res => {
            setItemsData(res.data.list)
            setHasMore(itemsData.length < res.data.count)
            setCarousel(res.data.carousel)
        })
    }, [filter]);

    async function loadMore() {
        const result = await homeInfoListApi(itemsData.length)
        setItemsData([...itemsData, ...result.data.list])
        setHasMore(itemsData.length < result.data.count)
    }

    return (
        <>
            <div className="top">
                <div>首页</div>
            </div>
            <PullToRefresh
                onRefresh={async () => {
                    const result = await homeInfoListApi(0)
                    setItemsData(result.data.list)
                    setHasMore(itemsData.length < result.data.count)
                }}
            >
                <Carsouel rooms={carousel}/>
                <div className="hotel_search">
                    <input onChange={(event) => {
                        setFilter(event.target.value)
                    }} type="text" placeholder="请输入关键词搜索"/>
                    <div className="screen_icon" style={filter.length > 0 ? {filter: "sepia(1)"} : {}}>
                        <img src="@/assets/images/screen.png" alt=""/>
                    </div>
                </div>
                <div className="hotellist">
                    {itemsData.length > 0 ? <Items items={itemsData}/>
                        : hasMore ? (<><Skeleton animated style={{
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