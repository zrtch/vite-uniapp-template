import { defineMiddleware } from '$uni-router'
import { resetImmersiveStatusBar } from '@/utils/status-bar'
import login from './login/index.js'
import test from './test/index.js'

// 路由守卫中页面跳转不支持路径别名，请使用实际路径，避免使用别名
export default function permission(router) {
  login(router)
  defineMiddleware('test', test, { router })

  router.afterEach(() => {
    resetImmersiveStatusBar()
  })
}
