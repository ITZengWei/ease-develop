import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import Button, { ButtonProps } from './button'


// 默认测试 class + onclick + text
const defaultTestProps:ButtonProps = {
  className: 'default-test',
  // 用于测试是否触发函数
  onClick: jest.fn()
}

// 测试类型、大小、禁用标识 class + type + size + disabled + onclick  
const typeAndSizeWithDisabedTestProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  disabled: true,
  onClick: jest.fn()
}

// 测试链接
const linkTestProps: ButtonProps = {
  btnType: 'link',
  href: 'http://blog.smalllb.top'
}


describe('test button component', () => {
  // 应该呈现正确的默认按钮吗 
  it ('should render the correct default button', () => {
    // 使用 render 创建 RenderResult
    const wrapper: RenderResult = render(<Button { ...defaultTestProps }>default</Button>)
    const element: HTMLElement = wrapper.getByText('default')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default btn-lg default-test')
    // 触发点击
    fireEvent.click(element)

    // 测试 defaultTestProps 中的 onClick 是否被点击 
    expect(defaultTestProps.onClick).toBeCalled()
  })


  // 测试类型和大小和禁用
  it ('test type and size and disabled', () => {
    const wrapper: RenderResult = render(<Button { ...typeAndSizeWithDisabedTestProps }>disabled</Button>)
    const element: HTMLButtonElement = wrapper.getByText('disabled') as HTMLButtonElement
    
    expect(element).toHaveClass('btn btn-primary btn-lg')

    // 按钮禁用
    expect(element.disabled).toBeTruthy()

    fireEvent.click(element)

    // 测试没有被点击
    expect(typeAndSizeWithDisabedTestProps.onClick).not.toBeCalled()
  })


  // 测试链接
  it ('test link with has href prop', () => {
    const wrapper: RenderResult = render(<Button { ...linkTestProps }>link</Button>)
    const element: HTMLElement = wrapper.getByText('link')

    expect(element.tagName).toEqual('A')

    expect(element).toHaveClass('btn btn-link')

  })
})