type throttleAndDebounceProps = (handle: Function, delay?: number) => Function

/** 防抖函数 */
export const debounce: throttleAndDebounceProps = (handle: Function, delay: number = 300) => {
	let timer: any = null

	return function (...args: any []) {
		console.log(delay, 'trigger');
		
		// todo this 怎么定义
		clearTimeout(timer)

		timer = setTimeout(() =>  {
			handle.apply(null, args)
		}, delay)
	}
}

/** throttle 节流函数  */
export const throttle: throttleAndDebounceProps = (handle, delay = 300) => {
	let oldTime = 0
	return function (...args: any []) {
		let nowTime: number = + Date.now()

		if (nowTime - oldTime > delay) {
			oldTime = nowTime
			handle.apply(null, args)
		}
	}
}