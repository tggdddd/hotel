import "@/assets/css/user.css"
import {delCookie} from "@/state/state";
import {Link, useNavigate} from "react-router-dom";
import {useRouteStatus} from "@/common";

export default function () {
    const navigate = useNavigate();
    const routeStatus = useRouteStatus();

    function loginOut() {
        delCookie("user")
        delCookie("token")
        navigate("/login")
    }

    return (
        <>
            <div className="top">
                <div>个人中心</div>
            </div>
            <div className="header">
                <div className="userinfo">
                    <div className="avatar">
                        <img src={routeStatus.user.avatar_text} alt=""/>
                    </div>
                    <div className="nickname">{routeStatus.user.nickname || routeStatus.user.mobile}</div>
                    <div className="nickname content">这家伙很懒，什么也没写！</div>
                </div>
                <div className="corrugated">
                    <div className="wave-top wave-item"></div>
                    <div className="wave-middle wave-item"></div>
                    <div className="wave-bottom wave-item"></div>
                </div>
            </div>
            <div className="menu-center">
                <div className="item">
                    <div>1</div>
                    <div className="text">支付</div>
                </div>
                <div className="item">
                    <div>10</div>
                    <div className="text">待支付</div>
                </div>
                <div className="item">
                    <div>7</div>
                    <div className="text">待评论</div>
                </div>
            </div>
            <div className="menu-cell">
                <div className="item">
                    <Link to="/order">
                        <div className="title">房间订单</div>
                        <div className="icon">
                            <img src="@/assets/images/right.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/collect">
                        <div className="title">我的收藏</div>
                        <div className="icon">
                            <img src="@/assets/images/right.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/profile">
                        <div className="title">个人资料</div>
                        <div className="icon">
                            <img src="@/assets/images/right.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/business/coupon">
                        <div className="title">我的优惠券</div>
                        <div className="icon">
                            <img src="@/assets/images/right.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/info">
                        <div className="title">关于我们</div>
                        <div className="icon">
                            <img src="@/assets/images/right.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="#" onClick={loginOut}>
                        <div className="title">退出登陆</div>
                        <div className="icon">
                            <img src="@/assets/images/right.png" alt=""/>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}