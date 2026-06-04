# Vite Uniapp Template

[![Gitee](https://gitee.com/viarotel-org/vite-uniapp-template/badge/star.svg?theme=dark)](https://gitee.com/viarotel-org/vite-uniapp-template)
[![GitHub](https://img.shields.io/github/stars/viarotel-org/vite-uniapp-template?label=Github%20Stars)](https://github.com/viarotel-org/vite-uniapp-template)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/viarotel-org/vite-uniapp-template)

🚀 **以实用为先的 uni-app 起手模板。** [查看演示](https://vite-uniapp-template.netlify.app/)

该模板为您的 uniapp 项目提供了一个强大的起点，集成了现代化工具和精心设计的约定，以简化开发流程。

## 核心特性

- 💪 优化的资源管理: 无缝切换本地与远程静态资源。这对于克服小程序包大小限制至关重要。
- 📦 智能分包: 清晰直观的 pages 目录结构，结合便捷的配置，轻松实现基于功能的分包。
- 🛣 类 VueRouter 路由: 使用 [uniapp-router-next](https://www.npmjs.com/package/uniapp-router-next) 并进行了增强，如拦截器、中间件和路由别名，提供熟悉的 API 体验。
- 📊 Pinia 状态管理: 借助 [Pinia](https://pinia.vuejs.org/) 实现强大且直观的应用状态管理。
- ⚡️ 现代化请求工作流: 采用 [Alova](https://alova.js.org/)，一个下一代请求库，简化数据获取流程。
- 👇 内置 Z-Paging: 集成了高性能、易用的下拉分页组件，轻松实现下拉刷新和上拉加载更多等功能。
- 💅 Unocss 原子化 CSS: 使用原子化 CSS 类名书写规范，即使在小程序环境下也完美支持。
- 🎨 轻量级 UI 与主题化: 集成 [wot-design-uni](https://netlify.wot-design-uni.cn/)，提供更轻量的 UI，满足绝大多数业务场景，并支持主题定制。
- 📝 专注 JavaScript: 使用 JavaScript 构建，在常规业务场景或团队技能水平差异较大时，确保更平滑的开发体验。

## 快速上手

### 1. 克隆项目

```shell
git clone https://github.com/viarotel-org/vite-uniapp-template.git
cd vite-uniapp-template
```

### 2. 安装依赖

> 请使用 node@20.0 及以上版本。

推荐使用 `pnpm` 安装依赖。当前未在 `npm` 或 `yarn` 环境下进行充分测试，可能存在依赖不兼容或版本对齐问题。

```shell
pnpm install
```

### 3. 运行项目

#### 使用代码编辑器 (例如 VS Code)

在项目根目录下执行以下命令：

```shell
# H5 平台
pnpm dev:h5

# 微信小程序
pnpm dev:mp-weixin

# Android App
pnpm dev:app-android

# 更多平台请参阅 package.json 中的 `scripts` 部分。
```

#### 使用 HBuilderX

- 将项目文件夹拖拽到 HBuilderX 中。
- 确保已安装依赖 (如果尚未安装，请在项目根目录运行 `pnpm install`)。
- 点击项目 `/src` 目录下的任意文件。
- 在 HBuilderX 菜单中，导航至“运行”并选择您的目标运行环境。

## 功能示例

### 创新的分包结构

传统分包结构：

```
src/
├── pages/           # 主包页面
│   └── index.vue
├── pages-user/      # 用户相关分包
│   ├── profile.vue
│   └── settings.vue
└── pages-shop/      # 商城相关分包
    ├── list.vue
    └── detail.vue
```

vite-uniapp-template 的分包结构：

```
src/
└── pages/
    ├── index/           # 主包页面（必需）
    │   ├── index.vue    # 首页（必需）
    │   ├── category.vue # Tab页面
    │   └── mine.vue     # Tab页面
    ├── user/            # 用户分包
    │   ├── login.vue
    │   └── profile.vue
    └── shop/            # 商城分包
        ├── list.vue
        └── detail.vue
```

分包配置示例：

```javascript
// pages.config.js
export default {
  // 主包配置
  pages: [
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: '首页',
      },
    },
    {
      path: 'pages/index/category',
      style: {
        navigationBarTitleText: '分类',
      },
    },
  ],

  // 分包配置
  subPackages: [
    {
      root: 'pages/user',
      pages: [
        {
          path: 'login',
          style: { navigationBarTitleText: '登录' },
        },
      ],
    },
  ],
}
```

### 静态资源处理

```bash
# 本地开发模式 (.env.development)
VITE_ASSETS_MODE=local

# 生产环境 (.env.production)
VITE_ASSETS_MODE=remote
VITE_ASSETS_CDN=https://your-cdn.com/assets
```

使用示例：

```html
<image src="~@assets/images/logo.png" />
<!-- 开发环境: /src/assets/images/logo.png -->
<!-- 生产环境: https://your-cdn.com/assets/images/logo.png -->
```

更多配置请参考 `vite.config.plugins.js` 中的 `useAssetPathResolver` 插件

### 全局主题定制

由 `unocss-preset-shades` 提供支持。轻松应用您的主题颜色：

```html
<div class="text-primary-500"></div>

<div class="bg-primary-500"></div>

<!-- 仅在小程序中生效，具体使用方法请参考 [unocss-preset-uni](https://github.com/uni-helper/unocss-preset-uni)  -->
<div class="uni-mp:border uni-mp:border-primary-500"></div>
```

### 页面导航

与 Vue Router 类似，您可以通过编程方式进行导航：

#### 在模板中：

```javascript
// 跳转到登录页并携带查询参数
this.$Router.push({
  path: '/login',
  query: {
    id: 'someId',
  },
})

// 获取路由参数
const userId = this.$Route.query.id

// 替换当前页面
this.$Router.replace('/dashboard')

// 关闭所有页面并跳转
this.$Router.replaceAll('/home')
```

#### 在脚本中 (支持自动导入)：

```javascript
// 已预置自动导入该部分可省略
// import { useRoute, useRouter } from '$uni-router'

const router = useRouter()
const route = useRoute()

router.push('/settings')
console.log(route.query)
```

#### 路由别名 (`pages.config.js`)：

```javascript
const aliasConfig = {
  path: 'pages/login/index', // 实际路径
  aliasPath: '/login', // 别名
}
```

### 路由守卫

实现导航守卫以处理权限验证等逻辑：

```javascript
// 示例: src/permission/login/index.js
router.beforeEach((to, from, next) => {
  // 在此编写你的逻辑 (例如：检查用户是否已认证)
  // if (to.path === '/profile' && !isAuthenticated) {
  //   next('/login');
  // } else {
  //   next();
  // }
  next() // 默认继续导航
})

router.afterEach((to, from) => {
  // 导航后逻辑
})
```

> 具体实现请参阅 `src/permission` 目录。

### 路由中间件

对特定路由应用中间件以实现精细化控制。

#### 使用中间件 (`pages.config.js`)：

```javascript
// 对用户页面应用 'test' 中间件
const pageConfig = {
  path: '/pages/user/index',
  aliasPath: '/user',
  meta: {
    middleware: ['test'],
  },
}
```

#### 定义中间件：

中间件代码结构与路由守卫基本一致，但仅拦截在其声明的路由中配置的中间件。

```javascript
// 示例: src/permission/test/index.js
import { defineMiddleware } from '$uni-router'
import testMiddlewareLogic from './test/index.js'

export default (app, router) => {
  defineMiddleware('test', testMiddlewareLogic, { router, app })
}
```

## 面试准备：uni-app App / Vue3 / 工程化 / React 18

下面内容围绕岗位要求整理，适合面试前快速复盘。

### 1. uni-app App 多端统一开发

#### 核心能力

- 理解 uni-app 的“一套代码，多端运行”：H5、小程序、App 端通过统一的 Vue 写法和条件编译输出到不同平台。
- 熟悉 `pages.json`、`manifest.json`、`App.vue`、`main.js` 等核心文件的职责。
- 掌握页面生命周期和组件生命周期的区别，例如 `onLoad`、`onShow`、`onHide`、`onUnload` 与 Vue 的 `onMounted`、`onUnmounted`。
- 能处理多端差异：API 支持差异、样式兼容、单位适配、导航栏、安全区、权限、文件系统、扫码、定位、相机、蓝牙、推送等。
- 熟悉条件编译：

```javascript
// #ifdef APP-PLUS
// App 端逻辑
// #endif

// #ifdef MP-WEIXIN
// 微信小程序逻辑
// #endif

// #ifdef H5
// H5 逻辑
// #endif
```

#### 项目结构与职责

面试中可以把 uni-app 项目拆成“配置层、入口层、页面层、业务层、平台适配层”来讲：

- `pages.json`：配置页面路径、窗口样式、tabBar、分包、页面级导航栏，是 uni-app 路由和页面注册的核心。
- `manifest.json`：配置应用名称、AppID、App 权限、SDK、图标、启动页、小程序 AppID、平台发行配置。
- `App.vue`：应用生命周期入口，适合做启动初始化、全局样式、登录态恢复、版本检查、全局事件监听。
- `main.js`：创建 Vue 应用，挂载 Pinia、路由、UI 组件库、全局方法、全局指令等。
- `api`：封装请求方法、接口模块、错误处理、token 注入和登录过期逻辑。
- `store`：维护跨页面共享状态，例如用户、权限、主题、缓存数据。
- `hooks`：沉淀可复用业务逻辑，例如分页、权限申请、WebView 通信、倒计时、表单校验。
- `utils` / `adapter`：存放工具函数和平台适配逻辑，避免页面里到处写条件编译。

#### 生命周期与页面通信

- 页面生命周期适合处理页面级行为：`onLoad` 接收路由参数，`onShow` 刷新页面状态，`onHide` 暂停轮询或音视频，`onUnload` 释放页面资源。
- Vue 生命周期适合处理组件级行为：`onMounted` 初始化组件 DOM 相关逻辑，`onUnmounted` 清理组件内定时器、事件监听和订阅。
- 页面间传参常见方式：路由 query、Pinia 全局状态、事件总线、缓存、WebView `postMessage`。
- 返回上一页刷新数据时，优先考虑 `onShow` 结合状态标记，复杂场景可以用事件通知，不建议依赖页面栈硬编码。

#### 小程序发布、上架与审核流程

小程序不是“打包完就上线”，面试里要能说清楚从开发到发布的完整链路：

1. **注册与主体认证**：在微信公众平台注册小程序，完成主体信息、管理员、开发者权限配置。企业主体通常还要完成微信认证。
2. **基础配置**：配置小程序名称、头像、介绍、服务类目、隐私协议、用户协议、服务器域名、业务域名、上传下载域名、WebView 业务域名。
3. **备案要求**：按当前微信平台要求，面向中国大陆用户提供服务的小程序通常需要完成小程序备案；涉及网站、域名、经营性业务时，还要关注 ICP 备案和行业资质。
4. **开发与联调**：通过 HBuilderX、微信开发者工具或 CI 上传开发版本，配置体验成员，生成体验版二维码给产品、测试、后端联调。
5. **提审前自查**：确认首页可访问、核心路径可体验、登录授权可完成、测试账号可用、无空白页、无 mock 数据、无诱导分享、无违规内容。
6. **提交审核**：在微信公众平台版本管理中选择开发版本，填写版本说明、功能页面、测试账号、服务类目对应资质，然后提交审核。
7. **审核反馈处理**：如果被驳回，重点看拒绝原因、截图和规则条款，修复后重新上传代码并再次提交；不要只改文案不改实际问题。
8. **发布上线**：审核通过后需要手动发布，发布后才会成为线上正式版本。重要版本可以灰度或分阶段观察数据。
9. **上线后验证**：用正式环境账号验证登录、支付、分享、订阅消息、WebView、接口域名、埋点和错误监控。

常见审核风险点：

- 服务类目与实际功能不一致，或者缺少类目资质。
- 隐私协议没有覆盖实际收集的信息，例如手机号、定位、相册、摄像头、设备信息。
- 页面功能不可用，审核人员无法登录或无法进入核心流程。
- 出现测试数据、占位图、空白页、报错弹窗、未备案域名或未配置合法域名。
- 涉及支付、金融、医疗、教育、社交、内容发布、直播、游戏等敏感能力，但资质或说明不足。
- 诱导分享、诱导关注、虚假宣传、绕过平台支付规则、收集非必要用户信息。

可以这样回答：

> 小程序发布我会先确认主体、类目、资质、备案、隐私协议和服务器域名是否完整，再通过开发工具上传体验版给测试验证。提审前会准备测试账号、核心路径说明和版本说明，避免审核人员进不去页面。审核通过后还需要手动发布，发布后再用正式环境做登录、支付、分享、订阅消息和接口域名验证。遇到驳回时，我会按拒绝原因定位是资质、内容、权限、隐私还是功能可用性问题，而不是盲目反复提审。

#### App 端重点

- App 端运行在 `App-Plus` 环境，底层依赖 5+ Runtime，可以通过 `plus.*` 访问原生能力。
- 常见 App 能力包括：权限申请、文件读写、原生导航栏、状态栏、扫码、定位、相册、相机、剪贴板、震动、拨号、外链、网络状态、屏幕亮度、屏幕常亮、分享、支付、推送、WebView 通信。
- Android 和 iOS 存在权限、系统 API、审核规则、后台限制、文件路径、推送机制等差异，面试中要能说明如何识别差异并把差异收敛到统一封装中。

```javascript
// #ifdef APP-PLUS
plus.runtime.getProperty(plus.runtime.appid, (info) => {
  console.log('当前 App 版本', info.version)
})
// #endif
```

#### App 能力示例页

本项目在 `src/pages/template/app-capability/index.vue` 增加了一个 App 能力示例页，入口在“示例 -> 业务模板 -> App 能力”。它覆盖了面试和业务中最常见的原生能力：

- **权限类**：相机、定位、文件权限，Android 使用运行时权限，iOS 通过调用能力触发系统授权。
- **媒体与传感类**：扫码、定位、相册选择、拍照、震动。
- **文件与系统 UI**：App 私有目录文件读写、状态栏切换、打开 App 系统设置页。
- **系统交互**：剪贴板读写、拨号、打开外链。
- **设备状态**：网络类型、屏幕亮度、屏幕常亮、设备信息。

关键实现思路是“uni 标准 API 优先，App-Plus 能力增强，非 App 平台降级”：

```javascript
function getAppOSName() {
  // #ifdef APP-PLUS
  return plus.os.name
  // #endif

  return ''
}

function requestAndroidPermissions(permissions) {
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    plus.android.requestPermissions(
      permissions,
      (result) => {
        resolve({
          granted: result.granted || [],
          deniedPresent: result.deniedPresent || [],
          deniedAlways: result.deniedAlways || [],
        })
      },
      reject,
    )
    // #endif
  })
}
```

高精度定位示例：

```javascript
function getLocationOptions() {
  const options = {
    type: 'gcj02',
    isHighAccuracy: true,
    highAccuracyExpireTime: 8000,
    geocode: true,
  }

  // #ifdef APP-PLUS
  return {
    ...options,
    provider: plus.os.name === 'Android' ? 'system' : 'amap',
    timeout: 15000,
  }
  // #endif

  return options
}

uni.getLocation({
  ...getLocationOptions(),
  success: (result) => {
    console.log(result.latitude, result.longitude, result.accuracy)
  },
})
```

#### uni-app 集成高德地图

本项目还增加了一个地图示例页：`src/pages/template/map/index.vue`，入口在“示例 -> 业务模板 -> 地图”。

如果要在 uni-app 里把“高德地图展示 + 当前定位 + 路径规划”串起来，建议把能力拆成 3 层，而不是全部堆在页面里：

- **地图展示层**：使用 uni-app 的 `<map>` 组件负责地图渲染、marker、polyline。
- **定位层**：使用 `uni.getLocation` 获取当前位置，统一返回 `gcj02` 坐标。
- **路线服务层**：使用高德 Web 服务 API 查询步行、骑行、驾车路径，再把返回的 polyline 映射给 `<map>`。

先区分 3 类 Key，不要混用：

- **H5 地图展示 Key**：用于 H5 下 `<map>` 组件渲染高德底图，配置在 `manifest.json -> h5.sdkConfigs.maps.amap.key`。
- **App 原生地图 Key**：用于 App 端原生地图 SDK，配置在 `manifest.json -> app-plus.distribute.sdkConfigs.maps.amap`，Android 和 iOS 正式项目通常需要分别申请。
- **Web 服务 Key**：用于调用高德路线规划、逆地理、POI 搜索等 HTTP 接口，建议单独配置到接口层。

H5 地图展示配置示例：

```json
{
  "h5": {
    "sdkConfigs": {
      "maps": {
        "amap": {
          "key": "你的高德 H5/JS Key"
        }
      }
    }
  }
}
```

如果还要支持 App 原生地图，一般会补这一段：

```json
{
  "app-plus": {
    "distribute": {
      "sdkConfigs": {
        "maps": {
          "amap": {
            "appkey_android": "你的 Android Key",
            "appkey_ios": "你的 iOS Key"
          }
        }
      }
    }
  }
}
```

地图展示本身并不复杂，核心是把中心点、marker、路线折线都绑定到 `<map>`：

```vue
<map
  class="size-full"
  :latitude="location.latitude"
  :longitude="location.longitude"
  :scale="scale"
  :markers="markers"
  :polyline="polyline"
  show-location
/>
```

几个关键点：

- `show-location` 只是显示系统定位蓝点，不会自动帮你把地图中心切过去。
- 真正控制地图中心的是 `latitude` 和 `longitude`，定位成功后要更新这两个值。
- `map` 组件用于展示地图，`uni.getLocation` 只是取坐标，两者职责不同。
- 地图展示坐标建议统一用 `gcj02`，这样才能直接给 `<map>`、`uni.openLocation`、路线规划结果复用。

当前项目的定位写法和地图页保持一致：

```javascript
function getLocationOptions() {
  const options = {
    type: 'gcj02',
    isHighAccuracy: true,
    highAccuracyExpireTime: 8000,
    geocode: true,
  }

  // #ifdef APP-PLUS
  return {
    ...options,
    provider: plus.os.name === 'Android' ? 'system' : 'amap',
    timeout: 15000,
  }
  // #endif

  return options
}
```

路径规划建议单独放在 `src/api/map.js` 这类接口文件里。项目里当前沿用的是高德 `v3/direction/*` 接口来查步行、骑行、驾车路线；如果是新项目，也可以直接评估官方更新的路径规划 2.0：

```javascript
const AMAP_KEY = '你的高德 Web 服务 Key'
const BASE_URL = 'https://restapi.amap.com/v3'

function requestAmapRoute(path, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${path}`,
      data: {
        key: AMAP_KEY,
        ...data,
      },
      success: resolve,
      fail: reject,
    })
  })
}
```

调用时，起点终点要传高德要求的 `longitude,latitude` 字符串，而不是对象：

```javascript
const origin = `${location.longitude},${location.latitude}`
const destination = `${target.longitude},${target.latitude}`

const res = await getWalkingRoute(origin, destination)
```

高德返回的路线步骤里通常会带 polyline，例如：

```text
121.473701,31.230416;121.475200,31.232810
```

页面层需要把它拆成 `<map>` 可识别的数据结构：

```javascript
const points = []

steps.forEach((step) => {
  if (!step.polyline)
    return

  step.polyline.split(';').forEach((point) => {
    const [longitude, latitude] = point.split(',')
    points.push({
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    })
  })
})
```

再绑定给 `polyline`：

```javascript
const polyline = computed(() => [
  {
    points,
    color: '#028d71',
    width: 6,
    arrowLine: true,
  },
])
```

这就是“显示路径规划”的核心原理：**路线不是地图自动算出来的，而是你调高德路线 API，拿到折线点后再画回 `<map>`。**

#### 地图能力常见知识点

- **坐标系别混**：`wgs84` 常用于 GPS 原始坐标，`gcj02` 才能直接给国内地图展示。地图偏移、marker 跑偏，第一检查项就是坐标系。
- **Key 别混**：H5 地图展示 Key、App SDK Key、Web 服务 Key 是不同用途，很多“地图空白”或“接口报错”本质上就是 Key 类型配错。
- **定位失败要有降级**：用户拒绝授权、浏览器不支持、真机无权限时，页面不要白屏，至少保留一个默认中心点和提示文案。
- **路径规划有配额和失败场景**：接口限流、Key 权限不足、起终点太近、跨城、服务商策略变化，都会导致返回空路线或状态码异常。
- **隐私合规要补齐**：涉及定位能力时，隐私协议、权限说明、用途说明、系统权限弹窗文案都要同步更新。
- **App 端要补原生权限**：Android 至少要关注定位权限声明和运行时授权；iOS 还要配置对应的权限说明。
- **路线展示不等于导航**：当前项目展示的是“路径规划结果 + 地图折线”，如果要做到真实语音导航、转向播报、后台持续导航，通常要接更完整的导航 SDK 或原生能力。

#### 还能继续扩展什么

- **逆地理编码**：把经纬度转成人类可读地址，例如“上海市黄浦区人民广场附近”。
- **周边 POI 搜索**：按关键字或分类搜索附近门店、服务站、充电点。
- **地图交互**：用 `uni.createMapContext` 做 `moveToLocation`、获取中心点、平移 marker、缩放地图。
- **调起外部地图**：使用 `uni.openLocation` 或高德 URI，在用户点击“开始导航”时拉起外部导航 App。
- **电子围栏 / 持续定位**：适合配送、巡检、打卡类业务，但要额外评估后台定位、耗电、审核和隐私合规。
- **轨迹回放**：把历史定位点绘制成折线或动画 marker，适合运动、物流、巡检场景。

官方文档建议优先看：

- uni-app `map` 组件：https://uniapp.dcloud.net.cn/component/map
- uni-app `uni.getLocation`：https://uniapp.dcloud.net.cn/api/location/location.html
- uni-app `uni.createMapContext`：https://uniapp.dcloud.net.cn/api/location/map.html
- 高德 Web 服务路径规划 2.0：https://lbs.amap.com/api/webservice/guide/api/newroute
- 高德 URI 路径规划：https://lbs.amap.com/api/uri-api/guide/travel/route

#### 货运业务场景梳理

货运类项目和普通电商、内容类 App 最大的区别，是它既有“交易链路”，也有“履约链路”，还会明显依赖定位、轨迹、司机状态、风控和线下交付。

常见参与角色：

- **货主 / 下单方**：创建运单、填写装货地和卸货地、选择车型、补充货物信息、支付运费。
- **司机 / 承运方**：接单、到达装货地、装货拍照、运输中上报位置、卸货签收、回传回单。
- **调度 / 客服**：抢单派单、司机分配、异常处理、催办、退款、改价。
- **财务 / 运营**：对账、开票、结算、补贴、活动、风控。

典型业务场景一般会覆盖：

- **即时货运**：同城拉货、搬家、城配，强调下单快、附近司机、路线和 ETA。
- **计划运输**：预约用车、专线运输、定时发车，强调时效、排班和合同价。
- **多点装卸**：一个运单多个装货点或多个卸货点，涉及路径优化和节点签收。
- **企业货运**：月结、合同价、组织架构、审批流、对公发票、司机白名单。
- **冷链 / 危化 / 大件**：额外依赖资质校验、温度上报、围栏、风控与合规留痕。

把一个货运项目抽象成系统模块，通常至少会有这些能力：

- **运单中心**：创建、报价、接单、取消、改派、拆单、合单、回单、签收。
- **定位与轨迹**：司机实时位置、预计到达、轨迹回放、电子围栏、异常停留。
- **调度与消息**：抢单大厅、派单、消息提醒、催办、客服会话。
- **支付与结算**：线上支付、司机收入、佣金、提现、月结、对账。
- **风控与留痕**：实名认证、车辆资质、装卸货拍照、签收拍照、投诉仲裁。
- **数据看板**：履约率、准时率、取消率、司机活跃度、区域热力、补贴 ROI。

#### 用 uni-app 开发货运业务

uni-app 很适合货运业务的一个原因，是货运通常天然有多端诉求：

- 用户端要覆盖 **App + 小程序 + H5**，方便获客和下单。
- 司机端通常更偏 **App**，因为需要稳定定位、推送、相机、录音、原生权限。
- 调度后台可以是 **Web 管理台**，移动端则做轻量调度和客服处理。

如果让我用 uni-app 落地一个货运项目，我一般会按下面的方式拆：

- **下单端**：货主创建运单、地址选择、车型选择、费用试算、支付。
- **司机端**：抢单大厅、待办任务、导航到点、上传回单、异常上报。
- **调度端**：运单看板、人工派单、司机地图、异常处理、催办。
- **平台层**：账号、权限、消息、支付、地图、上传、日志、埋点。

页面和模块通常会长成这样：

```text
src/
  pages/order/            运单创建、运单详情、运单轨迹
  pages/driver/           司机工作台、抢单大厅、任务列表
  pages/dispatch/         调度工作台、地图调度
  pages/message/          会话、通知、系统消息
  api/order.js            运单接口
  api/driver.js           司机接口
  api/map.js              地图和路径规划
  api/im.js               IM / 会话相关接口
  store/order.js          运单状态
  store/socket.js         实时连接状态
  native/location.js      持续定位封装
  native/push.js          推送封装
  native/audio.js         录音与播放封装
```

货运业务里，最容易被低估的是“状态机”。普通列表页切换状态还能靠接口字段硬写，货运不行，因为一个运单会经历很多明确节点：

```text
待报价 -> 待支付 -> 待接单 -> 待到达装货地 -> 装货中 -> 运输中 -> 待卸货 -> 待签收 -> 已完成
```

还会穿插：

```text
已取消 / 已拒单 / 异常中 / 仲裁中 / 已退款 / 部分完成
```

所以更稳的做法是：

- 页面只消费统一状态，不直接写大量魔法字符串。
- 用一个状态机或状态映射表统一控制按钮、文案、权限和下一步动作。
- 关键节点都做操作日志和时间戳留痕，方便客服追单和事后仲裁。

货运业务里，uni-app 端特别值得提前设计的能力有：

- **地图与定位**：下单选点、司机上报位置、轨迹回放、围栏告警、ETA。
- **拍照与文件上传**：装货照片、回单照片、车辆证件、异常凭证。
- **推送与实时消息**：新单提醒、改派提醒、异常通知、催办消息。
- **弱网与断点续传**：司机场景经常在地库、山区、高速，图片和事件上报要能重试。
- **权限与合规**：定位、相机、录音、通知权限都要有清晰触发时机和用途说明。

一个更贴近实战的架构思路是：

- **HTTP 请求**：拿静态数据和最终一致性数据，比如运单详情、账单、个人资料。
- **WebSocket / IM**：拿实时事件，比如新单、司机位置变化、会话消息、状态变更。
- **Push**：做离线唤醒和强提醒，比如司机离线时的新单通知、装货超时、签收异常。
- **本地缓存**：存最近运单、草稿单、离线上报队列、最近联系人。

#### 货运项目里推送、IM、音视频怎么选

货运不是所有实时能力都应该塞给同一种技术。更合理的是按语义拆：

- **Push**：负责“离线触达”和“系统通知”。
- **WebSocket / IM**：负责“在线实时消息”和“会话同步”。
- **音视频**：负责“录音上报、语音消息、视频留痕、视频通话、直播巡检”等能力。

很多项目失败，不是因为没有技术，而是错误地把 Push 当 IM，或者把 WebSocket 当离线消息通道。

#### uni-app 推送方案

如果是 uni-app 全端项目，优先看的就是官方 `uni-push 2.0`。DCloud 官方文档说明它是全端、云端一体的统一推送服务，支持 App、Web、小程序。另一个需要注意的点是，uni-app 官方文档也明确提到：`uni-push2.0` 在 Web、小程序和 App 非离线模式下底层基于 socket，如果业务还要自己建实时连接，应该使用 `socketTask`。这个点在货运项目尤其重要，因为你往往同时会有推送和 IM/实时位置链路。

推送在货运业务里一般适合这些场景：

- 新运单待抢单
- 调度改派
- 装货超时 / 卸货超时
- 支付成功 / 退款成功
- 企业月结审批结果
- 客服催办和异常处理结果

推荐的推送分层：

- **通知栏消息**：唤醒用户，适合“有新单”“有异常”“有待处理任务”。
- **透传消息**：适合 App 在线时刷新数据、同步角标、预拉取详情。
- **站内消息中心**：适合沉淀消息历史，避免用户错过通知后无处追溯。

推送落地建议：

- 客户端封装 `registerPush`、`bindPushToUser`、`unbindPush`，不要让页面直接操作推送 SDK。
- 服务端推送对象优先按用户、角色标签、车队标签等业务身份组织，不直接把设备级逻辑暴露给业务层。
- Push 到达后不要直接修改复杂业务状态，优先触发“拉最新详情”或“进入待同步队列”。
- iOS 通知权限申请时机要谨慎，不要应用一启动就弹窗，最好结合真实业务时机引导。

#### uni-app 即时通信方案

IM 在货运项目里一般不是“社交聊天”，而是“客服沟通 + 调度协同 + 运单会话”。

典型会话对象：

- 货主和客服
- 货主和司机
- 调度和司机
- 运单群聊：货主、司机、调度一起在同一运单会话里同步进度

如果你的项目已经用 **uniCloud + uni-id**，那优先评估官方 **uni-im**。DCloud 官方资料给出了基于 `uni-id-pages` 的集成方式，并明确依赖 `uni-push2.0` 做消息实时送达；对于不是基于 `uni-id-pages` 的项目，也提供了通过客户端 SDK `login` 方法接入的方式。对货运项目来说，这个方案很适合做：

- 内嵌客服
- 站内消息中心
- 运单会话
- 投诉与售后沟通

如果项目不是基于 uniCloud，或者已经有更成熟的企业 IM 选型，一般会在 uni-app 里接第三方 IM SDK / UIKit。当前官方资料里，至少有这些比较直接的 uni-app 方案：

- **融云 uni-app imkit**：官方文档说明它提供 `imkit-store` 和 `RCUIKit` 两部分，用于数据状态管理和 UI 组件封装，支持 Android、iOS、H5、微信小程序等平台。
- **环信 uni-app 方案**：官方文档说明它支持 Web、H5、微信/支付宝/QQ/百度/抖音小程序，以及 uni-app 编译的 Android、iOS，并覆盖文本、图片、语音、视频、文件、群组聊天室等基础 IM 能力。

如果你只需要“订单状态实时刷新”和“调度事件广播”，不要一上来就接完整 IM。一个更轻的方案是：

- 用 `uni.connectSocket` + `socketTask` 收实时事件
- 服务端维护用户在线态、心跳、重连和 ACK
- 会话记录、未读数、已读回执这些复杂功能先不要做成完整 IM

但如果你要做到以下任意 3 项以上，通常就不建议自己造 IM：

- 单聊 + 群聊
- 图片、语音、文件消息
- 未读数、已读回执、撤回、引用回复
- 漫游消息、历史记录、离线消息
- 多端同步、客服工作台、会话路由

这时直接选 `uni-im` 或成熟 IM 云厂商更稳。

#### uni-app 音频能力

音频能力在货运业务里也很常见，例如：

- 司机语音备注
- 客服语音回复
- 运单异常语音上报
- 到点播报、抢单提示音

uni-app 自带的基础能力已经够覆盖不少场景：

- **录音**：`uni.getRecorderManager()`。官方文档里给出了 `duration`、`sampleRate`、`format` 等参数，适合做语音消息、语音备注、短时录音。
- **播放**：`uni.createInnerAudioContext()`。官方文档列出了常见格式支持与错误码，适合做语音回放、提示音、系统播报。

这类基础音频能力通常建议你单独封装：

```javascript
export function createVoiceRecorder() {}
export function playVoice(url) {}
export function stopVoice() {}
```

页面层只关心“开始录音 / 停止录音 / 上传 / 播放”，不要直接散落一堆回调。

实战里要特别注意：

- 录音权限和通知权限一样，要有明确触发场景。
- 语音消息通常需要配合上传、转码、时长校验和失败重试。
- 音频实例用完必须释放，避免页面切换后继续占资源。
- 不同平台支持的音频格式不完全一样，尽量统一服务端转存或标准化输出。

#### uni-app 视频与直播能力

视频在货运业务里通常分 3 类：

- **普通视频**：装卸货录像、异常取证视频、培训视频、车队公告视频。
- **直播推拉流**：现场巡检、仓库值守、园区巡场、远程查验。
- **实时音视频 RTC**：司机和客服视频通话、调度远程核验、在线面审。

普通视频优先用 uni-app 官方 `video` 组件和 `uni.createVideoContext()`，这套足够覆盖：

- 视频播放
- 暂停 / 继续 / 全屏
- 短视频回放
- 运单凭证视频查看

直播推流 / 拉流则是另一套能力：

- `live-pusher`：官方文档定义为实时音视频录制，也就是直播推流。
- `live-player`：官方文档用于直播拉流。

但平台差异要看清：

- `live-pusher` 在 App 端可用，不过官方文档也明确提到，App 3.4.1 以前的 vue 页面需要条件编译走 `plus.video.LivePusher`，并推荐直播场景优先用 `nvue`。
- `live-player` 官方文档明确写了：**App 的实时音视频播放，不是使用 `live-player`，而是直接使用 `video` 组件。**

所以如果你做的是：

- **仓库巡检直播 / 现场拉流观看**：可以评估 `live-pusher` + `video/live-player` 这类直播链路。
- **双向通话、低延时互动**：不要拿 `video + socket` 硬拼，直接走 RTC SDK。

#### 实时音视频 RTC 的 native 对接方案

双向语音 / 视频通话，本质上不是普通的播放器能力，而是实时音视频能力。这个场景通常要接原生 SDK 或官方插件，不建议自己用 WebRTC 在 uni-app 多端硬抹平。

当前能直接参考的官方方案包括：

- **腾讯云 TRTC uni-app SDK**：腾讯云官方文档明确说明，`uni-app TRTC SDK` 是腾讯云实时音视频通讯在 uni-app 上的 SDK，提供实时音视频服务。
- 如果你已经使用某家 IM 厂商，也可以优先看它是否提供配套 CallKit / RTC 组件，避免 IM 和 RTC 分成两套用户体系和鉴权体系。

RTC 场景在货运里常见于：

- 司机和客服视频核验身份 / 货物
- 装货现场远程查验
- 车辆事故或异常远程取证
- 企业客户远程验货

这类 native 对接，一般建议按下面方式做：

- **JS 业务层**：只暴露 `joinRoom`、`leaveRoom`、`muteMic`、`switchCamera`、`startPreview` 等语义接口。
- **平台封装层**：对接 uni-app 插件、原生 SDK 或 UTS 插件。
- **服务端**：负责房间号、用户签名、鉴权 token、通话记录、录制回放地址。

不要在页面里直接写厂商 SDK 细节，因为后面你很可能会遇到：

- 平台差异
- 通话中断恢复
- 前后台切换
- 麦克风 / 相机权限弹窗
- 弱网重连
- 通话质量上报

#### 对接推送、IM、音视频时的工程建议

- **能力分层**：Push、Socket、IM、RTC 分开封装，不要混成一个“实时服务模块”。
- **统一账号体系**：用户 id、司机 id、客服 id、运单 id 必须能映射到 Push / IM / RTC。
- **统一消息模型**：站内消息、Push 透传、Socket 事件、IM 消息尽量共用事件类型定义。
- **做前后台切换策略**：前台走 Socket / IM 实时同步，后台依赖 Push 补偿。
- **做弱网策略**：位置、回单、语音、图片、视频都要考虑失败重试和离线上报。
- **做审计留痕**：货运业务不是只要“消息发出去”就完了，很多时候要追溯“谁在什么时候看到、说了什么、上传了什么”。

#### 货运实时能力的一套常见选型

一个比较稳、也比较常见的组合是：

- **地图 / 定位**：uni-app `map` + 高德 Web 服务 + App 原生定位增强
- **离线通知**：`uni-push 2.0`
- **在线事件**：`uni.connectSocket` / `socketTask`
- **客服 / 会话**：推断：如果项目基于 uniCloud，优先 `uni-im`；否则优先评估融云 / 环信 / 腾讯 IM 这类成熟方案
- **语音消息**：`uni.getRecorderManager` + `uni.createInnerAudioContext`
- **普通视频**：`video`
- **直播 / RTC**：推断：直播偏 `live-pusher` / `video`；双向低延时通话偏原生 RTC SDK，比如腾讯云 TRTC

官方文档建议补充阅读：

- uni-push 2.0：https://uniapp.dcloud.net.cn/unipush-v2.html
- uni-app WebSocket：https://uniapp.dcloud.net.cn/api/request/websocket.html
- uni-im：https://doc.dcloud.net.cn/uniCloud/uni-im.html
- uni-app 录音管理：https://uniapp.dcloud.net.cn/api/media/record-manager
- uni-app 音频播放：https://uniapp.dcloud.net.cn/api/media/audio-context.html
- uni-app `video` 组件：https://uniapp.dcloud.net.cn/component/video
- uni-app `live-pusher`：https://uniapp.dcloud.net.cn/component/live-pusher
- uni-app `live-player`：https://uniapp.dcloud.net.cn/component/live-player
- uni-app 原生插件：https://uniapp.dcloud.net.cn/plugin/native-plugin
- 腾讯云 TRTC uni-app SDK：https://web.sdk.qcloud.com/trtc/uniapp/doc/zh-cn/index.html
- 融云 uni-app IMKit：https://docs.rongcloud.cn/uni-app-imkit
- 环信 uni-app 全平台 IM 方案：https://doc.easemob.com/document/applet/uniapp.html

App 私有目录文件读写示例：

```javascript
plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
  fs.root.getFile('app-capability-demo.txt', { create: true }, (fileEntry) => {
    fileEntry.createWriter((writer) => {
      writer.onwrite = () => {
        console.log('文件写入成功', fileEntry.fullPath)
      }

      writer.write('App capability demo')
    })
  })
})
```

状态栏统一封装示例：

```javascript
export function setImmersiveStatusBar(options = {}) {
  const config = {
    frontColor: '#000000',
    backgroundColor: '#ffffff',
    ...options,
  }

  uni.setNavigationBarColor({
    frontColor: config.frontColor,
    backgroundColor: config.backgroundColor,
  })

  // #ifdef APP-PLUS
  plus.navigator.setStatusBarStyle(
    config.frontColor === '#ffffff' ? 'light' : 'dark',
  )
  plus.navigator.setStatusBarBackground(config.backgroundColor)
  // #endif
}
```

系统交互能力示例：

```javascript
uni.setClipboardData({ data: '业务内容' })
uni.vibrateShort({ type: 'medium' })
uni.makePhoneCall({ phoneNumber: '10086' })
uni.getNetworkType({
  success: (result) => console.log(result.networkType),
})
uni.setKeepScreenOn({ keepScreenOn: true })
uni.setScreenBrightness({ value: 0.8 })
```

#### Android / iOS 差异与隔离方案

App 端面试经常会追问“Android 和 iOS 差异怎么处理”。回答时可以按“差异点 -> 封装方式 -> 兜底策略”展开。

- **权限差异**：Android 更强调运行时权限，例如相机、定位、存储、蓝牙、通知；iOS 更强调 `Info.plist` 权限描述、用户授权弹窗和隐私合规说明。处理方式是封装统一的 `requestPermission` 方法，内部按平台申请权限，并把“未授权、拒绝、永久拒绝、需要跳设置页”这些状态标准化。
- **系统 API 差异**：同一个能力在两端实现方式可能不同，例如文件选择、后台定位、蓝牙扫描、通知推送、分享、支付。处理方式是业务层只调用 `scanCode`、`chooseFile`、`openSetting` 这类语义化方法，平台差异放到 `adapter` 或 `service` 层。
- **审核规则差异**：iOS 审核更关注隐私声明、权限用途、支付方式、后台能力、热更新边界；Android 应用市场更关注权限合规、SDK 合规、隐私政策、加固和上架包规范。处理方式是在需求阶段就确认权限和 SDK 是否必要，避免为了方便引入过重或不合规的能力。
- **后台能力差异**：Android 的后台服务、保活、厂商推送差异较多；iOS 后台能力受系统限制更严格，需要声明后台模式并符合真实使用场景。处理方式是不要假设两端后台行为一致，关键流程要设计服务端补偿、前台恢复刷新和失败重试。
- **文件系统差异**：Android 和 iOS 的沙盒路径、外部存储访问、相册文件、临时文件清理策略不同。处理方式是统一文件读写、缓存目录、临时目录、上传前转换逻辑，页面不直接拼接本地路径。
- **UI 与交互差异**：状态栏、安全区、返回手势、键盘弹起、软键盘遮挡、导航栏高度在两端表现不同。处理方式是封装布局变量和安全区处理，复杂页面在真机分别验证。

一个比较稳的封装思路：

```javascript
export function getPlatform() {
  // #ifdef APP-PLUS
  return plus.os.name === 'iOS' ? 'ios' : 'android'
  // #endif

  return 'unknown'
}

export async function requestCameraPermission() {
  const platform = getPlatform()

  if (platform === 'android') {
    // Android: 处理运行时权限、永久拒绝、跳转设置页
    return requestAndroidPermission('android.permission.CAMERA')
  }

  if (platform === 'ios') {
    // iOS: 处理系统授权状态和 Info.plist 权限描述
    return requestIOSPermission('camera')
  }

  return { granted: false, reason: 'unsupported-platform' }
}
```

面试表达可以这样说：

> 我一般不会把 Android/iOS 判断散落在页面里，而是先把能力抽象成业务语义，比如获取定位、选择文件、扫码、申请相机权限。页面只调用统一方法，方法内部再根据 `APP-PLUS`、`plus.os.name` 或插件能力分发到 Android/iOS 实现。返回值也会标准化，例如成功、用户拒绝、永久拒绝、系统不支持、需要跳设置页。这样页面逻辑稳定，平台差异集中在 adapter 层，后续替换插件或补兼容也不会影响业务页面。

#### App 打包、上架与审核流程

App 端要能说明“开发包、测试包、正式包、应用市场审核”的区别：

- **开发调试**：本地运行到 Android/iOS 真机，验证基础页面、权限、原生能力、WebView、网络请求和调试日志。
- **证书配置**：Android 需要 keystore 签名；iOS 需要 Apple Developer 账号、证书、描述文件、Bundle ID、Associated Domains 等配置。
- **云打包 / 本地打包**：uni-app 常见方式是 HBuilderX 云打包，也可以使用离线 SDK 做原生工程集成。面试里要能说明云打包省事，本地打包更适合深度原生定制。
- **环境区分**：开发、测试、预发、生产包要区分接口域名、AppID、推送配置、支付配置、埋点配置，避免测试包误连生产或正式包连测试。
- **测试验证**：覆盖安装、首次安装、登录注册、权限拒绝、弱网、后台切前台、版本升级、热更新、支付、推送、分享、崩溃恢复。
- **应用市场提交**：准备应用名称、图标、截图、隐私政策、权限说明、备案或软著等材料，按各市场要求提交审核。
- **灰度与回滚**：正式发布前可以先小范围灰度；发现严重问题时要有降级开关、接口兼容、版本强更或回滚策略。

常见上架风险：

- 权限申请过多，或者权限用途和隐私政策描述不一致。
- 集成第三方 SDK 未在隐私政策中说明，或者 SDK 初始化早于用户同意隐私协议。
- iOS 使用热更新修改核心功能，或者涉及虚拟商品却绕过 Apple 支付规则。
- Android 不同应用市场对隐私弹窗、权限弹窗、SDK 合规、加固包有不同要求。

#### 原生插件能力

- uni-app 原生插件用于补足 JS API 无法覆盖的系统能力，常见形态包括 Android 原生插件、iOS 原生插件、uts 插件、uni_modules 插件。
- Android 插件通常涉及 Java/Kotlin、Gradle、权限声明、Activity/Service、回调到 JS。
- iOS 插件通常涉及 Swift/Objective-C、Info.plist 权限声明、系统 Framework、回调到 JS。
- 面试回答重点不是“会调插件”，而是要说明完整链路：需求判断、插件选型、权限配置、平台差异封装、JS 层统一 API、异常和降级处理。

#### 登录、支付、推送与分享

这几类能力是多端项目里最容易被追问的业务闭环：

- **登录**：小程序通常通过 `uni.login` 获取 code，服务端换取 openid/session；App 端可能使用手机号、验证码、微信登录、Apple 登录。前端重点是 token 管理、登录态恢复、过期重登和未登录拦截。
- **支付**：小程序支付、App 微信支付、App 支付宝、Apple IAP 都有不同接入方式。前端负责拉起支付和处理结果，最终订单状态必须以后端回调或主动查询为准，不能只相信前端支付成功回调。
- **推送**：App 推送涉及厂商通道、系统通知权限、点击通知跳转、前后台行为；小程序更常见的是订阅消息，需要用户主动授权模板。
- **分享**：H5、小程序、App 分享入口和参数不同，建议封装统一分享方法，按平台注入标题、路径、图片、query 和回调。

#### 性能与稳定性

- 首屏优化：减少首屏接口数量，关键数据优先，非关键模块延迟加载，图片懒加载和压缩。
- 包体积优化：小程序分包、资源 CDN、删除无用依赖、按需引入组件、避免大图和大库进入主包。
- 列表性能：长列表使用分页、虚拟列表或局部渲染，避免一次性渲染大量节点。
- 请求稳定性：统一超时、重试、取消请求、防重复提交、弱网提示、登录过期队列处理。
- 错误监控：捕获接口错误、JS 错误、白屏、崩溃、关键业务失败，并带上平台、版本、用户、页面路径等上下文。

#### 常见追问

- **uni-app 如何做多端兼容？**
  使用统一业务代码承载主流程，通过条件编译、平台判断、样式适配和能力封装隔离差异。公共逻辑放在 hooks、utils、store、api 层，平台相关逻辑集中维护，避免散落在页面中。
- **App 和小程序开发最大的差异是什么？**
  App 更接近原生环境，关注安装包、权限、热更新、原生插件、系统兼容和应用市场审核；小程序更关注平台规范、包体积、分包、登录授权、平台 API 限制。
- **如何封装一个 App 原生能力？**
  JS 层提供统一方法，内部按平台分支调用 `plus.*` 或原生插件；无能力的平台返回明确错误或降级方案；页面只依赖业务语义方法，不直接依赖底层实现。

### 2. Vue3 全家桶

#### Composition API

- `setup` 是组合式 API 的入口，适合按业务逻辑组织代码，而不是按 `data`、`methods`、`computed` 分散逻辑。
- 常用 API：`ref`、`reactive`、`computed`、`watch`、`watchEffect`、`onMounted`、`provide/inject`。
- `ref` 适合基本类型和需要整体替换的值，模板中自动解包；`reactive` 适合对象状态，但解构会丢失响应式，需要 `toRefs` 或保持对象访问。

```javascript
import { computed, ref, watch } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

watch(count, (value, oldValue) => {
  console.log('count changed', oldValue, value)
})
```

#### 响应式原理

- Vue3 基于 `Proxy` 实现响应式，相比 Vue2 的 `Object.defineProperty`，对对象属性新增、删除、数组索引等场景支持更自然。
- 响应式核心可以概括为：读取时 `track` 收集依赖，修改时 `trigger` 触发依赖更新。
- `computed` 有缓存，依赖不变不会重复计算；`watch` 更适合处理副作用，例如请求接口、同步缓存、埋点。
- `watchEffect` 会自动收集依赖，适合依赖关系简单的副作用；`watch` 可以明确监听来源，适合需要 oldValue、新值比较或控制触发时机的场景。
- `nextTick` 用于等待 DOM 更新完成后再读取布局或操作组件实例，常见于滚动定位、输入框聚焦、测量元素高度。
- `shallowRef` / `shallowReactive` 只处理浅层响应式，适合大对象、第三方实例、图表实例等不希望深度代理的场景。
- `markRaw` 可以标记对象不被响应式代理，适合地图实例、播放器实例、复杂 class 实例。

面试里可以用一句话概括：

> Vue3 的响应式可以理解为通过 Proxy 拦截 get/set，get 时收集当前副作用函数，set 时触发对应依赖更新。组件渲染、computed、watch 本质上都依赖这套依赖收集机制，只是使用场景不同。

#### Pinia

- Pinia 是 Vue3 推荐的状态管理方案，核心概念包括 `state`、`getters`、`actions`。
- 适合存储跨页面共享状态，例如用户信息、token、应用配置、缓存数据。
- 面试中可以结合本项目 `src/store` 说明模块化 store 的组织方式。
- 复杂项目建议按业务域拆分 store，例如 `user`、`app`、`permission`、`cart`、`message`，不要把所有状态塞进一个大 store。
- 异步请求可以放在 `actions` 中，但接口细节仍建议放在 `api` 层，store 负责组织状态流转。
- 持久化时要区分敏感数据和普通偏好设置，token、用户信息、主题配置、语言设置可以采用不同存储策略。
- 小程序和 App 环境中通常使用 `uni.setStorageSync` / `uni.getStorageSync`，H5 可以使用 localStorage，但最好通过统一 storage 工具封装。

```javascript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
  }),
  getters: {
    isLogin: (state) => Boolean(state.token),
  },
  actions: {
    setToken(token) {
      this.token = token
    },
  },
})
```

#### Vue Router / uni-app 路由

- 标准 Vue 项目通常使用 Vue Router，关注路由表、动态路由、嵌套路由、路由守卫、懒加载。
- uni-app 的页面路由由 `pages.json` 管理，不能完全等同于 Web 端 Vue Router。
- 本项目使用 `uniapp-router-next` 提供类 Vue Router 的体验，支持 `push`、`replace`、路由别名、守卫和中间件。
- 权限控制一般放在路由守卫中，结合 token、白名单、页面 meta 信息处理登录拦截。
- uni-app 常用导航 API 包括 `navigateTo`、`redirectTo`、`reLaunch`、`switchTab`、`navigateBack`，不同 API 对页面栈和 tabBar 页面有不同限制。
- 登录拦截要处理白名单页面、目标页面重定向、登录后回跳、token 过期、重复跳转和守卫死循环。
- 页面参数建议做类型和默认值处理，复杂对象不建议直接塞进 query，可以放缓存或 store，只在 query 中传业务 id。

#### 常见追问

- **ref 和 reactive 怎么选？**
  简单值、DOM 引用、需要整体替换的数据用 `ref`；复杂对象可以用 `reactive`。团队项目中更重要的是保持一致，避免随意解构导致响应式丢失。
- **computed 和 watch 的区别？**
  `computed` 用于派生状态，强调声明式和缓存；`watch` 用于监听变化后的副作用，例如请求、存储、日志。
- **Pinia 和 localStorage / uni storage 的关系？**
  Pinia 管运行时内存状态，storage 管持久化。登录态这类数据通常两者结合：store 负责页面响应，storage 负责刷新或重启后的恢复。

### 3. Vite 工程化能力

#### 核心能力

- 理解 Vite 开发环境基于原生 ESM，启动快；生产构建基于 Rollup，适合做代码分割和资源优化。
- 熟悉环境变量和模式：`.env.development`、`.env.production`、`import.meta.env`、`VITE_` 前缀。
- 掌握常见工程配置：路径别名、自动导入、CSS 预处理、UnoCSS、构建产物分析、代理、插件扩展。
- 能通过 `package.json` scripts 区分不同平台构建命令，例如 H5、小程序、Android App。

```javascript
// vite.config.js
export default {
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}
```

#### 多端项目工程化重点

- 环境隔离：开发、测试、预发、生产使用不同接口域名、资源域名和开关配置。
- 资源策略：小程序关注包体积，App 和 H5 关注缓存、CDN、首屏加载。本项目提供本地与远程静态资源切换能力。
- 分包策略：小程序通过分包降低主包体积，App/H5 也可以借鉴模块化组织方式降低维护成本。
- 请求层封装：统一 baseURL、token 注入、错误处理、登录过期处理、loading、重试和取消请求。
- 质量保障：ESLint、格式化、提交检查、构建检查、核心页面冒烟测试。

#### 构建、环境与发布管理

- **环境变量**：用 `.env.development`、`.env.test`、`.env.production` 区分接口、资源域名、埋点开关、调试开关。前端可暴露变量使用 `VITE_` 前缀，敏感密钥不要放前端。
- **构建命令**：通过 `pnpm dev:h5`、`pnpm dev:mp-weixin`、`pnpm dev:app-android` 这类 scripts 固化不同端的启动方式，减少口口相传。
- **路径别名**：用 `@`、`@/api`、`@/store` 等别名降低相对路径复杂度，但要和编辑器、ESLint、自动导入配置保持一致。
- **自动导入**：常见于 Vue API、uni API、路由 API、store hooks，可以减少样板代码，但团队要统一规则，避免可读性下降。
- **代理与跨域**：H5 开发可用 Vite proxy，小程序和 App 不存在浏览器同源限制，但需要配置合法域名、证书和网络安全策略。
- **CI/CD**：可以在流水线里做依赖安装、lint、单元测试、类型检查、构建、产物归档、版本号生成和通知。

#### 分包、缓存与资源策略

- 小程序主包要放首页、tabBar、公共组件、基础工具；低频页面放分包，必要时使用独立分包。
- 图片、字体、富文本资源尽量走 CDN，避免把大量静态资源打进小程序主包。
- 接口数据缓存要区分强实时和弱实时，例如用户信息可以短缓存，订单状态和支付结果必须实时查询。
- App 可以利用本地缓存提升体验，但要设计缓存版本、过期时间和清理策略。
- H5 要关注首屏 JS 体积、路由懒加载、CDN 缓存、静态资源 hash 和 gzip/brotli 压缩。

#### 请求层与错误处理

- 请求层统一处理 baseURL、headers、token、超时、错误码、loading、重复请求、取消请求。
- 登录过期时要避免多个接口同时弹出登录框，可以用队列或锁保证只触发一次重登流程。
- 业务错误和系统错误要区分：业务错误给用户可理解提示，系统错误进入日志和监控。
- 支付、下单、提交表单这类关键接口要做防重复提交，必要时使用幂等 key。

#### 团队协作规范

- 统一目录规范、命名规范、接口模块拆分和组件拆分标准。
- 提交前跑 lint、格式化和基础构建，避免低级问题进入主分支。
- 复杂需求先写技术方案，明确影响范围、兼容平台、接口变更、灰度方案和回滚方案。
- 公共组件和 hooks 要有清晰输入输出，不要把具体页面业务写死在公共层。

#### 常见追问

- **Vite 为什么快？**
  开发阶段不需要先完整打包，源码以 ESM 方式按需加载；依赖会预构建并缓存。生产阶段仍然通过 Rollup 做优化构建。
- **如何优化 uni-app 项目包体积？**
  删除无用依赖和资源、开启分包、图片压缩、静态资源上 CDN、按需引入组件、避免大库进入主包、分析构建产物。
- **如何设计一个可维护的多端项目结构？**
  页面负责视图和交互，api 层负责请求，store 层负责共享状态，hooks 负责复用业务逻辑，utils 负责纯工具函数，平台差异集中到 adapter/service 层。

### 5. React 18 核心面试题

- **React 18 有什么新特性？**

  - **并发模式 (Concurrent Mode)**: 允许 React 中断渲染任务，根据优先级调整渲染过程。
  - **自动批处理 (Automatic Batching)**: 自动将多次 `setState` 更新合并为一次渲染，即使在异步事件（如 `setTimeout`、`Promise`）中也是如此。
  - **新的 Transition API**: `useTransition` 和 `startTransition`，允许将非紧急的状态更新标记为过渡，从而保持界面响应。
  - **新的 Suspense 特性**: 支持服务端渲染 (SSR) 的 Suspense 机制。
  - **useId**: 生成唯一的 ID，用于服务端和客户端一致性。
  - **useDeferredValue**: 延迟更新状态，常用于复杂的搜索过滤场景。

- **自动批处理原理是什么？**

  - 在 React 18 之前，只有在 React 事件处理函数中会自动批处理。在 React 18 中，所有异步事件、Promise 回调、甚至 `setTimeout` 中的更新都会被自动批处理。如果你想退出批处理，可以使用 `flushSync`。

- **什么是并发渲染 (Concurrent Rendering)？**

  - 并发渲染并非多线程渲染，它是指 React 可以同时处理多个 UI 渲染任务。React 可以在渲染过程中暂停、中断旧任务，优先处理更高优先级的用户交互任务，然后再恢复之前的中断任务。

- **`useTransition` 和 `useDeferredValue` 有什么区别？**

  - `startTransition` 是一个函数，用于包装“非紧急”状态更新。
  - `useDeferredValue` 是一个 Hook，用于接收一个值，并返回一个该值的“延迟版本”。两者本质上都是为了避免在渲染大量数据时导致主线程阻塞。

- **React Hooks 的底层原理？**
  - Hooks 依赖于一个链表结构来存储组件的状态。React 在组件初始化时创建链表，并在后续渲染中按顺序访问链表节点。这就是为什么 Hooks **必须在组件顶层调用，且不能放在条件语句或循环中**的原因。

- **`useMemo` 和 `useCallback` 的区别？**
  - **useMemo**: 缓存计算结果（值），在依赖变化时重新计算。适用于昂贵的计算（如复杂数据处理），以及作为 props 传递对象/数组给子组件以避免不必要的渲染。
  - **useCallback**: 缓存函数引用，在依赖变化时重新创建函数。主要用于将函数作为 props 传递给子组件（需配合 `memo`），避免父组件渲染导致子组件不必要的重新渲染。

- **React Fiber 的原理是什么？**
  - **核心痛点**：React 16 之前是同步递归渲染，大任务会阻塞主线程导致卡顿。
  - **Fiber 核心**：将渲染任务拆解为 Fiber 节点（链表结构），实现任务可中断、可恢复。
  - **渲染分阶段**：
    - **Reconciliation (协调阶段)**: 对比差异，可被高优先级任务中断。
    - **Commit (提交阶段)**: 将结果应用到 DOM，不可中断。
  - **优先级调度**：根据任务优先级进行调度，让高优先级任务（如用户交互）优先执行。


- **Context API 如何优化性能？**
  - Context 本身没有优化机制，任何 Context 值的变化都会触发所有订阅该 Context 的组件重新渲染。优化方案包括：使用 `memo` 包裹子组件、拆分多个 Context、或使用 Zustand/Recoil 等第三方状态管理库来精确控制渲染范围。

- **为什么 React 推荐使用函数式组件？**
  - 代码更简洁，易于测试和复用（通过 Hooks）。避免了 Class 组件中复杂的 `this` 指向问题，且能更好地契合 React 的声明式 UI 范式。


#### 项目介绍

可以这样组织回答：

> 我主要使用 uni-app + Vue3 做多端业务开发，项目通过 Vite 构建，状态管理使用 Pinia，路由层在 uni-app 页面体系上封装了类似 Vue Router 的使用体验。业务上会把页面、请求、状态、hooks、权限守卫拆开维护。多端差异主要通过条件编译和平台 adapter 封装处理，App 端涉及权限、WebView、文件、扫码、定位、推送或原生插件时，会把原生能力包装成统一 JS API，页面层不直接感知 Android/iOS 差异。

#### 技术亮点

- 多端统一：同一套业务代码输出 H5、小程序、App，平台差异集中封装。
- App 能力：了解 `App-Plus`、`plus.*`、权限配置、原生插件调用和 Android/iOS 差异。
- Vue3：能使用 Composition API 拆分业务逻辑，理解响应式依赖收集和触发更新。
- Pinia：能设计模块化状态，处理登录态、用户信息、应用配置和持久化恢复。
- 路由权限：能通过守卫、中间件、白名单和 meta 信息实现登录拦截。
- 工程化：能配置 Vite、环境变量、路径别名、资源策略、分包、构建命令和基础质量检查。

#### 反问面试官

- 团队当前主要发布哪些端：App、小程序、H5 的占比如何？
- App 端是否有自研原生插件，Android/iOS 原生能力由谁维护？
- 项目是否有统一的请求、权限、埋点、错误监控和发布流程？
- 多端差异目前是集中封装，还是在页面中通过条件编译处理？
- 当前工程化最需要优化的是构建速度、包体积、稳定性，还是多人协作规范？

## 常见问题

- **依赖安装/启动失败**:
  如果遇到问题，尝试删除 `pnpm-lock.yaml`、`yarn.lock` 或 `package-lock.json` 文件，然后重新运行安装命令 (例如 `pnpm install`)。
- **路由守卫陷入循环**:
  路由守卫中页面跳转不支持路径别名，请使用实际路径，避免使用别名(aliasPath)。

## 获取支持

这是一个依靠热爱驱动的开源项目，因此支持会根据时间情况提供，更新节奏可能不固定。

- **项目问题与反馈**: [在 GitHub 上提交 Issue](https://github.com/viarotel-org/vite-uniapp-template/issues)
- **联系方式**: viarotel@qq.com

## 原生 Android/iOS 插件封装建议

当标准 uni-app API 无法满足需求时，可通过原生插件进行扩展。建议遵循以下封装原则：

- **业务语义化**: JS 层封装统一的 API（如 `scanCode`, `requestPermission`），隐藏原生实现细节。
- **平台差异隔离**: 差异逻辑集中在 `src/adapter` 或 `src/service` 层，业务页面只调用统一接口。
- **标准化出入参**: 无论 Android 还是 iOS，必须返回统一格式的成功数据与错误对象（包含 code 和 message）。
- **完善降级方案**: 对不支持原生插件的平台或原生调用失败的情况，必须提供合理的兜底策略（如提示不支持、静默忽略或返回降级结果）。

在面试中，如果被问到 **“uni-app 原生插件封装经验”**，可以从以下几个方面回答。

## 一、为什么要封装原生插件

当 uni-app 提供的标准 API 无法满足业务需求时，需要通过原生插件扩展能力，例如：

- 蓝牙设备通信（BLE）
- NFC读写
- 指纹/人脸认证
- 推送消息厂商通道
- 地图导航
- 相机高级功能
- 文件上传下载
- 第三方SDK接入（支付宝、微信、OCR、人脸识别等）

---

## 二、原生插件整体架构

```text
uni-app(JS)
      │
      ▼
