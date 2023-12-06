import "@/assets/css/confirm.css"
import {useRouteStatus} from "@/common";
import React, {useState} from "react";
import {PickerDate} from "antd-mobile/es/components/date-picker/util";
import {Button, DatePicker, NavBar, Popup, Space} from "antd-mobile";
import {NavLink} from "react-router-dom";
import Guest from "@/view/home/Guest";
import {GuestInterface} from "@/api/business";

function Confirm() {
    const routeStatus = useRouteStatus();
    // 时间选择器
    const [enterVisible, setEnterVisible] = useState(false)
    const [enterDate, setEnterDate] = useState<PickerDate>(new Date())
    const [leaveVisible, setLeaveVisible] = useState(false)
    const [leaveDate, setLeaveDate] = useState<PickerDate>(new Date())
    const [guestVisible, setGuestVisible] = useState(false)
    const [guests, setGuests] = useState<Array<GuestInterface>>([])
    return (
        <>

            <NavBar onBack={routeStatus.back} className="top">提交订单</NavBar>
            <div className="skeleton">
                <div className="detail">
                    <div className="thumb">
                        <img src="@/assets/images/hotel1.jpg" alt=""/>
                    </div>
                    <div className="right">
                        <p>暑假特价房</p>
                        <div className="tips">
                            <span>新房特惠</span>
                            <span>10.00㎡</span>
                            <span>宜住1人</span>
                        </div>
                    </div>
                </div>
                <div className="skeleton_rect">
                    <form>
                        <div className="item" onClick={() => {
                            setEnterVisible(true)
                        }}>
                            <label>入住日期</label>
                            <DatePicker visible={enterVisible}
                                        onClose={() => {
                                            setEnterVisible(false)
                                        }}
                                        onConfirm={(value) => {
                                            setEnterDate(value)
                                            if (leaveDate.getTime() < value.getTime()) {
                                                setLeaveDate(value)
                                            }
                                        }}
                                        defaultValue={enterDate}/>
                            <label>{enterDate.toLocaleDateString()}</label>
                        </div>
                        <div className="item" onClick={() => {
                            setLeaveVisible(true)
                        }}>
                            <label>离店日期</label>
                            <DatePicker min={enterDate}
                                        visible={leaveVisible}
                                        onClose={() => {
                                            setLeaveVisible(false)
                                        }}
                                        onConfirm={(value) => {
                                            setLeaveDate(value)
                                        }}
                                        defaultValue={leaveDate}/>
                            <label>{leaveDate.toLocaleDateString()}</label>
                        </div>
                        <div className="item">
                            <div style={{marginRight: "8px"}}>住客信息</div>
                            <Space wrap justify="center" align="center">
                                {guests.map((guest, index) => <div key={index}>{guest.nickname}</div>)}
                            </Space>
                            <Button style={{marginLeft: "auto"}}
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
                    <div className="tips">房间费用</div>
                    <div className="prices">
                        <span>￥6600</span>
                        <span>共 1 晚</span>
                    </div>
                </div>
            </div>
            <div className="comfirm_foot-bar">
                <div className="text">
                    <span>总价:</span>
                    <span>￥6600.00</span>
                </div>
                <div className="btns">
                    <NavLink to="/home/booking/1">提交订单</NavLink>
                </div>
            </div>
        </>)
}

export default Confirm