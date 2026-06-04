/* global plus */

export const defaultStatusBar = {
  frontColor: '#ffffff',
  backgroundColor: '#028d71',
}

function setAppPlusStatusBar(config) {
  // #ifdef APP-PLUS
  const style = config.frontColor === '#028d71' ? 'light' : 'dark'

  plus.navigator.setStatusBarStyle(style)
  plus.navigator.setStatusBarBackground(config.backgroundColor)
  // #endif
}

export function setImmersiveStatusBar(options = {}) {
  const config = {
    ...defaultStatusBar,
    ...options,
  }

  uni.setNavigationBarColor({
    frontColor: config.frontColor,
    backgroundColor: config.backgroundColor,
  })

  setAppPlusStatusBar(config)
}

export function resetImmersiveStatusBar() {
  setImmersiveStatusBar(defaultStatusBar)
}