plus.bridge
      │
      ▼
原生插件(Android/iOS)
      │
      ▼
系统API/第三方SDK
```

开发流程：

```text
uni-app页面
      ↓
调用封装JS API
      ↓
invokeNative()
      ↓
Android/iOS插件
      ↓
执行原生逻辑
      ↓
回调结果
      ↓
Promise返回页面
```

---

## 三、Android 插件封装

### 1. 创建 Module

通常创建：

```text
android/
 ├── src/main/java
 │      └── XxxModule.java
 └── build.gradle
```

继承：

```java
public class BluetoothModule extends UniModule {
}
```

---

### 2. 暴露方法给 JS

```java
@UniJSMethod(uiThread = true)
public void connect(JSONObject options,
                    UniJSCallback callback) {

    String mac = options.getString("mac");

    // 蓝牙连接逻辑

    JSONObject result = new JSONObject();
    result.put("success", true);

    callback.invoke(result);
}
```

---

### 3. JS调用

```javascript
const bluetooth = uni.requireNativePlugin('BluetoothModule')

bluetooth.connect(
  {
    mac: '11:22:33:44',
  },
  (res) => {
    console.log(res)
  },
)
```

---

## 四、异步事件监听

例如：

蓝牙状态变化

GPS定位

扫码结果

文件下载进度

### Android

```java
UniSDKInstance instance;

