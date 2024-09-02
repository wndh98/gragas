function salePercent(price, sale) {
    let percent = 100 % -(sale / price);
    // let percent = 100 - (sale * price * 100);

    return (Math.ceil(percent * 100));
}

function getPrice(price, sale) {
    return sale > 0 ? sale : price;
}
export {
    salePercent,
    getPrice
};