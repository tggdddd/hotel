import "@/assets/css/detail.css";
import "@/assets/css/swiper-bundle.min.css";
import React, {ComponentProps, useEffect, useState} from "react";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {Image, NavBar, Swiper} from "antd-mobile";
import {buildUrl} from "@/utils/common";
import {getHotelDetailApi, homeDetailInterface} from "@/api/home";


export default function (props: ComponentProps<any>) {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id") || "";
    const navigate = useNavigate();
    const [detail, setDetail] = useState<homeDetailInterface>()
    useEffect(() => {
        getHotelDetailApi(id).then(res => {
            setDetail(res.data)
        })
    }, []);

    function arrayAdapt(data: string | Array<any>) {
        console.log("arrayAdapt", data)
        if (data == null) {
            return []
        }
        if (Array.isArray(data)) {
            return data
        }
        return [data]
    }
    return (
        <>
            {detail == null ? "" : <>
            <NavBar className="top" onBack={() => navigate(-1)}>详情</NavBar>
                <Swiper loop>
                    {arrayAdapt(detail.detail.thumb_text).map((src, index) => {
                        return (<Swiper.Item key={index}>
                            <Image src={src} fit='fill' style={{
                                "width": "100%",
                                "height": "123px"
                            }}/>
                        </Swiper.Item>)
                    })}
                </Swiper>
                {/*<div className="info_tabs">*/}
                {/*    <li>*/}
                {/*        <a href="#intro">介绍</a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="#comment">评价</a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="#facility">设施</a>*/}
                {/*    </li>*/}
                {/*</div>*/}
            <div className="detail_top">
                <div id="intro" className="intro">
                    <div className="title">{detail.detail.name}</div>
                    <div className="betwee">
                        <div className="left">
                            {(detail.detail.tags || []).map((e, index) => <span key={index}>{e}</span>)}
                        </div>
                        <div className="right">
                            分享
                        </div>
                    </div>
                    <div className="title">{detail.detail.content}</div>
                </div>
                {/*<div className="preferential">*/}
                {/*    <div className="title">优惠</div>*/}
                {/*    <div className="coupon-list">*/}
                {/*        <div className="left">*/}
                {/*            <div className="item">*/}
                {/*                <div className="item_l">*/}
                {/*                    8折*/}
                {/*                </div>*/}
                {/*                <div className="item_r">*/}
                {/*                    满100 打8折*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="item">*/}
                {/*                <div className="item_l">*/}
                {/*                    8折*/}
                {/*                </div>*/}
                {/*                <div className="item_r">*/}
                {/*                    满100 打8折*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="right">*/}
                {/*            更多*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div id="comment" className="comment">
                    <div className="title">评价</div>
                </div>
                {/*<div id="facility" className="facility">*/}
                {/*    <div className="title">设施服务</div>*/}
                {/*    <div className="plan">*/}
                {/*        <div className="item">*/}
                {/*            <img src="@/assets/images/wrong.png" alt=""/>*/}
                {/*            <span>WIFI</span>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src="@/assets/images/answer.png" alt=""/>*/}
                {/*            <span>吹风机</span>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src="@/assets/images/wrong.png" alt=""/>*/}
                {/*            <span>空调</span>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src="@/assets/images/answer.png" alt=""/>*/}
                {/*            <span>有浴缸</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="notesin">
                    <div className="title">预订须知</div>
                    <div className="item">
                        <span className="tips">预订房型：</span>
                        <span>{detail.detail.name}</span>
                    </div>
                    <div className="item">
                        <span className="tips">入离时间：</span>
                        <span>15:00 后入住，12:00 前退房</span>
                    </div>
                    <div className="item">
                        <span className="tips">房间数量：</span>
                        <span>{detail.detail.total}</span>
                    </div>
                </div>
            </div>
            <div className="foot-bar">
                <div className="price">
                    ￥60
                </div>
                <div className="btn">
                    <NavLink to={buildUrl("/home/confirm/", {id: props.id})}>立即预定</NavLink>
                </div>
            </div>
            </>}</>
    )
}