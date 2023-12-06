import cookie from 'react-cookies'
import {CookieSerializeOptions} from "cookie";

const stateMap = new Map<string, any>()

/**
 * 获取临时保存数据
 * @param key
 */
export function getState<T>(key: string): T | null {
    const data = stateMap.get(key) || {}
    if (data.time && Date.now() > data.time) {
        stateMap.delete(key)
        return null
    }
    return data.value
}

/**
 * 临时保存数据
 * @param key
 * @param value
 * @param expired
 */
export function setState(key: string, value: any, expired: number | null = null) {
    const data = {
        value: value,
        time: expired
    }
    stateMap.set(key, data)
}

export function delState(key: string) {
    stateMap.delete(key)
}

/**
 * 临时数据是否存在
 * @param key
 */
export function hasState(key: string) {
    return getState(key) != null
}

/**
 * 保存cookie
 * @param key
 * @param value
 * @param expired
 */
export function saveCookie(key: string, value: any, expired: number | null = null) {
    let option: CookieSerializeOptions = {}
    if (expired != null) {
        option.maxAge = expired
    }
    cookie.save(key, value, option)
}

/**
 * 删除cookie
 * @param key
 */
export function delCookie(key: string) {
    saveCookie(key, null, 0)
}

/**
 * 获取cookie
 * @param key
 */
export function getCookie(key: string) {
    return cookie.load(key);
}

/**
 * 检测cookie
 * @param key
 */
export function hasCookie(key: string) {
    return getCookie(key) != null
}



