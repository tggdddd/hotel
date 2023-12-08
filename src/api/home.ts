import {GET, Result} from "@/utils/axios";
import {BusinessInterface} from "@/api/business";

export interface RoomInfoInterface {
    id: string,
    name: string,
    "thumb": string,
    "thumb_text": string,
    "price": number,
    "flag": Array<number>,
    "content": string,
    "total": number,
    "deletetime": number,
    "tags": Array<string>
    "collect": null | number
}

export interface CouponInterface {
    id: string,
    title: string,
    thumb: string,
    rate: number,
    total: number,
    status: number,
    status_text: string,
    createtime: number,
    createtime_text: string,
    endtime: number,
    endtime_text: string,
    thumb_text: string,
    receive: boolean
}

export interface HomeInfo {
    carousel: Array<CouponInterface>,
    list: Array<RoomInfoInterface>,
    count: number
}

export interface CouponReceiveInterface {
    id: string,
    cid: string,
    status: number,
    status_text: string,
    createtime: number,
    createtime_text: string,
    business: BusinessInterface,
    coupon: CouponInterface
}

export function homeInfoApi(filter: string): Promise<Result<HomeInfo>> {
    return GET("/index/index", {
        filter: filter
    })
}

export function homeInfoListApi(offset: number): Promise<Result<HomeInfo>> {
    return GET("/index/index_list", {offset})
}


export function couponInfoApi(id: string, loading: string | undefined = undefined): Promise<Result<{
    coupon: CouponInterface,
    receive: Array<CouponReceiveInterface>
}>> {
    return GET("/index/coupon_info", {id}, {}, loading)
}

export function couponPickApi(id: string, loading: string | undefined = undefined): Promise<Result<any>> {
    return GET("/index/coupon_pick", {id}, {}, loading)
}

export interface homeDetailInterface {
    detail: RoomInfoInterface,
    coupon: Array<CouponReceiveInterface>,
    comment: Array<any>,
    equipment: Array<any>
}

export function getHotelDetailApi(id: string, loading: string | undefined = undefined): Promise<Result<homeDetailInterface>> {
    return GET("/index/hotel_detail", {id}, {}, loading)
}