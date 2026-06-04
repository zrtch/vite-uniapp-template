<script setup>
import { setImmersiveStatusBar } from '@/utils/status-bar'

const permissionItems = [
  {
    key: 'camera',
    label: '相机权限',
    android: ['android.permission.CAMERA'],
    description: '用于拍照、扫码和上传图片',
  },
  {
    key: 'location',
    label: '定位权限',
    android: [
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
    ],
    description: '用于获取当前位置和附近服务',
  },
  {
    key: 'storage',
    label: '文件权限',
    android: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_MEDIA_IMAGES',
    ],
    description: '用于读取相册和保存业务文件',
  },
]

const actionGroups = [
  {
    title: '设备权限',
    description:
      'Android 主动申请运行时权限，iOS 通常在调用系统能力时触发授权弹窗。',
    actions: [
      {
        key: 'permission-camera',
        label: '申请相机',
        icon: 'i-carbon-camera',
        handler: () => requestPermission(permissionItems[0]),
      },
      {
        key: 'permission-location',
        label: '申请定位',
        icon: 'i-carbon-location-current',
        handler: () => requestPermission(permissionItems[1]),
      },
      {
        key: 'permission-storage',
        label: '申请文件',
        icon: 'i-carbon-folder',
        handler: () => requestPermission(permissionItems[2]),
      },
    ],
  },
  {
    title: '原生能力',
    description:
      '扫码、定位、相册、相机都优先使用 uni 标准 API，便于多端统一。',
    actions: [
      {
        key: 'scan',
        label: '扫码',
        icon: 'i-carbon-qr-code',
        handler: scanCode,
      },
      {
        key: 'location',
        label: '定位',
        icon: 'i-carbon-map',
        handler: getCurrentLocation,
      },
      {
        key: 'album',
        label: '选相册',
        icon: 'i-carbon-image',
        handler: chooseFromAlbum,
      },
      {
        key: 'camera',
        label: '拍照',
        icon: 'i-carbon-camera-action',
        handler: takePhoto,
      },
    ],
  },
  {
    title: 'App 扩展',
    description:
      '文件读写和状态栏属于 App 常见增强能力，非 App 平台会给出降级提示。',
    actions: [
      {
        key: 'file-write',
        label: '写文件',
        icon: 'i-carbon-document-add',
        handler: writeDemoFile,
      },
      {
        key: 'file-read',
        label: '读文件',
        icon: 'i-carbon-document-view',
        handler: readDemoFile,
      },
      {
        key: 'statusbar',
        label: '状态栏',
        icon: 'i-carbon-color-palette',
        handler: toggleStatusBar,
      },
      {
        key: 'settings',
        label: '设置页',
        icon: 'i-carbon-settings',
        handler: openAppSettings,
      },
    ],
  },
  {
    title: '系统交互',
    description: '剪贴板、震动、拨号和外链属于 App 中高频的系统交互能力。',
    actions: [
      {
        key: 'clipboard-set',
        label: '写剪贴板',
        icon: 'i-carbon-copy',
        handler: setClipboard,
      },
      {
        key: 'clipboard-get',
        label: '读剪贴板',
        icon: 'i-carbon-paste',
        handler: getClipboard,
      },
      {
        key: 'vibrate',
        label: '震动',
        icon: 'i-carbon-touch-1',
        handler: vibrateDevice,
      },
      {
        key: 'phone',
        label: '拨号',
        icon: 'i-carbon-phone',
        handler: makePhoneCall,
      },
      {
        key: 'external-url',
        label: '外链',
        icon: 'i-carbon-launch',
        handler: openExternalUrl,
      },
    ],
  },
  {
    title: '设备状态',
    description: '网络、亮度、常亮和设备信息适合用于排障、埋点和体验优化。',
    actions: [
      {
        key: 'network',
        label: '网络',
        icon: 'i-carbon-wifi',
        handler: getNetworkStatus,
      },
      {
        key: 'brightness',
        label: '亮度',
        icon: 'i-carbon-light',
        handler: toggleBrightness,
      },
      {
        key: 'keep-screen-on',
        label: '屏幕常亮',
        icon: 'i-carbon-screen',
        handler: toggleKeepScreenOn,
      },
      {
        key: 'device-info',
        label: '设备信息',
        icon: 'i-carbon-devices',
        handler: showDeviceInfo,
      },
    ],
  },
]

const platformInfo = ref({
  platform: 'unknown',
  os: 'unknown',
  appVersion: '-',
  statusBarHeight: 0,
  safeAreaBottom: 0,
})
const permissionLogs = ref([])
const capabilityLogs = ref([])
const selectedImage = ref('')
const fileContent = ref('')
const isDarkStatusBar = ref(true)
const isHighBrightness = ref(false)
const isKeepScreenOn = ref(false)

