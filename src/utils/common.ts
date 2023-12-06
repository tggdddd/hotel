export function priceFormat(price: number | string) {
    let p = Number.parseFloat(price + "")
    let big = Math.floor(p)
    let small = Math.floor((p - big) * 100)
    return big + "." + small
}