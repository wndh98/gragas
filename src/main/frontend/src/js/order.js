function salePercent(price, sale) {
    let percent = 100 - (sale * price * 100);
    return percent;
}
export {
    salePercent
};