const latestLogs = computed(() =>
  [...permissionLogs.value, ...capabilityLogs.value].slice(0, 8),
)

function addLog(type, title, detail = '') {
  const item = {
    id: Date.now() + Math.random(),
    type,
    title,
    detail,
    time: formatTime(new Date()),
  }

  if (type === 'permission') permissionLogs.value.unshift(item)
  else capabilityLogs.value.unshift(item)
}

function formatTime(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function getSystemInfo() {
  const info = uni.getSystemInfoSync()

  platformInfo.value = {
    platform: info.uniPlatform || info.platform || 'unknown',
    os: `${info.osName || info.platform || 'unknown'} ${info.osVersion || ''}`.trim(),
    appVersion: '-',
    statusBarHeight: info.statusBarHeight || 0,
    safeAreaBottom: info.safeAreaInsets?.bottom || 0,
  }

  // #ifdef APP-PLUS
  plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
    platformInfo.value.appVersion = appInfo.version || '-'
  })
  // #endif
}

function getAppOSName() {
  // #ifdef APP-PLUS
  return plus.os.name
  // #endif

  return ''
}

function showUnsupported(title) {
  uni.showToast({
    title,
    icon: 'none',
  })
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

    // #ifndef APP-PLUS
    resolve({ granted: [], deniedPresent: [], deniedAlways: [] })
    // #endif
  })
}

async function requestPermission(item) {
  const osName = getAppOSName()

  if (!osName) {
    addLog(
      'permission',
      item.label,
      '当前平台不支持 App 原生权限申请，请在 App 真机中验证。',
    )
    showUnsupported('请在 App 真机中验证')
    return
  }

  if (osName === 'Android') {
    try {
      const result = await requestAndroidPermissions(item.android)
      const detail = [
        `已授权 ${result.granted.length}`,
        `临时拒绝 ${result.deniedPresent.length}`,
        `永久拒绝 ${result.deniedAlways.length}`,
      ].join(' / ')

      addLog('permission', item.label, detail)
      uni.showToast({
        title: result.deniedAlways.length ? '存在永久拒绝权限' : '权限申请完成',
        icon: 'none',
      })
    } catch (error) {
      addLog('permission', item.label, error.message || '权限申请失败')
      uni.showToast({ title: '权限申请失败', icon: 'none' })
    }
    return
  }

  addLog(
    'permission',
    item.label,
    'iOS 通常在调用相机、相册、定位等系统能力时触发授权弹窗。',
  )
  uni.showModal({
    title: 'iOS 权限说明',
    content: `${item.description}。iOS 会在首次调用对应能力时弹出系统授权。`,
    showCancel: false,
  })
}

function scanCode() {
  uni.scanCode({
    success: (result) => {
      const detail = result.result || result.path || '已识别二维码'
      addLog('capability', '扫码成功', detail)
      uni.showToast({ title: '扫码成功', icon: 'success' })
    },
    fail: (error) => {
      addLog('capability', '扫码失败', error.errMsg || '用户取消或平台不支持')
      uni.showToast({ title: '扫码失败', icon: 'none' })
    },
  })
}

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

function getCurrentLocation() {
  const startedAt = Date.now()

  uni.getLocation({
    ...getLocationOptions(),
    success: (result) => {
      const accuracy =
        typeof result.accuracy === 'number'
          ? `精度约 ${Math.round(result.accuracy)}m`
          : '精度未知'
      const elapsed = `${Date.now() - startedAt}ms`
      const provider =
        result.provider || getLocationOptions().provider || 'default'
      const address =
        result.address?.poiName ||
        result.address?.street ||
        result.address?.city ||
        ''
      const detail = [
        `${result.latitude.toFixed(10)}, ${result.longitude.toFixed(10)}`,
        accuracy,
        `坐标系 gcj02`,
        `provider ${provider}`,
        `耗时 ${elapsed}`,
        address,
      ]
        .filter(Boolean)
        .join(' / ')

      addLog('capability', '定位成功', detail)
      uni.showToast({ title: '定位成功', icon: 'success' })
    },
    fail: (error) => {
      addLog(
        'capability',
        '定位失败',
        error.errMsg || '请检查定位权限和 manifest 配置',
      )
      uni.showToast({ title: '定位失败', icon: 'none' })
    },
  })
}

