import { FC } from 'react'
import { Loading, LoadingProps, BasicLoadingProps, RippleLoading, JumpMusicLoading } from './loading'

type LoadingComponent = FC<LoadingProps> & {
  /** 涟漪组件 */
  Ripple: FC<BasicLoadingProps>,

  /** 跳跃音符组件 */
  JumpMusic: FC<BasicLoadingProps>
}

// 通过类型断言 转换Loading组件
const TransLoading = Loading as LoadingComponent

TransLoading.Ripple = RippleLoading

TransLoading.JumpMusic = JumpMusicLoading

export default TransLoading