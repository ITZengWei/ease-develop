import React, { useState } from 'react'
// 如果您可以处理6.1中的破坏更改，也可以从'@storybook/react'导出
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

/* 导入组件 */
import { Scroll, ScrollProps } from './scroll'


/* 导出展示组件 */
export default {
  title: '功能组件/Scroll',
  component: Scroll,
  argTypes: {
    onScroll: { control: null },
    pullDown: { control: null },
    pullUp: { control: null },
  }
} as Meta

// 默认按钮
export const BasicScroll: Story<ScrollProps> = (props) => {

  const [lineCount, setLineCount] = useState(15)

  const [pullUpLoading, setPullUpLoading] = useState(false)

  const [pullDownLoading, setPullDownLoading] = useState(false)

  const {
    onScroll,
    pullDown,
    pullUp
  } = props

  const handleScroll = (...args: any []) => {
    onScroll && onScroll()
    action('scrolling')()
  }

  const handlePullDown = (...args: any []) => {
    pullDown && pullDown()
    setPullDownLoading(true)

    action('刷新成功')()

    // 延迟设置
    setTimeout(() => {
      setLineCount(15)

      setPullDownLoading(false)
    }, 2000)

  }

  const handlePullUp = (...args: any []) => {
    pullUp && pullUp()
    action('加载更多')()
    setPullUpLoading(true)
    
    // 延迟设置
    setTimeout(() => {
      setLineCount(count => count + 5)
      setPullUpLoading(false)
    }, 2000)
  }


  return (
    <div className="wrapper" style={{ height: '100vh', padding: 30, boxSizing: 'border-box', position: 'relative' }}>
      <Scroll 
        onScroll={ handleScroll }
        pullDown={ handlePullDown }
        pullUp={ handlePullUp }
        pullDownLoading={ pullDownLoading }
        pullUpLoading={ pullUpLoading }
        { ...props }
      >
        <div className="">
          {
            new Array(lineCount).fill(null).map((item, index) => (
              <p key={ index }>
                { index } ===  写字楼里写字间，写字间中程序员; 程序人员写程序，又将程序换酒钱，酒醒只在屏前坐，酒醉还来屏下眠: 酒醉酒醒,日复日，屏前屏下年复年; 但愿老死电脑间，不愿鞠躬老板前; 奔驰宝马贵者趣，公交自行程序员; 别人笑我太疯癫，
              </p>
            ))
          }
        </div>
      </Scroll>
    </div>
    
  )
}

BasicScroll.storyName = '基础用法'