function chooseImage(sourceType) {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType,
    success: (result) => {
      selectedImage.value = result.tempFilePaths[0] || ''
      addLog(
        'capability',
        sourceType.includes('camera') ? '拍照成功' : '相册选择成功',
        selectedImage.value,
      )
      uni.showToast({ title: '图片已选择', icon: 'success' })
    },
    fail: (error) => {
      addLog('capability', '图片能力失败', error.errMsg || '用户取消或权限不足')
      uni.showToast({ title: '图片能力失败', icon: 'none' })
    },
  })
}

function chooseFromAlbum() {
  chooseImage(['album'])
}

function takePhoto() {
  chooseImage(['camera'])
}

function writeDemoFile() {
  const content = `App capability demo\nplatform=${platformInfo.value.platform}\ntime=${new Date().toISOString()}`

  // #ifdef APP-PLUS
  plus.io.requestFileSystem(
    plus.io.PRIVATE_DOC,
    (fs) => {
      fs.root.getFile(
        'app-capability-demo.txt',
        { create: true },
        (fileEntry) => {
          fileEntry.createWriter((writer) => {
            writer.onwrite = () => {
              fileContent.value = content
              addLog('capability', '文件写入成功', fileEntry.fullPath)
              uni.showToast({ title: '文件写入成功', icon: 'success' })
            }
            writer.onerror = (error) => {
              addLog(
                'capability',
                '文件写入失败',
                error.message || 'writer error',
              )
              uni.showToast({ title: '文件写入失败', icon: 'none' })
            }
            writer.write(content)
          })
        },
      )
    },
    (error) => {
      addLog(
        'capability',
        '文件系统失败',
        error.message || 'requestFileSystem error',
      )
      uni.showToast({ title: '文件系统失败', icon: 'none' })
    },
  )
  // #endif

  // #ifndef APP-PLUS
  uni.setStorageSync('app-capability-demo', content)
  fileContent.value = content
  addLog('capability', '已写入缓存', '非 App 平台使用 storage 降级模拟文件写入')
  uni.showToast({ title: '已写入缓存', icon: 'none' })
  // #endif
}

function readDemoFile() {
  // #ifdef APP-PLUS
  plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
    fs.root.getFile(
      'app-capability-demo.txt',
      { create: false },
      (fileEntry) => {
        fileEntry.file((file) => {
          const reader = new plus.io.FileReader()
          reader.onloadend = (event) => {
            fileContent.value = event.target.result || ''
            addLog('capability', '文件读取成功', fileContent.value)
            uni.showToast({ title: '文件读取成功', icon: 'success' })
          }
          reader.onerror = (error) => {
            addLog(
              'capability',
              '文件读取失败',
              error.message || 'reader error',
            )
            uni.showToast({ title: '文件读取失败', icon: 'none' })
          }
          reader.readAsText(file)
        })
      },
      () => {
        addLog('capability', '文件不存在', '请先点击写文件')
        uni.showToast({ title: '请先写文件', icon: 'none' })
      },
    )
  })
  // #endif

  // #ifndef APP-PLUS
  const content = uni.getStorageSync('app-capability-demo')
  fileContent.value = content || ''
  addLog(
    'capability',
    content ? '已读取缓存' : '缓存为空',
    content || '请先点击写文件',
  )
  uni.showToast({ title: content ? '已读取缓存' : '请先写文件', icon: 'none' })
  // #endif
}

function toggleStatusBar() {
  isDarkStatusBar.value = !isDarkStatusBar.value

  uni.setNavigationBarTitle({
    title: isDarkStatusBar.value ? 'App 能力' : '沉浸状态栏',
  })

  setImmersiveStatusBar({
    frontColor: isDarkStatusBar.value ? '#000000' : '#ffffff',
    backgroundColor: isDarkStatusBar.value ? '#ffffff' : '#028d71',
  })

  addLog(
    'capability',
    '状态栏已切换',
    isDarkStatusBar.value ? '深色文字 / 白色背景' : '浅色文字 / 主题背景',
  )
}

function openAppSettings() {
  // #ifdef APP-PLUS
  if (plus.os.name === 'Android') {
    const Intent = plus.android.importClass('android.content.Intent')
    const Settings = plus.android.importClass('android.provider.Settings')
    const Uri = plus.android.importClass('android.net.Uri')
    const main = plus.android.runtimeMainActivity()
    const intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
    const uri = Uri.fromParts('package', main.getPackageName(), null)
    intent.setData(uri)
    main.startActivity(intent)
    addLog('capability', '已打开设置页', 'Android 应用详情设置')
    return
  }

  plus.runtime.openURL('app-settings:')
  addLog('capability', '已打开设置页', 'iOS App 设置')
  // #endif

  // #ifndef APP-PLUS
  addLog('capability', '设置页不可用', '当前平台不支持打开 App 系统设置页')
  showUnsupported('仅 App 支持')
  // #endif
}

