# ease-develop

> 开发中常用的组件库，让简单开发变得简单


## eslint 的支持

## 配置 React 无感 测试 cross-env 的使用

> 可以很方便的跨平台 设置 环境变量 文档： https://www.npmjs.com/package/cross-env

+ 安装

```cmd
  cnpm install cross-env --save-dev
```

+ 使用

```json
  // package.json 
  "scripts": {
    "test": "react-scripts test",
    "test:nowatch": "cross-env CI=true react-scripts test"
  }
```

## git 钩子


> 对上传 git 代码进行验证 文档： https://www.npmjs.com/package/husky

+ 安装 husky

```cmd
  cnpm install husky --save-dev
```

+ 使用

```cmd
  // package.json 
  {
    // ...
    "husky": {
      "hooks": {
        "pre-commit": "npm run test:nowatch && npm run lint"
      }
    },
    // ...
  }
```
