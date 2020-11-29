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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo } from 'react';
/** 涟漪 Loading 组件 */
export var RippleLoading = memo(function (props) {
    var style = props.style;
    return (React.createElement("div", { className: "ripple-loading", style: style },
        React.createElement("div", null),
        React.createElement("div", null)));
});
/** 跳跃音符 Loading 组件 */
export var JumpMusicLoading = memo(function (props) {
    var style = props.style;
    return (React.createElement("div", { className: "jump-music-loading", style: style },
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("span", null, "\u73A9\u547D\u52A0\u8F7D\u4E2D...")));
});
/**
 * ### 加载组件 导入方式
 * ~~~js
 *  import { loading } from 'ease-develop'
 * ~~~
 */
export var Loading = function (props) {
    var innerType = props.innerType, children = props.children, restProps = __rest(props
    /** 如果有子元素 优先返回  */
    , ["innerType", "children"]);
    /** 如果有子元素 优先返回  */
    if (children)
        return (React.createElement("div", __assign({ className: "loading-wra" }, restProps), children));
    // 跳跃音符组件
    if (innerType === 'jump')
        return React.createElement(JumpMusicLoading, __assign({}, restProps));
    // 涟漪是默认的
    return React.createElement(RippleLoading, __assign({}, restProps));
};
Loading.defaultProps = {
    innerType: 'ripple'
};
export default Loading;
//# sourceMappingURL=loading.js.map