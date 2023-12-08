import "@/assets/css/hotel-info.css";
import "@/assets/css/swiper-bundle.min.css";

import {Map} from 'react-bmapgl';
import {Image, NavBar, Swiper} from "antd-mobile";
import {SwiperItem} from "antd-mobile/es/components/swiper/swiper-item";
import {useRouteStatus} from "@/common";

function Component() {
    const routeStatus = useRouteStatus();
    return (<>
        <NavBar className="top" onBack={routeStatus.back}>门店详情</NavBar>
        <Swiper>
            <SwiperItem>
                <Image height="190px" src="@/assets/images/hotel1.jpg"/>
            </SwiperItem>
            <SwiperItem>
                <Image height="190px" src="@/assets/images/hotel2.jpg"/>
            </SwiperItem>
            <SwiperItem>
                <Image height="190px" src="@/assets/images/hotel3.jpg"/>
            </SwiperItem>
        </Swiper>
        <div className="hotelinfo">
            <div className="hotelinfo_title">
                创想第一门店
            </div>
            <div className="hotelinfo_address">
                广东省深圳市福田区华强北街道振兴路341号上步工业区
            </div>
            <Map className="map" enableScrollWheelZoom enableDragging={true}
                 center={{lng: 113.3265410, lat: 23.1057070}} zoom="11"/>
            <div className="hotelinfo_desc">
                <div className="desc_title">简介</div>
                <div>这里是极速创想第一门店</div>
            </div>
            <div className="hotelinfo_desc">
                <div className="desc_title">详情</div>
                <div>这里是极速创想第一门店，欢迎你的预订入住</div>
            </div>
        </div>

    </>)
}

export default Component