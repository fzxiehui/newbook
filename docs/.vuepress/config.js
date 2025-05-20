import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'en-US',

  title: '葵花宝典',
  description: '普通又自信',

  theme: defaultTheme({
    logo: 'pri_assets/tom_and_jerry.png',

    navbar: ['/', '/get-started'],
    sidebar: [
      {
        "text": "简介",
        children: [
          "/get-started.md",
        ]
      },
      {
        "text": "计算机视觉",
        children: [
          "/cv/pillow.md",
          "/cv/opencv_base.md",
          "/cv/opencv_roi.md",
          "/cv/opencv_threshold.md",
          "/cv/opencv_filter.md",
          "/cv/opencv_morphology.md",
          "/cv/opencv_contour.md",
        ]
      },
      {
        "text": "python",
        children: [
          "/python/python.md",
        ]
      },
      {
        "text": "go",
        children: [
          "/go/go.md",
          "/go/project.md",
        ]
      },
      {
        "text": "网络与防火墙",
        children: [
          "/network/network.md",
          "/network/ipport.md",
          "/network/proxy.md",
          "/network/pack.md",
          "/network/arp.md",
          "/network/iptables.md",
          "/network/exp_router.md",
        ]
      },
      {
        "text": "开发与运维",
        children: [
          "/devops/science.md",
          "/devops/serve.md",
          "/devops/devops.md",
          "/devops/vuepress.md",
        ]
      },
		]
  }),

  bundler: viteBundler(),
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
