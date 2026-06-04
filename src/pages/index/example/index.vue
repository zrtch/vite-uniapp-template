<script setup>
const tabModel = [
  {
    label: '实用技巧',
    children: [
      {
        icon: 'i-carbon-router',
        text: '路由中间件',
        path: '/pages/tips/middleware/index',
      },
    ],
  },
  {
    label: '业务模板',
    children: [
      {
        icon: 'i-carbon-list',
        text: '通用列表',
        path: '/pages/template/paging/index',
      },
      {
        icon: 'i-carbon-list',
        text: '表单',
        path: '/pages/template/table/index',
      },
      {
        icon: 'i-carbon-map',
        text: '地图服务',
        path: '/pages/template/map/index',
      },
      {
        icon: 'i-carbon-mobile',
        text: 'App 能力',
        path: '/pages/template/app-capability/index',
      },
      {
        icon: 'i-carbon-text-font',
        text: '打字机',
        path: '/pages/template/typewriter/index',
      },
    ],
  },
]
const tabIndex = ref(0)

function onTabClick(index) {
  tabIndex.value = index
}

const activeTabItem = computed(() => tabModel[tabIndex.value].children)
</script>

<template>
  <view class="h-full flex flex-col overflow-hidden">
    <view class="fixed left-0 right-0 top-0 z-50 h-[--safe-top] bg-white"></view>
    <view class="h-[--safe-top] flex-none uni-mp:mt-4"></view>

    <view class="flex flex-none bg-white px-3 py-2 !uni-mp:pr-[var(--safe-right)]">
      <view v-for="(item, index) of tabModel" :key="index" class="h-10 w-0 flex flex-1 items-center justify-center rounded-lg" :class="[tabIndex === index ? 'bg-primary-50 text-primary-600 font-bold' : '']" @click="onTabClick(index)">
        {{ item.label }}
      </view>
    </view>

    <view class="mt-3 h-0 flex-1 overflow-auto">
      <view class="mx-3 overflow-hidden rounded-xl shadow-sm">
        <view
          v-for="(item, index) of activeTabItem"
          :key="index"
          class="flex items-center bg-white px-5 py-4 transition-colors duration-200 active:bg-gray-50"
          :class="[
            index !== activeTabItem.length - 1 ? 'border-b border-gray-100' : '',
          ]"
          hover-class="bg-gray-50"
          @click="$Router.push(item.path)"
        >
          <view class="w-10 flex flex-none items-center justify-center text-gray-500">
            <view class="size-6 text-primary-500" :class="item.icon"></view>
          </view>

          <view class="flex-1 text-gray-700 font-medium">
            {{ item.text }}
          </view>
          <view class="text-gray-400">
            <view class="i-carbon-chevron-right size-5"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
