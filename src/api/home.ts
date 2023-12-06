import {GET, Result} from "@/utils/axios";

export interface RoomInfo {
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

export interface HomeInfo {
    carousel: Array<RoomInfo>,
    list: Array<RoomInfo>,
    count: number
}

export function homeInfoApi(): Promise<Result<HomeInfo>> {
    return GET("/index/index")
}

export function homeInfoListApi(offset: number): Promise<Result<HomeInfo>> {
    return GET("/index/index_list", {offset})
}

function mock<T>(data: T): Promise<Result<T>> {
    return new Promise(resolve => resolve({
        data: data,
        code: 0,
        msg: "",
        time: Date.now()
    }))
}