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

export function diffDay(data1: number, data2: number) {

}