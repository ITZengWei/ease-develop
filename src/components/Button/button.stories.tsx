import React from 'react'
// 如果您可以处理6.1中的破坏更改，也可以从'@storybook/react'导出
import { Story, Meta } from '@storybook/react/types-6-0'
// import {} from '@storybook/'
import { action } from '@storybook/addon-actions'

/* 导入组件 */
import { Button, ButtonProps } from './button'

/* 导出展示组件 */
export default {
  title: '基础组件/Button',
  component: Button,
  argTypes: {
    // control 详情看 https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations
    children: {  control: '' }
  },
  parameters: {
    info: { inline: true }
  }
} as Meta



// 默认按钮
export const BaseButton: Story<ButtonProps> = (props) => {
  return (
    <Button onClick={ action('param: base') } { ...props }>基础按钮</Button>
  )
}

BaseButton.storyName = '基本'

export const ButtonTypeGroup: Story<ButtonProps> = () => (
  <>
    <Button btnType="primary" onClick={ action('param: primary') }>primary</Button>
    <Button btnType="danger" onClick={ action('param: danger') }>danger</Button>
    <Button btnType="default" onClick={ action('param: default') }>default</Button>
    <Button btnType="link" onClick={ action('param: link') } href="#">link</Button>
  </>
) 

ButtonTypeGroup.storyName = '不同类型'


export const ButtonSizeGroup: Story<ButtonProps> = () => (
  <>
    <Button size="lg" onClick={ action('param: lg') }>large</Button>
    <Button size="sm" onClick={ action('param: sm') }>small</Button>
  </>
) 

ButtonSizeGroup.storyName = '不同大小'


export const ButtonDisableGroup: Story<ButtonProps> = () => (
  <>
    <Button onClick={ action('param: disable') } disabled>disabled</Button>
    <Button onClick={ action('param: default') }>default</Button>
  </>
) 

ButtonDisableGroup.storyName = '禁用'




// // 主要并且是小的按钮
// export const PrimaryWithSmallButton = Template.bind({})

// PrimaryWithSmallButton.args = {
//   btnType: 'primary',
//   size: 'sm',
//   children: 'small with primary button'
// }

// // 具有行为的按钮
// export const ActionButton = Template.bind({})

// ActionButton.args = {
//   onClick: () => {},
//   children: 'action button'
// }

// // 文本按钮并且禁用
// export const TextWithDisabledButton = Template.bind({})
// TextWithDisabledButton.args = {
//   btnType: 'link',
//   disabled: true,
//   children: 'link and disabled button'
// }

// // 链接按钮
// export const linkButton = Template.bind({})
// linkButton.args = {
//   btnType: 'link',
//   href: 'http://blog.smalllb.top',
//   children: 'anchor button'
// }


