import React, { FC, memo, ReactNode, CSSProperties } from 'react'

/** 内置动画组件 */
type LoadingType = 'ripple' | 'jump'


export interface BasicLoadingProps {
  /** 容器样式 */
  style?: CSSProperties
} 

export interface LoadingProps extends BasicLoadingProps {
  /** loading 内容 可以是内置的 涟漪 | 跳跃音符 */
  innerType?: LoadingType,
  /** 自定义内容 */
  children?: ReactNode
}


/** 涟漪 Loading 组件 */
export const RippleLoading: FC<BasicLoadingProps> = memo((props) => {
  const { style } = props


  return (
    <div className="ripple-loading" style={ style }>
      <div></div>
      <div></div>  
    </div>
  )
})  

/** 跳跃音符 Loading 组件 */
export const JumpMusicLoading: FC<BasicLoadingProps> = memo((props) => {
  const { style } = props

  return (
    <div className="jump-music-loading" style={ style }>
      <div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<span>玩命加载中...</span>
    </div>
  )
})  


/**
 * ### 加载组件 导入方式
 * ~~~js
 *  import { loading } from 'ease-develop'
 * ~~~
 */
export const Loading: FC<LoadingProps> = (props) => {
  const { 
    innerType,
    children,
    ...restProps
  } = props


  /** 如果有子元素 优先返回  */
  if (children) return (
    <div className="loading-wra" { ...restProps }>{ children }</div>
  )

  // 跳跃音符组件
  if (innerType === 'jump') return <JumpMusicLoading { ...restProps } />

  // 涟漪是默认的
  return <RippleLoading { ...restProps }  />
}


Loading.defaultProps = {
  innerType: 'ripple'
}

export default Loading 