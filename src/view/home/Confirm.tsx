import "@/assets/css/confirm.css"
import {useRouteStatus} from "@/common";
import React, {useEffect, useState} from "react";
import {PickerDate} from "antd-mobile/es/components/date-picker/util";
import {Button, CalendarPicker, NavBar, Picker, Popup, Space} from "antd-mobile";
import {useSearchParams} from "react-router-dom";
import Guest from "@/view/home/Guest";
import {GuestInterface, submitOrderApi} from "@/api/business";
import {priceFormat} from "@/utils/common";
import {CouponReceiveInterface, getHotelDetailApi, homeDetailInterface} from "@/api/home";
import {GlobalToast} from "@/utils/toast";


function Confirm() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id") || "";
    const [detail, setDetail] = useState<homeDetailInterface>()
    useEffect(() => {
        getHotelDetailApi(id).then(res => {
            setDetail(res.data)
        })
    }, []);

    const routeStatus = useRouteStatus();
    // 时间选择器
    const [enterVisible, setEnterVisible] = useState(false)
    const [enterDate, setEnterDate] = useState<PickerDate>(new Date())
    const [leaveVisible, setLeaveVisible] = useState(false)
    const [leaveDate, setLeaveDate] = useState<PickerDate>(new Date(new Date().getTime() + 86400000))
    const [guestVisible, setGuestVisible] = useState(false)
    const [guests, setGuests] = useState<Array<GuestInterface>>([])
    const [couponSelect, setCouponSelect] = useState<CouponReceiveInterface>()
    const [couponSelectShow, setCouponSelectShow] = useState<boolean>(false)
    const [timeDuration, setTimeDuration] = useState("")
    const [timeDurationShow, setTimeDurationShow] = useState(false)
    //选择日期
    const DateChange = (val: any) => {
        setTimeDurationShow(false)
        var datestr = `${new Date(val[0]).toLocaleDateString()} - ${new Date(val[1]).toLocaleDateString()}`
        setTimeDuration(datestr)
        setEnterDate(val[0])
        setLeaveDate(val[1])
    }
    //选择优惠券
    function CounponConfirm(value: any) {
        setCouponSelectShow(false)
        let index = detail?.coupon.findIndex(e => e.id == value)
        if (index != null) {
            setCouponSelect(detail?.coupon[index])
        }
    }

    function calcDay() {
        let duration = leaveDate.getTime() - enterDate.getTime()
        return Math.round(duration / 86400000)
    }

    function calcPrice() {
        return priceFormat(calcDay() * (detail?.detail.price || 0))
    }

    function totalPrice() {
        return priceFormat(Number.parseFloat(calcPrice()) * (couponSelect?.coupon.rate || 1))
    }

    async function submitOrder() {
        if (guests.length === 0) {
            GlobalToast.error("请添加住客信息");
            return
        }
        const result = await submitOrderApi({
            id: id,
            guest: guests.map(e => e.id),
            couponReceiveId: couponSelect?.id,
            enterTime: enterDate.getTime() / 1000,
            leaveTime: leaveDate.getTime() / 1000
        })
        await GlobalToast.success(result.msg);
        routeStatus.navigate("/business");
        // routeStatus.navigate(buildUrl("/home/booking/", {id: result.data}))
    }
    return (
        <>
            <NavBar onBack={routeStatus.back} className="top">提交订单</NavBar>
            <div className="skeleton">
                <div className="detail">
                    <div className="thumb">
                        <img src="@/assets/images/hotel1.jpg" alt=""/>
                    </div>
                    <div className="right">
                        <p>{detail?.detail.name}</p>
                        <div className="tips">
                            <span>新房特惠</span>
                            <span>10.00㎡</span>
                            <span>宜住1人</span>
                        </div>
                    </div>
                </div>
                <div className="skeleton_rect">
                    <form>

                        <div className="item">
                            <label>入住日期</label>
                            <div onClick={() => setTimeDurationShow(true)} className="adm-input item_right">
                                <div
                                    className={"adm-input-element " + (timeDuration.length === 0 ? "placeholder" : "no-placeholder")}
                                    style={{
                                        textAlign: "center",
                                        width: "100%"
                                    }}>{timeDuration || "请选择入住日期"}</div>
                            </div>
                            <CalendarPicker
                                visible={timeDurationShow}
                                min={new Date()}
                                selectionMode='range'
                                onClose={() => setTimeDurationShow(false)}
                                onMaskClick={() => setTimeDurationShow(false)}
                                onConfirm={DateChange}
                            />
                        </div>


                        {/*<div className="item" onClick={() => {*/}
                        {/*    setEnterVisible(true)*/}
                        {/*}}>*/}
                        {/*    <label>入住日期</label>*/}
                        {/*    <DatePicker visible={enterVisible}*/}
                        {/*                onClose={() => {*/}
                        {/*                    setEnterVisible(false)*/}
                        {/*                }}*/}
                        {/*                onConfirm={(value) => {*/}
                        {/*                    setEnterDate(value)*/}
                        {/*                    if (leaveDate.getTime() < value.getTime() + 86400000) {*/}
                        {/*                        setLeaveDate(new Date(value.getTime() + 86400000))*/}
                        {/*                    }*/}
                        {/*                }}*/}
                        {/*                defaultValue={enterDate}/>*/}
                        {/*    <label>{enterDate.toLocaleDateString()}</label>*/}
                        {/*</div>*/}
                        {/*<div className="item" onClick={() => {*/}
                        {/*    setLeaveVisible(true)*/}
                        {/*}}>*/}
                        {/*    <label>离店日期</label>*/}
                        {/*    <DatePicker min={enterDate}*/}
                        {/*                visible={leaveVisible}*/}
                        {/*                onClose={() => {*/}
                        {/*                    setLeaveVisible(false)*/}
                        {/*                }}*/}
                        {/*                onConfirm={(value) => {*/}
                        {/*                    setLeaveDate(value)*/}
                        {/*                }}*/}
                        {/*                defaultValue={leaveDate}/>*/}
                        {/*    <label>{leaveDate.toLocaleDateString()}</label>*/}
                        {/*</div>*/}
                        <div className="item">
                            <div style={{marginRight: "8px", minWidth: "4em"}}>住客信息</div>
                            <Space wrap justify="center" align="center" style={{width: "100%"}}>
                                {guests.map((guest, index) => <div key={index}>{guest.nickname}</div>)}
                            </Space>
                            <Button style={{marginLeft: "auto", minWidth: "4em"}}
                                    shape="rectangular"
                                    size="small"
                                    fill="none"
                                    color="primary"
                                    onClick={() => {
                                        setGuestVisible(true)
                                    }}>选择</Button>
                            <Popup
                                visible={guestVisible}
                                onMaskClick={() => {
                                    setGuestVisible(false)
                                }}
                                position='right'
                                bodyStyle={{width: '80vw'}}
                            >
                                <Guest selectedList={guests} changeSelected={setGuests}/>
                            </Popup>
                        </div>
                    </form>
                </div>
                <div className="skeleton_price">
                    <div className="tips">优惠券</div>
                    <p>{couponSelect?.coupon.title}</p>
                    <Button size="mini" color="primary" onClick={() => setCouponSelectShow(true)}>选择</Button>
                    {detail ? <Picker
                        columns={[detail.coupon.map(e => {
                                return {
                                    label: e.coupon.title,
                                    value: e.id,
                                    key: e.id
                                }
                            }
                        )]}
                        visible={couponSelectShow}
                        onClose={() => {
                            setCouponSelectShow(false)
                        }}
                        onConfirm={CounponConfirm}
                    ></Picker> : ""}
                </div>

                <div className="skeleton_price">
                    <div className="tips">房间费用</div>
                    <div className="prices">
                        <span>￥{calcPrice()}</span>
                        {/*todo<span>共 {diffDay(leaveDate.getTime(),enterDate.getTime())} 晚</span>*/}
                        <span>共 {calcDay()} 晚</span>
                    </div>
                </div>
            </div>
            <div className="comfirm_foot-bar">
                <div className="text">
                    <span>总价:</span>
                    <span>￥{totalPrice()}</span>
                </div>
                <div className="btns">
                    <div onClick={submitOrder}>提交订单</div>
                </div>
            </div>
        </>)
}

export default Confirm