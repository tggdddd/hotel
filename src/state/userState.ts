import {getCookie, hasCookie, saveCookie} from "@/state/state";

/**
 * 检测是否已登录
 */
export function isLogin() {
    return hasCookie("user")
}

/**
 * 保存用户信息
 * @param user
 */
export function saveUser(user: any) {
    return saveCookie("user", user)
}

/**
 * 获取用户信息
 */
export function getUser() {
    return getCookie("user")
}

/**
 * 保存token
 * @param token
 */
export function saveToken(token: string) {
    return saveCookie("token", token);
}

/**
 * 获取token
 */
export function getToken() {
    return getCookie("token")
}