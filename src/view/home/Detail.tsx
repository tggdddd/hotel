import "@/assets/css/detail.css";
import "@/assets/css/swiper-bundle.min.css";
import React, {ComponentProps} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {NavBar} from "antd-mobile";


export default function (props: ComponentProps<any>) {
    const navigate = useNavigate();
    return (
        <>
            <NavBar className="top" onBack={() => navigate(-1)}>详情</NavBar>
            <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src="@/assets/images/hotel1.jpg" alt=""/></div>
                    <div className="swiper-slide"><img src="@/assets/images/hotel2.jpg" alt=""/></div>
                    <div className="swiper-slide"><img src="@/assets/images/hotel3.jpg" alt=""/></div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
            <div className="info_tabs">
                <li>
                    <a href="#intro">介绍</a>
                </li>
                <li>
                    <a href="#comment">评价</a>
                </li>
                <li>
                    <a href="#facility">设施</a>
                </li>
            </div>
            <div className="detail_top">
                <div id="intro" className="intro">
                    <div className="title">暑假特价房</div>
                    <div className="betwee">
                        <div className="left">
                            <span>推广优惠</span>
                            <span>月租惠选</span>
                            <span>满减优惠</span>
                            <span>节假日优惠</span>
                        </div>
                        <div className="right">
                            分享
                        </div>
                    </div>
                    <div className="title">简介简介</div>
                </div>
                <div className="preferential">
                    <div className="title">优惠</div>
                    <div className="coupon-list">
                        <div className="left">
                            <div className="item">
                                <div className="item_l">
                                    8折
                                </div>
                                <div className="item_r">
                                    满100 打8折
                                </div>
                            </div>
                            <div className="item">
                                <div className="item_l">
                                    8折
                                </div>
                                <div className="item_r">
                                    满100 打8折
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            更多
                        </div>
                    </div>
                </div>
                <div id="comment" className="comment">
                    <div className="title">评价</div>
                </div>
                <div id="facility" className="facility">
                    <div className="title">设施服务</div>
                    <div className="plan">
                        <div className="item">
                            <img src="@/assets/images/wrong.png" alt=""/>
                            <span>WIFI</span>
                        </div>
                        <div className="item">
                            <img src="@/assets/images/answer.png" alt=""/>
                            <span>吹风机</span>
                        </div>
                        <div className="item">
                            <img src="@/assets/images/wrong.png" alt=""/>
                            <span>空调</span>
                        </div>
                        <div className="item">
                            <img src="@/assets/images/answer.png" alt=""/>
                            <span>有浴缸</span>
                        </div>
                    </div>
                </div>
                <div className="notesin">
                    <div className="title">预订须知</div>
                    <div className="item">
                        <span className="tips">预订房型：</span>
                        <span>新房特惠</span>
                    </div>
                    <div className="item">
                        <span className="tips">入离时间：</span>
                        <span>15:00 后入住，12:00 前退房</span>
                    </div>
                    <div className="item">
                        <span className="tips">预订时长：</span>
                        <span>随时可预订,最少预订1天, 最多预订天数不限</span>
                    </div>
                </div>
            </div>
            <div className="foot-bar">
                <div className="price">
                    ￥60
                </div>
                <div className="btn">
                    <NavLink to={"/home/confirm/" + props.id}>立即预定</NavLink>
                </div>
            </div>
        </>
    )
}