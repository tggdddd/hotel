import {GET, POST} from "@/utils/axios";

export interface GuestInterface {
    id: string | undefined,
    busid: string,
    nickname: string,
    mobile: string,
    sex: number,
    sex_text: string | undefined
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