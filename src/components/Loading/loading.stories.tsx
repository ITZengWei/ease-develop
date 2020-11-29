import React, {  } from 'react'
// 如果您可以处理6.1中的破坏更改，也可以从'@storybook/react'导出
import { Story, Meta } from '@storybook/react/types-6-0'

/* 导入组件 */
import { LoadingProps } from './loading'

import Loading from './index'

/* 导出展示组件 */
export default {
  title: '展示组件/Loading',
  component: Loading,
  argTypes: {
    style: { control: null },
    children: { control: null },
  }
} as Meta

// 默认按钮
export const BasicLoading: Story<LoadingProps> = (props) => (<Loading { ...props }></Loading>)

BasicLoading.storyName = '基础用法'


/** 自定义渲染内容 */
export const UseContentLoading: Story<LoadingProps> = (props) => {


  return (
    <Loading { ...props } style={{ textAlign: 'center' }}>加载中...</Loading>
  )
} 

UseContentLoading.storyName = '自定义渲染'


/** 单独使用 */
export const AloneLoading: Story = (props) => {

  return (
    <div>
      <h2>涟漪</h2>
      <p><Loading.Ripple /></p>
      {/* <hr/> */}
      <h2 style={{ marginTop: 100 }}>跳跃音符</h2>
      <p><Loading.JumpMusic /></p>
    </div>
  )
} 

AloneLoading.storyName = '单独使用'
