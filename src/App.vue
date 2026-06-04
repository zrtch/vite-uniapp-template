<script setup>
// #ifdef WEB
import { updateShades } from '$unocss-preset-shades'
// #endif
import { resetImmersiveStatusBar } from '@/utils/status-bar'

onLaunch(() => {
  resetImmersiveStatusBar()
  console.log('App Launch')
})
onShow(() => {
  resetImmersiveStatusBar()
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})

const appStore = useAppStore()

// #ifdef WEB
watchEffect(() => {
  updateShades(appStore.primaryColor)
})
// #endif
</script>

<style lang="scss">
// #ifndef APP-NVUE
@import '@unocss-applet/reset/uni-app/button-after.css';
@import '@unocss-applet/reset/uni-app/tailwind-compat.css';
// #endif
@import './styles/css/index.css';
</style>
