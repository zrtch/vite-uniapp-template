<script setup>
import { sleep } from '@/utils'

const displayText = ref('')
const isTyping = ref(false)
const isPaused = ref(false)
const speed = ref(50)
const currentIndex = ref(0)

const sampleTexts = [
  '在遥远的未来，人类已经掌握了星际旅行的技术。一艘名为"探索者号"的飞船正在执行一项重要任务，前往银河系边缘寻找新的宜居星球。船长李明和他的团队经过三年的航行，终于发现了一颗蓝绿色的星球。',
  'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. It is commonly used for testing typewriters and computer keyboards, displaying examples of fonts, and other applications.',
  '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。这是唐代诗人孟浩然的《春晓》，描绘了春天早晨的美好景象。诗人在春天的早晨醒来，听到鸟儿的鸣叫声，想起昨夜的风雨，不知道有多少花朵凋落了。',
]

const selectedTextIndex = ref(0)
const fullText = computed(() => sampleTexts[selectedTextIndex.value])

let typingTimer = null

async function typeWriter() {
  if (currentIndex.value >= fullText.value.length) {
    isTyping.value = false
    return
  }

  if (isPaused.value) {
    return
  }

  displayText.value += fullText.value[currentIndex.value]
  currentIndex.value++

  await sleep(speed.value)

  if (isTyping.value && !isPaused.value) {
    typeWriter()
  }
}

function startTyping() {
  if (isTyping.value) {
    return
  }

  if (currentIndex.value >= fullText.value.length) {
    reset()
  }

  isTyping.value = true
  isPaused.value = false
  typeWriter()
}

function pauseTyping() {
  isPaused.value = true
}

function resumeTyping() {
  if (!isTyping.value) {
    return
  }

  isPaused.value = false
  typeWriter()
}

function reset() {
  isTyping.value = false
  isPaused.value = false
  displayText.value = ''
  currentIndex.value = 0
}

function changeText(index) {
  selectedTextIndex.value = index
  reset()
}

function changeSpeed(value) {
  speed.value = value
}

onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
})
</script>

<template>
  <view class="h-full flex flex-col bg-gray-50">
    <!-- 控制面板 -->
    <view class="bg-white px-4 py-3 shadow-sm">
      <view class="space-y-3">
        <!-- 文本选择 -->
        <view class="space-y-2">
          <text class="text-sm text-gray-700 font-medium">
            选择文本
          </text>
          <view class="flex space-x-2">
            <view
              v-for="(text, index) in sampleTexts"
              :key="index"
              class="flex-1 rounded-lg border px-3 py-2 text-center transition-colors"
              :class="selectedTextIndex === index
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 bg-white text-gray-700'"
              @click="changeText(index)"
            >
              <text class="text-xs font-medium">
                文本{{ index + 1 }}
              </text>
            </view>
          </view>
        </view>

        <!-- 速度控制 -->
        <view class="space-y-2">
          <view class="flex items-center justify-between">
            <text class="text-sm text-gray-700 font-medium">
              打字速度
            </text>
            <text class="text-xs text-gray-500">
              {{ speed }}ms/字
            </text>
          </view>
          <slider
            :value="speed"
            :min="10"
            :max="200"
            :step="10"
            block-size="20"
            active-color="#3b82f6"
            background-color="#e5e7eb"
            @change="e => changeSpeed(e.detail.value)"
          />
          <view class="flex justify-between">
            <text class="text-xs text-gray-400">
              快
            </text>
            <text class="text-xs text-gray-400">
              慢
            </text>
          </view>
        </view>

        <!-- 控制按钮 -->
        <view class="flex space-x-2">
          <button
            v-if="!isTyping || isPaused"
            class="flex-1 rounded-lg bg-blue-500 py-2.5 text-sm text-white font-medium transition-transform active:scale-98"
            @click="startTyping"
          >
            {{ currentIndex === 0 ? '开始打字' : '继续' }}
          </button>
          <button
            v-if="isTyping && !isPaused"
            class="flex-1 rounded-lg bg-orange-500 py-2.5 text-sm text-white font-medium transition-transform active:scale-98"
            @click="pauseTyping"
          >
            暂停
          </button>
          <button
            class="flex-1 rounded-lg border border-gray-300 bg-white py-2.5 text-sm text-gray-700 font-medium transition-transform active:scale-98"
            @click="reset"
          >
            重置
          </button>
        </view>
      </view>
    </view>

    <!-- 打字区域 -->
    <scroll-view scroll-y class="flex-1 p-4">
      <view class="min-h-full rounded-2xl bg-white p-4 shadow-sm">
        <view class="relative">
          <!-- 显示的文本 -->
          <text class="text-base leading-relaxed text-gray-900 whitespace-pre-wrap">{{ displayText }}</text>
          <!-- 占位提示 -->
          <text
            v-if="!displayText && !isTyping"
            class="text-base text-gray-400"
          >
            点击"开始打字"查看效果...
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
</style>
