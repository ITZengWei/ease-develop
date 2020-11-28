import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

/** button component type mode */
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

/** button component size mode */
export type ButtonSize = 'lg' | 'sm' | 'default'

interface IBaseButtonProps {
  /** 
   * 用户自定义的CSS类
   */
  className?: string
  /** 
   * 按钮的类型
   */
  btnType?: ButtonType
  /** 
   * 按钮的大小
   */
  size?: ButtonSize
  /** 
   * 设置禁用
   */
  disabled?: boolean
  /** 
   * 跳转链接(btnType = link)的时候生效
   */
  href?: string
   /**
   * 可选点击事件
   */
  onClick?: () => void
    /** 
   * 子节点
   */
  children: ReactNode
} 

// 原生 属性 和 基本组件属性 使用交叉类型 
type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>

type NativeAnchorProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// 使用交叉类型，因为可能是 Button | Anchor
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>

/**
 * ### 按钮 导入方式
 * ~~~js
 *  import { Button } from 'smalllb'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  // 收集依赖
  const {
    className,
    btnType,
    size,
    disabled,
    href,
    children,
    ...restProps
  } = props

  // 设置最终的类名
  const classes = classNames(className, 'btn', {
    [`btn-${ btnType }`]: btnType,
    [`btn-${ size }`]: size,
    disabled: disabled && btnType === 'link'
  })

  // 如果 btnType === 'link'并且有 href 这个属性，我们渲染一个 a 标签
  if (btnType === 'link' && href) {
    return (
      <a 
        className={ classes } 
        href={ href } 
        { ...restProps }
      >
        { children }
      </a>
    )
  }

  return (
    <button
      className={ classes } 
      disabled={ disabled }
      { ...restProps }
    >
      { children }
    </button>
  )
}

// 注意，虽然使用了 默认属性，但还是要将接口中属性设置为可选
Button.defaultProps = {
  btnType: 'default',
  size: 'lg',
  disabled: false
}

export default Button