import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { appName, primaryColor } from './src/settings/index.mjs'

export default defineUniPages({
  // easycom 组件自动引入配置
  easycom: {
    // 是否自动扫描组件
    autoscan: true,
    // 自定义组件匹配规则
    custom: {
      // wot-design-uni 组件库的匹配规则，例如 wd-button 会自动引入对应组件
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      // z-paging 分页组件的匹配规则，排除 refresh 和 load-more 子组件
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // 主包页面配置
  pages: [
    {
      path: 'pages/index/index', // 页面路径
      aliasPath: '/index', // 路由别名，可以通过 /index 访问
      name: 'index', // 页面名称，用于路由跳转
      style: {
        navigationStyle: 'custom', // 导航栏样式：custom 表示自定义导航栏
        navigationBarTitleText: '主页', // 导航栏标题文字
      },
    },
    {
      path: 'pages/index/example/index',
      aliasPath: '/example',
      name: 'example',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '示例',
      },
    },
    {
      path: 'pages/index/user/index',
      aliasPath: '/user',
      name: 'user',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '我的',
      },
    },
    {
      path: 'pages/login/index',
      aliasPath: '/login',
      name: 'login',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '登录',
      },
    },
  ],
  // 分包配置，用于优化小程序包体积
  subPackages: [
    {
      root: 'pages/common', // 分包根目录
      pages: [
        {
          path: 'web-view/index',
          aliasPath: '/web-view',
          name: 'web-view',
          style: {
            navigationBarTitleText: 'web-view',
            transparentTitle: 'auto', // 导航栏透明设置：auto 表示滑动自动显示/隐藏
          },
        },
        {
          path: 'rich-view/index',
          aliasPath: '/rich-view',
          name: 'rich-view',
          style: {
            navigationBarTitleText: 'rich-view',
          },
        },
      ],
    },
    {
      root: 'pages/tips',
      pages: [
        {
          path: 'middleware/index',
          aliasPath: '/tips-middleware',
          name: 'tips-middleware',
          meta: {
            middleware: ['test'], // 页面级中间件配置，指定该页面需要执行的中间件
          },
          style: {
            navigationBarTitleText: '中间件',
          },
        },
      ],
    },
    {
      root: 'pages/template',
      pages: [
        {
          path: 'paging/index',
          aliasPath: '/template-paging',
          name: 'template-paging',
          style: {
            navigationBarTitleText: '通用列表',
          },
        },
        {
          path: 'table/index',
          aliasPath: '/template-table',
          name: 'template-table',
          style: {
            navigationBarTitleText: '表单提交',
          },
        },
        {
          path: 'map/index',
          aliasPath: '/template-map',
          name: 'template-map',
          style: {
            navigationBarTitleText: '地图服务',
          },
        },
        {
          path: 'app-capability/index',
          aliasPath: '/template-app-capability',
          name: 'template-app-capability',
          style: {
            navigationBarTitleText: 'App 能力',
          },
        },
        {
          path: 'typewriter/index',
          aliasPath: '/template-typewriter',
          name: 'template-typewriter',
          style: {
            navigationBarTitleText: '打字机效果',
          },
        },
      ],
    },
    {
      root: 'pages/personal',
      pages: [
        {
          path: 'index',
          aliasPath: '/personal',
          name: 'personal',
          style: {
            navigationBarTitleText: '个人资料',
            transparentTitle: 'auto',
          },
        },
      ],
    },
    {
      root: 'pages/contact',
      pages: [
        {
          path: 'index',
          aliasPath: '/contact',
          name: 'contact',
          style: {
            navigationBarTitleText: '联系我们',
            transparentTitle: 'auto',
          },
        },
      ],
    },
    {
      root: 'pages/preference',
      pages: [
        {
          path: 'index',
          aliasPath: '/preference',
          name: 'preference',
          style: {
            navigationBarTitleText: '偏好设置',
          },
        },
      ],
    },
    {
      root: 'pages/feedback',
      pages: [
        {
          path: 'index',
          aliasPath: '/feedback',
          name: 'feedback',
          style: {
            navigationBarTitleText: '意见反馈',
            transparentTitle: 'auto',
          },
        },
      ],
    },
  ],
  // 底部 TabBar 配置
  tabBar: {
    color: '#999999', // 未选中时的文字颜色
    selectedColor: primaryColor, // 选中时的文字颜色
    backgroundColor: '#FFFFFF', // TabBar 背景色
    list: [
      {
        iconPath: 'static/images/tabbar/home.png', // 未选中时的图标路径
        selectedIconPath: 'static/images/tabbar/home-active.png', // 选中时的图标路径
        pagePath: 'pages/index/index', // 页面路径
        text: '主页', // TabBar 按钮文字
      },
      {
        iconPath: 'static/images/tabbar/example.png',
        selectedIconPath: 'static/images/tabbar/example-active.png',
        pagePath: 'pages/index/example/index',
        text: '示例',
      },
      {
        iconPath: 'static/images/tabbar/user.png',
        selectedIconPath: 'static/images/tabbar/user-active.png',
        pagePath: 'pages/index/user/index',
        text: '我的',
      },
    ],
  },
  // 全局样式配置，应用于所有页面
  globalStyle: {
    navigationBarTitleText: appName, // 导航栏标题文字
    navigationBarBackgroundColor: '#FFFFFF', // 导航栏背景颜色
    navigationBarTextStyle: 'black', // 导航栏标题颜色，仅支持 black/white
    backgroundColor: '#F8F8F8', // 窗口的背景色
  },
})
