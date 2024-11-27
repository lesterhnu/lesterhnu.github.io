import { defineConfig } from 'vitepress'
import { La51Plugin } from 'vitepress-plugin-51la'
// 导入主题的配置
import { blogTheme } from './blog-theme'
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  vite:{
    plugins:[
      La51Plugin({
        id: '3KRTFWGFykkR9qpU',
        ck: '3KRTFWGFykkR9qpU',
        apply: 'all'
      }),
      // AutoSidebar({
      //   ignoreList: ["README.md"], // 忽略文件夹
      //   path: "docs", // 侧边栏扫描路径(也就是所有笔记所在的目录)
      //   ignoreIndexItem: true, // 忽略首页
      //   collapsed: false, // 是否启用折叠，默认为false展开
      //   deletePrefix: "docs", // 删除路径前缀
      //   sideBarResolved(data) {
      //     // 接收完整的侧边栏对象以进行自定义修改
      //     return data;
      //   },
      //   sideBarItemsResolved(data) {
      //     // 接收完整的侧边栏 subItem 对象以进行自定义修改
      //     return data;
      //   },
      //   beforeCreateSideBarItems(data) {
      //     // 获取生成侧边栏子项之前扫描的文件名列表。如果要对侧边栏数据进行排序，建议使用
      //     return data;
      //   },
      //   titleFromFile: true, // 从文件中提取标题
      //   // You can also set options to adjust sidebar data
      //   // see option document below
      // }),
    ]
  },
  ignoreDeadLinks: true,
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base:"/zerg-blog/",
  base:"/",
  lang: 'zh-cn',
  title: "lesterhnu's Blog",
  description: 'blog',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      { text:'杂谈',link:'/zatan'},
      { text: '关于作者', link: '/aboutme.html' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lesterhnu'
      }
    ]
  }
})
