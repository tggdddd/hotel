import {GET, POST, Result} from "@/utils/axios";
import {CouponReceiveInterface, RoomInfoInterface} from "@/api/home";

export interface GuestInterface {
    id: string | undefined,
    busid: string,
    nickname: string,
    mobile: string,
    sex: number,
    sex_text: string | undefined
}

export interface BusinessInterface {
    id: string | undefined,
    nickname: string,
    mobile: string,
    password: string,
    avatar: string,
    avatar_text: string,
    gender: string,
    gender_text: string,
    sourceid: number,
    deal: number,
    openid: string,
    province: string,
    city: string,
    district: string,
    adminid: string,
    money: number,
    email: string,
    auth: number,
    point: number,
    createtime: number,
    createtime_text: string,
    deletetime: number,
    deletetime_text: string,
}
export interface CommonPageInterface<T> {
    list: Array<T>,
    hasMore: boolean,
    page: number
}

export function loginApi(data: { mobile: string, password: string }) {
    return POST("/business/login", data, {}, "加载中")
}

export function testApi(url: string) {
    return GET(url)
}

export function guestListApi(page: number = 1, loading: string | undefined) {
    return GET("/business/guest_list", {
            page: page
        }, {},
        loading)
}

export function guestDelApi(guessId: string | number, loading: string = "加载中") {
    return GET("/business/guest_del", {id: guessId}, {}, loading)
}

export function guestAddOrUpdateApi(data: GuestInterface, loading: string = "加载中") {
    return GET("/business/guest_add_update", data, {}, loading)
}

export function collectListApi(page: number = 1, loading: string | undefined = undefined) {
    return GET("/business/collect_list", {
            page: page
        }, {},
        loading)
}

export function collectPickListApi(page: number = 1, status: number = -1, loading: string | undefined = undefined): Promise<Result<CommonPageInterface<CouponReceiveInterface>>> {
    return GET("/business/coupon_list", {
            page: page,
            status
        }, {},
        loading)
}


export function submitOrderApi(data: {
    id: string | undefined,
    enterTime: number,
    leaveTime: number,
    guest: Array<string | undefined>,
    couponReceiveId: string | undefined
}): Promise<Result<string>> {
    return POST("/business/submit_order", data, {}, "加载中")
}

export interface OrderDetailInterface {
    id: string,
    busid: string,
    roomid: string,
    orgin_price: number,
    price: number,
    starttime: number,
    endtime: number,
    createtime: number,
    starttime_text: string,
    endtime_text: string,
    createtime_text: string,
    status: number,
    status_text: string,
    coupon_receive_id: string,
    comment: string,
    room: RoomInfoInterface,
    coupon: CouponReceiveInterface,
    guests: Array<GuestInterface & {
        orderid: string
    }>
    code: string
}

export function getOrderDetailApi(id: string | undefined | null): Promise<Result<OrderDetailInterface>> {
    return GET("/business/order_detail", {id});
}


export function getOrderListApi(page: number = 1, status: number | undefined | null = undefined, loading: string | undefined = undefined) {
    return GET("/business/order_list", {
            page: page,
            status
        }, {},
        loading)
}

export interface orderNumbersInterface {
    unPaid: number,
    unComment: number,
    paid: number
}

export function getOrderNumberApi(): Promise<Result<orderNumbersInterface>> {
    return GET("/business/orderNumbers")
}