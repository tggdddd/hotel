import {GET, POST, Result} from "@/utils/axios";
import {CouponReceiveInterface} from "@/api/home";

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

export function collectPickListApi(page: number = 1, loading: string | undefined = undefined): Promise<Result<CommonPageInterface<CouponReceiveInterface>>> {
    return GET("/business/coupon_list", {
            page: page
        }, {},
        loading)
}