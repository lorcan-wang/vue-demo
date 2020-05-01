const utils = {
    // 防抖
    debounce(fn, wait = 500) {
        let timer = null
        return function () {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(fn, wait)
        }
    },
    // 随机数
    RandomNum(Min, Max) {
        const Range = Max - Min;
        const Rand = Math.random();
        const num = Min + Math.round(Rand * Range);
        return num;
    }
}
export default utils