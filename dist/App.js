var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { Scroll } from './components/Scroll/scroll';
export var App = function (props) {
    var _a = useState(15), lineCount = _a[0], setLineCount = _a[1];
    var _b = useState(false), pullUpLoading = _b[0], setPullUpLoading = _b[1];
    var _c = useState(false), pullDownLoading = _c[0], setPullDownLoading = _c[1];
    var handlePullDown = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        setPullDownLoading(true);
        setLineCount(5);
        setPullDownLoading(false);
    };
    var handlePullUp = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        setPullUpLoading(true);
        setLineCount(function (count) { return count + 5; });
        setPullUpLoading(false);
    };
    return (React.createElement("div", { className: "wrapper", style: { height: '100vh' } },
        React.createElement(Scroll, __assign({ pullDown: handlePullDown, pullUp: handlePullUp, pullDownLoading: pullDownLoading, pullUpLoading: pullUpLoading }, props),
            React.createElement("div", { className: "" }, new Array(lineCount).fill(null).map(function (item, index) { return (React.createElement("p", { key: index },
                index,
                " ===  \u5199\u5B57\u697C\u91CC\u5199\u5B57\u95F4\uFF0C\u5199\u5B57\u95F4\u4E2D\u7A0B\u5E8F\u5458; \u7A0B\u5E8F\u4EBA\u5458\u5199\u7A0B\u5E8F\uFF0C\u53C8\u5C06\u7A0B\u5E8F\u6362\u9152\u94B1\uFF0C\u9152\u9192\u53EA\u5728\u5C4F\u524D\u5750\uFF0C\u9152\u9189\u8FD8\u6765\u5C4F\u4E0B\u7720: \u9152\u9189\u9152\u9192,\u65E5\u590D\u65E5\uFF0C\u5C4F\u524D\u5C4F\u4E0B\u5E74\u590D\u5E74; \u4F46\u613F\u8001\u6B7B\u7535\u8111\u95F4\uFF0C\u4E0D\u613F\u97A0\u8EAC\u8001\u677F\u524D; \u5954\u9A70\u5B9D\u9A6C\u8D35\u8005\u8DA3\uFF0C\u516C\u4EA4\u81EA\u884C\u7A0B\u5E8F\u5458; \u522B\u4EBA\u7B11\u6211\u592A\u75AF\u766B\uFF0C")); })))));
};
export default App;
//# sourceMappingURL=App.js.map