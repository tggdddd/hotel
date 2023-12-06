import {Axios, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {GlobalToast} from "@/utils/toast";
import qs from "qs";
import {getCookie, getState, setState} from "@/state/state";
import {buildKey, StateEnum} from "@/state/stateEnum";

export type Result<T> = {
    code: number;
    msg: string;
    data: T;
    time: number
};

enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

function createAxios() {
    const axios = new Axios({
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 1000 * 60,
        headers: {
            'Content-Type': ContentTypeEnum.FORM_URLENCODED,
            'X-Requested-With': 'XMLHttpRequest'
        },
        validateStatus: (status) => {
            return status === 200
        },
        // transformRequest: (data) => {
        //     // 解决传递数组变成对象的问题
        //     Object.keys(data).forEach((key) => {
        //         if ((typeof data[key]) === 'object') {
        //             data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
        //         }
        //     })
        //     data = qs.stringify(data) // 这里必须使用qs库进行转换
        //     return data
        // }
    })
    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // console.info("请求request拦截", config)
            // 一般会请求拦截里面加token，用于后端的验证
            const token = getCookie("token")
            if (token) {
                config.headers!["HTTP-AUTHORIZATION"] = token;
                config.headers!["Authorization"] = token;
            }
            // 获取 请求取消
            const cancelKey = buildKey(StateEnum.AXIOS_CANCEL, config.url)
            // console.log("cancelKey", cancelKey)
            const oldCancelToken = getState<AbortController>(cancelKey)
            // console.log("oldCancelToken", oldCancelToken)
            oldCancelToken && oldCancelToken.abort()
            const abortController = new AbortController()
            config.signal = abortController.signal
            setState(cancelKey, abortController)
            return config;
        },
        (error) => {
            console.error("请求request错误", error)
        });

    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            return new Promise((resolve, reject) => {
                let data = JSON.parse(response.data)
                // console.log("响应数据", data)
                if (data.code) {
                    // @ts-ignore
                    resolve(data)
                } else {
                    GlobalToast.error(data.msg)
                    reject(data.msg)
                }
            })
        },
        (error: AxiosError) => {
            console.error("响应错误", error)
            if (error.code === "ERR_CANCELED") {
                return
            }
            let message;
            switch (error.response?.status) {
                case 400:
                    message = "请求错误(400)";
                    break;
                case 401:
                    message = "未授权，请重新登录(401)";
                    // 这里可以做清空storage并跳转到登录页的操作
                    break;
                case 403:
                    message = "拒绝访问(403)";
                    break;
                case 404:
                    message = "请求出错(404)";
                    break;
                case 408:
                    message = "请求超时(408)";
                    break;
                case 500:
                    message = "服务器错误(500)";
                    break;
                case 501:
                    message = "服务未实现(501)";
                    break;
                case 502:
                    message = "网络错误(502)";
                    break;
                case 503:
                    message = "服务不可用(503)";
                    break;
                case 504:
                    message = "网络超时(504)";
                    break;
                case 505:
                    message = "HTTP版本不受支持(505)";
                    break;
                default:
                    message = `连接出错(${error.response?.status})!`;
            }
            GlobalToast.error(message)
            return Promise.reject(message)
        })

    return axios
}

const http = createAxios()

function debound(func: Function, loading: null | string): Promise<Result<any>> {
    let duration = 600
    if (loading) {
        GlobalToast.loading(loading)
    }
    let result = func() as Promise<any>
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            result.then(res => {
                if (loading) {
                    GlobalToast.close()
                }
                resolve(res)
            }).catch(err => {
                if (loading) {
                    GlobalToast.close()
                }
                reject(err)
            })
        }, duration)
    })
}

export function GET(url: string, params: object = {}, config: AxiosRequestConfig = {}, loading: string | undefined | null = null) {
    return debound(() => {
        return http.get(url, {
            params,
            ...config
        })
    }, loading)
}

export function POST(url: string, data: object | Array<any> | string = {}, config: AxiosRequestConfig = {}, loading: string | undefined | null = null) {
    console.log(data)
    const headers = config.headers || {}
    headers['Content-Type'] = ContentTypeEnum.FORM_URLENCODED
    config.headers = headers
    data = qs.stringify(data, {arrayFormat: "brackets"})
    return debound(() => {
        return http.post(url, data, config)
    }, loading)
}

export function PUT(url: string, data: object = {}, config: AxiosRequestConfig = {}, loading: string | undefined | null = null) {
    return debound(() => {
        return http.put(url, data, config)
    }, loading)
}

export function UPLOAD(url: string, data: object | Array<any> = {}, config: AxiosRequestConfig = {}, loading: string | undefined | null = null) {
    const RequestData = new FormData()
    if (JSON.stringify(data) != "{}") {
        for (let key in data) {
            //@ts-ignore
            RequestData.append(key, data[key])
        }
    }
    const headers = config.headers || {}
    headers['Content-Type'] = ContentTypeEnum.FORM_DATA
    config.headers = headers
    return debound(() => {
        return http.postForm(url, RequestData, config)
    }, loading)
}

export function DELETE(url: string, params: object = {}, config: AxiosRequestConfig = {}, loading: string | undefined | null = null) {
    return debound(() => {
        return http.delete(url, {
            params,
            ...config
        })
    }, loading)
}

export default http