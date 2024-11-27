// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  oml2d: {
    mobileDisplay: true,
    models: [
      // {
      //   path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json'
      // },
      {
        path: "https://model.oml2d.com/HK416-1-normal/model.json"
      }
    ]
  },
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // markdown 图表支持（会增加一定的构建耗时）
  // mermaid: true

  // 页脚
  footer: {
    version:false,
    // message: '字段支持配置为HTML内容',//配置多条可以配置为数组,
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    // copyright: 'MIT License | 粥里有勺糖',
    icpRecord: {
      name: '豫ICP备2021032127号-1',
      link: 'https://beian.miit.gov.cn/'
    },
    securityRecord: {
      name: '豫公网安备41010502005240号',
      link: 'https://www.beian.gov.cn/portal/index.do'
    },
  },

  // 主题色修改
  // themeColor: 'el-blue',
  themeColor:'vp-default',

  // 文章默认作者
  author: 'lesterhnu',

  // 友链
  friend: [
    // {
    //   nickname: '粥里有勺糖',
    //   des: '你的指尖用于改变世界的力量',
    //   avatar:
    //     'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
    //   url: 'https://sugarat.top',
    // },
    // {
    //   nickname: 'Vitepress',
    //   des: 'Vite & Vue Powered Static Site Generator',
    //   avatar:
    //     'https://vitepress.dev/vitepress-logo-large.webp',
    //   url: 'https://vitepress.dev/',
    // },
  ],
  backToTop: {
    // 自定义触发高度
    top: 450,
    // 自定义图标
    icon: ''
  },
  // 公告
  popover: {
    title: '公告',
    body: [
      // { type: 'text', content: '👇公众号👇---👇 微信 👇' },
      // {
      //   type: 'image',
      //   src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp'
      // },
      // {
      //   type: 'text',
      //   content: '欢迎大家加群&私信交流'
      // },
      // {
      //   type: 'text',
      //   content: '文章首/文尾有群二维码',
      //   style: 'padding-top:0'
      // },
      // {
      //   type: 'button',
      //   content: '作者博客',
      //   link: 'https://sugarat.top'
      // },
      // {
      //   type: 'button',
      //   content: '加群交流',
      //   props: {
      //     type: 'success'
      //   },
      //   link: 'https://theme.sugarat.top/group.html',
      // }
    ],
    duration: 0
  },
})

export { blogTheme }
