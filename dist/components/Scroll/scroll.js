import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo, } from 'react';
/** 引入 better-scroll */
import BScroll from 'better-scroll';
/** 引入 防抖函数 */
import { debounce } from '../../utils/tools';
/** 引入 加载组件 */
import Loading from '../Loading';
/**
 * ### 加载组件 导入方式
 *
 * > 依赖与 better-scroll 库 其他属性可以参考文档: xxx
 *
 * ~~~js
 *  import { Scroll } from 'ease-develop'
 * ~~~
 */
export var Scroll = forwardRef(function (props, ref) {
    // 更好滑动实例
    var _a = useState(null), bScroll = _a[0], setBScroll = _a[1];
    // 滑动容器盒子DOM
    var scrollContainerRef = useRef(null);
    var direction = props.direction, click = props.click, refresh = props.refresh, pullDownLoading = props.pullDownLoading, pullUpLoading = props.pullUpLoading, bounceTop = props.bounceTop, bounceBottom = props.bounceBottom, children = props.children;
    var onScroll = props.onScroll, pullDown = props.pullDown, pullUp = props.pullUp;
    // 对上拉 & 下拉 处理方法 防抖处理
    var pullDownDebounce = useMemo(function () {
        if (!pullDown)
            return pullDown;
        return debounce(pullDown);
    }, [pullDown]);
    var pullUpDebounce = useMemo(function () {
        if (!pullUp)
            return pullUp;
        return debounce(pullUp);
    }, [pullUp]);
    // 初始化 bScroll 实例
    useEffect(function () {
        // 如果 scrollContainerRef 在初始化为空的时候 退出
        if (!scrollContainerRef.current)
            return;
        var betterScroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === 'horizontal',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom,
            }
        });
        setBScroll(betterScroll);
        return function () {
            // 重置 scroll TODO 为什么这里要 清空
            setBScroll(null);
        };
    }, [scrollContainerRef, bounceTop, bounceBottom, direction, click]);
    // 处理 scroll 滚动
    useEffect(function () {
        // 如果 没有实例，或者没有对应的方法，我们不做处理
        if (!onScroll || !bScroll)
            return;
        // 绑定 scroll 事件
        bScroll.on('scroll', onScroll);
        return function () {
            // 清除绑定的事件
            bScroll.off('scroll', onScroll);
        };
    }, [onScroll, bScroll]);
    // 处理 pullDown 下拉刷新
    useEffect(function () {
        // 如果 没有实例，或者没有对应的方法，我们不做处理
        if (!pullDown || !bScroll)
            return;
        // 判断上拉的距离 有没有超过 50，再执行方法
        var handlePullDown = function () {
            if (bScroll.y > 50) {
                pullDownDebounce && pullDownDebounce();
            }
        };
        // 绑定下拉事件
        bScroll.on('touchEnd', handlePullDown);
        return function () {
            // 移除下拉事件
            bScroll.off('touchEnd', handlePullDown);
        };
    }, [pullDown, bScroll, pullDownDebounce]);
    // 处理 pullUp 上拉加载更多
    useEffect(function () {
        // 如果 没有实例，或者没有对应的方法，我们不做处理
        if (!pullUp || !bScroll)
            return;
        // 对上拉进行条件判断
        var handlePullUp = function () {
            var y = bScroll.y, maxScrollY = bScroll.maxScrollY;
            // console.log({ y, maxScrollY }) // y => 当前 容器向上滑动的距离， 以及最大滑动距离
            // 判断是否滑动底部 maxScrollY: 当前容器最大滑动 Y 值
            if (y <= maxScrollY + 100) {
                pullUpDebounce && pullUpDebounce();
            }
        };
        // 绑定上拉事件
        bScroll.on('scrollEnd', handlePullUp);
        return function () {
            // 移除上拉事件
            bScroll.off('scrollEnd', handlePullUp);
        };
    }, [pullUp, bScroll, pullUpDebounce]);
    // 如果默认设置刷新，我们就进行刷新操作
    useEffect(function () {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });
    // 将内部刷新方法和 bScroll 实例交给父组件来操作
    useImperativeHandle(ref, function () { return ({
        refresh: function () {
            if (bScroll) {
                // 刷新
                bScroll.refresh();
                // 滚动条置顶
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll: function () {
            if (bScroll)
                return bScroll;
        }
    }); });
    return (React.createElement("div", { className: "scroll-container", ref: scrollContainerRef },
        children,
        pullUpLoading && React.createElement("div", { className: "pull-up-loading" },
            React.createElement(Loading.Ripple, null)),
        pullDownLoading && React.createElement("div", { className: "pull-down-loading" },
            React.createElement(Loading.JumpMusic, null))));
});
Scroll.defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: true,
    onScroll: null,
    pullDown: null,
    pullDownLoading: false,
    pullUp: null,
    pullUpLoading: false,
    bounceTop: true,
    bounceBottom: true,
};
Scroll.displayName = 'Scroll';
export default Scroll;
