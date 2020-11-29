/** 防抖函数 */
export var debounce = function (handle, delay) {
    if (delay === void 0) { delay = 300; }
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // todo this 怎么定义
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(null, args);
        }, delay);
    };
};
/** throttle 节流函数  */
export var throttle = function (handle, delay) {
    if (delay === void 0) { delay = 300; }
    var oldTime = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nowTime = +Date.now();
        if (nowTime - oldTime > delay) {
            oldTime = nowTime;
            handle.apply(null, args);
        }
    };
};
