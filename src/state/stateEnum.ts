export enum StateEnum {
    SHOW_MENU,//显示菜单
    SHOULD_LOGIN,//需要登录
    AXIOS_CANCEL//axios去重发
}

export function buildKey(type: StateEnum, key: string | null | undefined) {
    return type + ":" + key
}