instance.fireGlobalEventCallback(
    "onBluetoothChanged",
    data
);
```

### uni-app

```javascript
uni.$on('onBluetoothChanged', (res) => {
  console.log(res)
})
```

---

## 五、Promise风格封装

实际项目中不建议直接暴露 callback。

封装一层：

```javascript
const nativePlugin = uni.requireNativePlugin('BluetoothModule')

export function connect(mac) {
  return new Promise((resolve, reject) => {
    nativePlugin.connect({ mac }, (res) => {
      if (res.success) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}
```

调用：

```javascript
await connect(mac)
```

更符合现代前端开发习惯。

---

## 六、iOS 插件封装

### Swift

```swift
@objc(BluetoothModule)
class BluetoothModule: DCUniModule {

    @objc
    func connect(
        _ options:[String:Any],
        callback:UniModuleKeepAliveCallback
    ) {

        callback([
            "success":true
        ],false)

    }
}
```

---

### Objective-C

```objective-c
UNI_EXPORT_METHOD(@selector(connect:callback:))
```

暴露给 JS。

---

## 七、插件开发最佳实践

### 1. JS层统一接口

不要让业务直接调用：

```javascript
uni.requireNativePlugin()
```

统一封装：

```javascript
src / native / bluetooth.js
src / native / nfc.js
src / native / location.js
```

业务层：

```javascript
import bluetooth from '@/native/bluetooth'
```

这样以后切换平台更方便。

---

### 2. 平台兼容处理

```javascript
if (plus.os.name === 'Android') {
}

if (plus.os.name === 'iOS') {
}
```

或者：

```javascript
#ifdef APP-PLUS
#endif

#ifdef H5
#endif
```

---

### 3. 错误码统一

例如：

```javascript
{
    code:0,
    message:"success"
}
```

```javascript
{
    code:1001,
    message:"蓝牙未开启"
}
```

```javascript
{
    code:1002,
    message:"设备未找到"
}
```

不要直接把原生异常抛给前端。

---

### 4. 生命周期管理

例如：

```java
@Override
public void onDestroy() {

    bluetoothGatt.close();

}
```

避免：

- 内存泄漏
- 蓝牙连接未释放
- GPS持续定位

---

## 八、面试加分回答（推荐背诵）

> 在 uni-app 项目中，当标准 API 无法满足需求时，我会通过 Android/iOS 原生插件进行扩展开发。Android 侧通常继承 UniModule，通过 @UniJSMethod 暴露接口给 JS；iOS 侧通过 DCUniModule 实现。JS 层统一封装 Promise 风格 API，屏蔽平台差异。对于蓝牙、NFC、定位、扫码等异步场景，会通过全局事件回调实现原生与 uni-app 的双向通信。同时会做好错误码统一、资源释放和生命周期管理，保证插件的稳定性和可维护性。
