# vuepress(文档编写)

:::tip 提示
演示`vuepress`版本为`v2.0.0-rc.20`
:::

## 创建项目

```shell
npm init vuepress demo
```

## 创建资源目录

```shell
mkdir docs/pri_assets
```

## 创建Makefile文件

:::tip 提示
`update`内容根据需求修改
:::

```Makefile
.PHONY: help build run update

build:
	npm run docs:build
	cp -r docs/pri_assets docs/.vuepress/dist/

run:
	npm run docs:dev

update:
	cp -r ./docs/.vuepress/dist/* ~/http/demo/
```

## 修改改配置文件中的文档信息

:::tip
- `title` 标题
- `description` 描述
- `logo` 左上角图标
- `navbar` 右上角导航
- `sidebar` 进入文档后,左侧导航
:::

```js{8-9,12,14-22}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: '葵花宝典',
  description: '不仅要赢还要赢两次',

  theme: defaultTheme({
    logo: 'pri_assets/tom_and_jerry.png',

    navbar: ['/', '/get-started'],
    sidebar: [
      {
        "text": "文档",
        children: [
          "/vuepress/vuepress.md",
        ]
      },
    ]
  }),

  bundler: viteBundler(),
})
```

## 添加图形插件

- 参考文档

    - [插件官网](https://plugin-md-enhance.vuejs.press/zh/)
    - [mermaid](https://mermaid.js.org/intro/)
    - [plantuml](https://plantuml.com/zh-dark/sequence-diagram)

- 安装

> 如果版本冲突可以加`--force`参数

```shell
npm i -D vuepress-plugin-md-enhance
```

- 配置

```js{1,8-18}
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'en-US',

  ...

  plugins: [
    mdEnhancePlugin({
      // 你的选项
      // chartjs: true, // npm i -D chart.js
      // echarts: true, // npm i -D echarts
      // markmap: true, // npm i -D markmap-lib markmap-toolbar markmap-view
      // mermaid: true, // npm i -D mermaid
      plantuml: true,
      // flowchart: true, // npm i -D flowchart.ts
    }),
  ],
})
```
