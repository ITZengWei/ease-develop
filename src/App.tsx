import React, { FC, useState } from 'react'

import { Scroll } from './components/Scroll/scroll'
                                                                        
export const App: FC = function (props) {

  const [lineCount, setLineCount] = useState(15)

  const [pullUpLoading, setPullUpLoading] = useState(false)

  const [pullDownLoading, setPullDownLoading] = useState(false)


  const handlePullDown = (...args: any []) => {
    console.log(args)
    setPullDownLoading(true)
    setLineCount(5)

    setPullDownLoading(false)

  }

  const handlePullUp = (...args: any []) => {
    console.log(args)
    setPullUpLoading(true)
    setLineCount(count => count + 5)
    setPullUpLoading(false) 
  }


  return (
    <div className="wrapper" style={{ height: '100vh' }}>
      <Scroll 
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

export default App