function setClipboard() {
  const data = `剪贴板写入成功 ${formatTime(new Date())}`

  uni.setClipboardData({
    data,
    success: () => {
      addLog('capability', '剪贴板写入成功', data)
    },
    fail: (error) => {
      addLog('capability', '剪贴板写入失败', error.errMsg || '平台不支持')
      uni.showToast({ title: '写入失败', icon: 'none' })
    },
  })
}

function getClipboard() {
  uni.getClipboardData({
    success: (result) => {
      addLog('剪贴板读取成功', '剪贴板读取成功', result.data || '剪贴板为空')
      uni.showToast({ title: '剪贴板读取成功', icon: 'none' })
    },
    fail: (error) => {
      addLog('capability', '剪贴板读取失败', error.errMsg || '平台不支持')
      uni.showToast({ title: '读取失败', icon: 'none' })
    },
  })
}

function vibrateDevice() {
  // App 端直接走 5+ 振动能力，避免某些运行环境对 uni.vibrateShort 额外弹提示。
  // #ifdef APP-PLUS
  plus.device.vibrate(60)
  addLog('capability', '震动成功', '已触发设备短震动')
  // #endif

  // #ifndef APP-PLUS
  uni.vibrateShort({
    type: 'light',
    success: () => {
      addLog('capability', '震动成功', '已触发短震动')
    },
    fail: (error) => {
      addLog('capability', '震动失败', error.errMsg || '设备不支持震动')
    },
  })
  // #endif
}

function makePhoneCall() {
  const phone = '10086'
  uni.makePhoneCall({
    phoneNumber: phone,
    success: () => {
      addLog('capability', '拨号成功', '已拉起系统拨号')
      uni.showToast(phone)
    },
    fail: (error) => {
      addLog('capability', '拨号取消', error.errMsg || '用户取消或平台不支持')
    },
  })
}

function openExternalUrl() {
  const url = 'https://baidu.com'

  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  addLog('capability', '已打开外链', url)
  // #endif

  // #ifdef H5
  window.open(url, '_blank')
  addLog('capability', '已打开外链', url)
  // #endif

  // #ifdef MP
  uni.setClipboardData({ data: url })
  addLog('capability', '外链已复制', '当前平台不支持直接打开外链')
  // #endif
}

function getNetworkStatus() {
  uni.getNetworkType({
    success: (result) => {
      addLog('capability', '网络状态', result.networkType || 'unknown')
    },
    fail: (error) => {
      addLog('capability', '网络状态获取失败', error.errMsg || '平台不支持')
    },
  })
}

function toggleBrightness() {
  isHighBrightness.value = !isHighBrightness.value

  uni.setScreenBrightness({
    value: isHighBrightness.value ? 0.7 : 0.35,
    success: () => {
      addLog(
        'capability',
        '屏幕亮度已调整',
        isHighBrightness.value ? '亮度 70%' : '亮度 35%',
      )
    },
    fail: (error) => {
      addLog('capability', '屏幕亮度调整失败', error.errMsg || '平台不支持')
      uni.showToast({ title: '亮度调整失败', icon: 'none' })
    },
  })
}

function toggleKeepScreenOn() {
  isKeepScreenOn.value = !isKeepScreenOn.value

  uni.setKeepScreenOn({
    keepScreenOn: isKeepScreenOn.value,
    success: () => {
      addLog(
        'capability',
        isKeepScreenOn.value ? '已开启屏幕常亮' : '已关闭屏幕常亮',
        '适用于导航、扫码、长表单填写等场景',
      )
    },
    fail: (error) => {
      addLog('capability', '屏幕常亮设置失败', error.errMsg || '平台不支持')
      uni.showToast({ title: '设置失败', icon: 'none' })
    },
  })
}

function showDeviceInfo() {
  const info = uni.getSystemInfoSync()
  const detail = [
    `brand=${info.brand || '-'}`,
    `model=${info.model || '-'}`,
    `system=${info.system || info.osName || '-'}`,
    `version=${info.version || '-'}`,
    `screen=${info.screenWidth}x${info.screenHeight}`,
    `pixelRatio=${info.pixelRatio || '-'}`,
  ].join(' / ')

  addLog('capability', '设备信息', detail)
}

onMounted(() => {
  getSystemInfo()
})
</script>

