import React, { 
  forwardRef,
	useState,
	useEffect,
	useRef,
	useImperativeHandle,
	useMemo,
  FC,
  ReactNode,
} from 'react'
/** 引入 better-scroll */
import BScroll from 'better-scroll'
/** 引入 防抖函数 */
import { debounce } from '../../utils/tools'
/** 引入 加载组件 */
import Loading from '../Loading'


/** 回调函数类型 */
type handleCallback = Function | null 

export interface ScrollProps {
  /** 滑动方向 */
  direction?: 'vertical' | 'horizontal'
  /** 是否支持点击 */
  click?: boolean
  /** 是否刷新状态 */
  refresh?: boolean
  /** 滑动处理方法 */
  onScroll?: handleCallback
  /** 下拉刷新处理方法 */
  pullDown?: handleCallback
  /** 是否下拉刷新状态 */
  pullDownLoading?: boolean
  /** 上拉加载处理方法 */
  pullUp?: handleCallback
  /** 是否上拉加载状态 */
  pullUpLoading?: boolean
  /** 是否支持顶部回弹效果 */
  bounceTop?: boolean
  /** 是否支持底部回弹效果 */
  bounceBottom?: boolean
  /** 子元素 */
  children: ReactNode
}

/** better-scroll 类型 */
type BScrollType = BScroll | null

/**
 * ### 加载组件 导入方式
 * 
 * > 依赖与 better-scroll 库 其他属性可以参考文档: xxx
 * 
 * ~~~js
 *  import { Scroll } from 'ease-develop'
 * ~~~
 */
export const Scroll: FC<ScrollProps> = forwardRef((props, ref) => {
  // 更好滑动实例
	const [bScroll, setBScroll] = useState<BScrollType>(null)

	// 滑动容器盒子DOM
	const scrollContainerRef = useRef<HTMLDivElement>(null)

  const {
    direction,
    click,
    refresh,
    pullDownLoading,
    pullUpLoading,
    bounceTop,
    bounceBottom,
    children,
  } = props

  const {
    onScroll,
    pullDown,
    pullUp,
  } = props

  // 对上拉 & 下拉 处理方法 防抖处理
  const pullDownDebounce = useMemo(() => {
    if (!pullDown) return pullDown
    return debounce(pullDown)
  }, [pullDown])

  const pullUpDebounce = useMemo(() => {
    if (!pullUp) return pullUp

    return debounce(pullUp)
  }, [pullUp])

  // 初始化 bScroll 实例
  useEffect(() => {
    // 如果 scrollContainerRef 在初始化为空的时候 退出
    if (!scrollContainerRef.current) return

    const betterScroll = new BScroll(scrollContainerRef.current, {
			scrollX: direction === 'horizontal', // 是否水平滑动
			scrollY: direction === 'vertical', // 是否垂直滑动
			probeType: 3, // 更好的滑动体验
			click: click, // 是否支持点击
			bounce: { // 四个不同方向的回弹效果
				top: bounceTop,
				bottom: bounceBottom,
			}
		})

		setBScroll(betterScroll)

		return () => {
			// 重置 scroll TODO 为什么这里要 清空
      setBScroll(null)
    }
  }, [scrollContainerRef, bounceTop, bounceBottom, direction, click])

  // 处理 scroll 滚动
	useEffect(() => {
		// 如果 没有实例，或者没有对应的方法，我们不做处理
		if (!onScroll || !bScroll) return

		// 绑定 scroll 事件
		bScroll.on('scroll', onScroll)

		return () => {
			// 清除绑定的事件
			bScroll.off('scroll', onScroll)
		}
  }, [onScroll, bScroll])
  

  // 处理 pullDown 下拉刷新
	useEffect(() => {
		// 如果 没有实例，或者没有对应的方法，我们不做处理
		if (!pullDown || !bScroll) return

		// 判断上拉的距离 有没有超过 50，再执行方法
		const handlePullDown = () => {
			if (bScroll.y > 50) {
				pullDownDebounce && pullDownDebounce()
			}
		}

		// 绑定下拉事件
		bScroll.on('touchEnd', handlePullDown)

		return () => {
			// 移除下拉事件
			bScroll.off('touchEnd', handlePullDown)
		}
  }, [pullDown, bScroll, pullDownDebounce])
  

  // 处理 pullUp 上拉加载更多
	useEffect(() => {
		// 如果 没有实例，或者没有对应的方法，我们不做处理
		if (!pullUp || !bScroll) return

		// 对上拉进行条件判断
		const handlePullUp = () => {
			const { y, maxScrollY } = bScroll

			// console.log({ y, maxScrollY }) // y => 当前 容器向上滑动的距离， 以及最大滑动距离
			// 判断是否滑动底部 maxScrollY: 当前容器最大滑动 Y 值
			if (y <= maxScrollY + 100) {
				pullUpDebounce && pullUpDebounce()
			}
		}

		// 绑定上拉事件
		bScroll.on('scrollEnd', handlePullUp)

		return () => {
			// 移除上拉事件
			bScroll.off('scrollEnd', handlePullUp)
		}
	}, [pullUp, bScroll, pullUpDebounce])

	// 如果默认设置刷新，我们就进行刷新操作
	useEffect(() => {
		if (refresh && bScroll) {
			bScroll.refresh()
		}
  })
  
  // 将内部刷新方法和 bScroll 实例交给父组件来操作
	useImperativeHandle(ref, () => ({
		refresh() {
			if (bScroll) {
				// 刷新
				bScroll.refresh()
				// 滚动条置顶
				bScroll.scrollTo(0, 0)
			}
		},
		getBScroll() {
			if (bScroll) return bScroll
		}
	}))

  return (
    <div className="scroll-container" ref={ scrollContainerRef }>
      { children }
      
      {/* 上拉加载组件 */}
      { pullUpLoading && <div className="pull-up-loading"><Loading.Ripple /></div> }
       
      {/* 下拉加载组件 */}
      { pullDownLoading && <div className="pull-down-loading"><Loading.JumpMusic /></div> }
    </div> 
  )
})


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
}


Scroll.displayName = 'Scroll'

export default Scroll