<script setup>
import content from '/README.md?raw'

const appStore = useAppStore()
</script>

<template>
  <view class="h-full overflow-auto">
    <view class="fixed left-0 right-0 top-0 z-50 h-[--safe-top] bg-white"></view>
    <view class="h-[--safe-top]"></view>
    <zero-markdown-view :key="appStore.primaryColor" :markdown="content" :theme-color="appStore.primaryColor" />
  </view>
</template>
