import {Toast} from "antd-mobile";
import {ToastHandler} from "antd-mobile/es/components/toast";
import React from "react";

export class GlobalToast {
    private static instance: ToastHandler | null | undefined

    static show(content: string
        , icon: 'success' | 'fail' | 'loading' | React.ReactNode = null
        , duration: number = 2000, maskClickable: boolean = true, position: 'top' | 'bottom' | 'center' = 'center') {
        return new Promise(
            resolve => {
                GlobalToast.instance = Toast.show({
                    content,
                    icon,
                    duration,
                    maskClickable,
                    position,
                    afterClose: () => {
                        resolve(null)
                    }
                })
            }
        )
    }

    static error(content: string
        , duration: number = 2000, maskClickable: boolean = true, position: 'top' | 'bottom' | 'center' = 'center') {
        return GlobalToast.show(content, "fail", duration, maskClickable, position)
    }

    static success(content: string
        , duration: number = 2000, maskClickable: boolean = true, position: 'top' | 'bottom' | 'center' = 'center') {
        return GlobalToast.show(content, "success", duration, maskClickable, position)
    }

    static loading(content: string, maskClickable: boolean = true, position: 'top' | 'bottom' | 'center' = 'center') {
        return GlobalToast.show(content, "loading", 0, maskClickable, position)
    }

    static close() {
        GlobalToast.instance?.close()
    }
}