<template>
  <view class="min-h-full bg-gray-50">
    <scroll-view scroll-y class="h-full">
      <view class="p-4 space-y-4">
        <view class="overflow-hidden rounded-xl bg-white shadow-sm">
          <view class="bg-primary-500 px-4 py-5 text-white">
            <view class="flex items-center justify-between">
              <view>
                <view class="text-lg font-semibold"> App 能力打通 </view>
                <view class="mt-1 text-xs text-white/80">
                  权限、文件、状态栏、扫码、定位、相册、相机
                </view>
              </view>
              <view class="i-carbon-mobile size-9 text-white/90"></view>
            </view>
          </view>

          <view class="grid grid-cols-2 gap-px bg-gray-100">
            <view class="bg-white px-4 py-3">
              <view class="text-xs text-gray-400"> 平台 </view>
              <view class="mt-1 text-sm text-gray-800 font-medium">
                {{ platformInfo.platform }}
              </view>
            </view>
            <view class="bg-white px-4 py-3">
              <view class="text-xs text-gray-400"> 系统 </view>
              <view class="mt-1 text-sm text-gray-800 font-medium">
                {{ platformInfo.os }}
              </view>
            </view>
            <view class="bg-white px-4 py-3">
              <view class="text-xs text-gray-400"> App 版本 </view>
              <view class="mt-1 text-sm text-gray-800 font-medium">
                {{ platformInfo.appVersion }}
              </view>
            </view>
            <view class="bg-white px-4 py-3">
              <view class="text-xs text-gray-400"> 安全区 </view>
              <view class="mt-1 text-sm text-gray-800 font-medium">
                {{ platformInfo.statusBarHeight }} /
                {{ platformInfo.safeAreaBottom }}
              </view>
            </view>
          </view>
        </view>

        <view
          v-for="group in actionGroups"
          :key="group.title"
          class="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <view class="border-b border-gray-100 px-4 py-3">
            <view class="text-base text-gray-900 font-semibold">
              {{ group.title }}
            </view>
            <view class="mt-1 text-xs leading-5 text-gray-500">
              {{ group.description }}
            </view>
          </view>

          <view class="grid grid-cols-2 gap-3 p-4">
            <view
              v-for="item in group.actions"
              :key="item.key"
              class="flex items-center rounded-lg border border-gray-100 bg-gray-50 px-3 py-3 active:bg-primary-50"
              hover-class="bg-primary-50"
              @click="item.handler"
            >
              <view
                class="mr-2 size-5 flex-none text-primary-500"
                :class="item.icon"
              ></view>
              <view class="min-w-0 flex-1 text-sm text-gray-800 font-medium">
                {{ item.label }}
              </view>
            </view>
          </view>
        </view>

        <view
          v-if="selectedImage"
          class="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <view
            class="border-b border-gray-100 px-4 py-3 text-base text-gray-900 font-semibold"
          >
            图片预览
          </view>
          <view class="p-4">
            <image
              class="h-56 w-full rounded-lg bg-gray-100"
              :src="selectedImage"
              mode="aspectFill"
            />
            <view class="mt-2 break-all text-xs leading-5 text-gray-500">
              {{ selectedImage }}
            </view>
          </view>
        </view>

        <view class="overflow-hidden rounded-xl bg-white shadow-sm">
          <view
            class="border-b border-gray-100 px-4 py-3 text-base text-gray-900 font-semibold"
          >
            文件内容
          </view>
          <view class="min-h-24 px-4 py-3">
            <view
              v-if="fileContent"
              class="whitespace-pre-wrap break-all text-sm leading-6 text-gray-700"
            >
              {{ fileContent }}
            </view>
            <view v-else class="text-sm text-gray-400">
              点击“写文件”后再读取，这里会展示 App 私有目录文件内容。
            </view>
          </view>
        </view>

        <view class="overflow-hidden rounded-xl bg-white shadow-sm">
          <view
            class="border-b border-gray-100 px-4 py-3 text-base text-gray-900 font-semibold"
          >
            操作日志
          </view>
          <view class="divide-y divide-gray-100">
            <view
              v-if="!latestLogs.length"
              class="px-4 py-5 text-center text-sm text-gray-400"
            >
              暂无操作记录
            </view>
            <view v-for="item in latestLogs" :key="item.id" class="px-4 py-3">
              <view class="flex items-center justify-between gap-3">
                <view class="min-w-0 flex-1 text-sm text-gray-800 font-medium">
                  {{ item.title }}
                </view>
                <view class="flex-none text-xs text-gray-400">
                  {{ item.time }}
                </view>
              </view>
              <view
                v-if="item.detail"
                class="mt-1 break-all text-xs leading-5 text-gray-500"
              >
                {{ item.detail }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
