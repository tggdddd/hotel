export function priceFormat(price: number | string) {
    let p = Number.parseFloat(price + "")
    let big = Math.floor(p)
    let small = Math.floor((p - big) * 100)
    return big + "." + small
}

export function buildUrl(url: string, data: Record<string, string>) {
    let keys = Object.keys(data)
    let result: Array<any> = []
    for (let key of keys) {
        result.push(`${key}=${data[key]}`)
    }
    return url + (url.indexOf("?") === -1 ? "?" : "&") + result.join("&");
}

export function diffDay(data1: number | string, data2: number | string) {
    data1 = data1.toString().padEnd(13, "0")
    data2 = data2.toString().padEnd(13, "0")
    let day = (Number.parseInt(data2) - Number.parseInt(data1)) / 60 / 60 / 24 / 1000
    return Math.ceil(day)
}

export function dateFormat(inputDate: number, formatter = "yyyy-MM-dd hh:mm:ss") {
    let date = new Date(Number.parseInt(inputDate.toString().padEnd(13, "0")));
    const o = {
        "M+": date.getMonth() + 1,  // 月
        "d+": date.getDate(),       // 日
        "h+": date.getHours(),      // 时
        "m+": date.getMinutes(),    // 时
        "s+": date.getSeconds(),    // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3),      // 季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(formatter)) {
        formatter = formatter.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        //@ts-ignore
        if (new RegExp("(" + k + ")").test(formatter)) formatter = formatter.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    let week = weeks[date.getDay()];
    return formatter.replace(/week/, week);
}