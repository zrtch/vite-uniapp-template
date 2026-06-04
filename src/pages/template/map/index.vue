<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getBicyclingRoute, getDrivingRoute, getWalkingRoute } from '@/api/map'

const fallbackLocation = {
  latitude: 31.230416,
  longitude: 121.473701,
  title: '模拟当前位置',
  address: '上海市黄浦区人民广场附近',
}

const mockPlaces = [
  {
    id: 1,
    title: '人民广场服务站',
    type: '服务站',
    address: '黄浦区人民大道 201 号',
    latitude: 31.23281,
    longitude: 121.4752,
    distance: '420m',
    eta: '6分钟',
    status: '营业中',
  },
  {
    id: 2,
    title: '南京东路体验点',
    type: '门店',
    address: '黄浦区南京东路 558 号',
    latitude: 31.23719,
    longitude: 121.48362,
    distance: '1.3km',
    eta: '15分钟',
    status: '营业中',
  },
  {
    id: 3,
    title: '外滩交付中心',
    type: '交付点',
    address: '黄浦区中山东一路 18 号',
    latitude: 31.24048,
    longitude: 121.49071,
    distance: '2.1km',
    eta: '24分钟',
    status: '繁忙',
  },
  {
    id: 4,
    title: '新天地运营点',
    type: '运营点',
    address: '黄浦区马当路 245 号',
    latitude: 31.21992,
    longitude: 121.47516,
    distance: '1.6km',
    eta: '18分钟',
    status: '营业中',
  },
]

const location = ref({ ...fallbackLocation })
const selectedPlaceId = ref(mockPlaces[0].id)
const isLocating = ref(false)
const routeMode = ref('walk')
const routeData = ref(null)
const scale = ref(14)

const selectedPlace = computed(() => {
  return (
    mockPlaces.find((item) => item.id === selectedPlaceId.value) ||
    mockPlaces[0]
  )
})

const markers = computed(() => {
  const currentMarker = {
    id: 1000,
    latitude: location.value.latitude,
    longitude: location.value.longitude,
    title: '当前位置',
    width: 28,
    height: 28,
    callout: {
      content: location.value.title,
      color: '#028d71',
      fontSize: 12,
      borderRadius: 6,
      padding: 6,
      display: 'ALWAYS',
    },
  }

  return [
    currentMarker,
    ...mockPlaces.map((item) => ({
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      title: item.title,
      width: selectedPlaceId.value === item.id ? 36 : 30,
      height: selectedPlaceId.value === item.id ? 36 : 30,
      callout: {
        content: item.title,
        color: selectedPlaceId.value === item.id ? '#028d71' : '#374151',
        fontSize: 12,
        borderRadius: 6,
        padding: 6,
        display: selectedPlaceId.value === item.id ? 'ALWAYS' : 'BYCLICK',
      },
    })),
  ]
})

const routePoints = computed(() => {
  if (routeData.value && routeData.value.route && routeData.value.route.paths) {
    const polyline = []
    const steps = routeData.value.route.paths[0].steps
    steps.forEach((step) => {
      if (step.polyline) {
        step.polyline.split(';').forEach((p) => {
          const [lng, lat] = p.split(',')
          polyline.push({
            latitude: Number.parseFloat(lat),
            longitude: Number.parseFloat(lng),
          })
        })
      }
    })
    return polyline
  }
  const target = selectedPlace.value
  const start = {
    latitude: location.value.latitude,
    longitude: location.value.longitude,
  }
  return [start, { latitude: target.latitude, longitude: target.longitude }]
})

async function fetchRoute() {
  console.log('--- 调试 API 请求 ---')
  console.log('Location:', location.value)
  console.log('SelectedPlace:', selectedPlace.value)

  if (!location.value.latitude || !selectedPlace.value.latitude) {
    console.error('坐标无效，跳过请求')
    return
  }

  try {
    const origin = `${location.value.longitude},${location.value.latitude}`
    const destination = `${selectedPlace.value.longitude},${selectedPlace.value.latitude}`

    let res
    if (routeMode.value === 'walk') {
      res = await getWalkingRoute(origin, destination)
    } else if (routeMode.value === 'ride') {
      res = await getBicyclingRoute(origin, destination)
    } else {
      res = await getDrivingRoute(origin, destination)
    }

    const response = Array.isArray(res) ? res[1] : res

    if (response && response.data && response.data.status === '1') {
      routeData.value = response.data
    } else {
      console.error('高德 API 错误:', response ? response.data : res)
      routeData.value = null
    }
  } catch (error) {
    console.error('API 请求异常:', error)
    routeData.value = null
  }
}

watch([location, selectedPlaceId, routeMode], fetchRoute, { immediate: true })

const polyline = computed(() => [
  {
    points: routePoints.value,
    color: '#028d71',
    width: 6,
    dottedLine: false,
    arrowLine: true,
  },
])

const routeSummary = computed(() => {
  const modeMap = {
    walk: { label: '步行', speed: 1, icon: 'i-carbon-pedestrian' },
    ride: { label: '骑行', speed: 0.45, icon: 'i-carbon-bicycle' },
    drive: { label: '驾车', speed: 0.25, icon: 'i-carbon-car' },
  }
  const mode = modeMap[routeMode.value]

  if (routeData.value && routeData.value.route && routeData.value.route.paths) {
    const path = routeData.value.route.paths[0]
    return {
      ...mode,
      distance: `${(Number.parseInt(path.distance) / 1000).toFixed(1)}km`,
      duration: `${Math.round(Number.parseInt(path.duration) / 60)}分钟`,
      steps: path.steps.map((s) => s.instruction),
    }
  }

  const distance = calculateDistance(location.value, selectedPlace.value)
  const minutes = Math.max(3, Math.round(distance * 14 * mode.speed))
  return {
    ...mode,
    distance:
      distance < 1
        ? `${Math.round(distance * 1000)}m`
        : `${distance.toFixed(1)}km`,
    duration: `${minutes}分钟`,
    steps: [
      '从当前位置出发，沿主路向目标方向前进',
      '经过模拟路口后继续沿规划路线行进',
      `到达${selectedPlace.value.title}`,
    ],
  }
})

function calculateDistance(start, end) {
  const radLat1 = (start.latitude * Math.PI) / 180
  const radLat2 = (end.latitude * Math.PI) / 180
  const deltaLat = radLat1 - radLat2
  const deltaLng = ((start.longitude - end.longitude) * Math.PI) / 180
  const distance =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(deltaLat / 2) ** 2 +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLng / 2) ** 2,
      ),
    )

  return Math.round(distance * 6378.137 * 10) / 10
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

function getLocation() {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      ...getLocationOptions(),
      success: resolve,
      fail: reject,
    })
  })
}

function getLocationAddress(result) {
  return (
    result.address?.poiName ||
    result.address?.street ||
    result.address?.district ||
    result.address?.city ||
    '已定位到当前位置'
  )
}

function createLocation(result) {
  const latitude = Number(result.latitude)
  const longitude = Number(result.longitude)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new TypeError('定位坐标无效')
  }

  return {
    latitude,
    longitude,
    title: '当前位置',
    address: getLocationAddress(result),
  }
}

async function locateUser() {
  try {
    isLocating.value = true
    const result = await getLocation()
    location.value = createLocation(result)
    scale.value = 15
    uni.showToast({ title: '定位成功', icon: 'success' })
  } catch (error) {
    console.warn('定位失败，使用模拟定位:', error)
    location.value = { ...fallbackLocation }
    uni.showToast({ title: '已使用模拟定位', icon: 'none' })
  } finally {
    isLocating.value = false
  }
}

function resetLocation() {
  location.value = { ...fallbackLocation }
  scale.value = 14
  uni.showToast({ title: '已回到模拟位置', icon: 'none' })
}

function onMarkerTap(event) {
  const id = event.detail.markerId

  if (id === 1000) return

  selectedPlaceId.value = id
}

function selectPlace(item) {
  selectedPlaceId.value = item.id
  scale.value = 15
}

function setRouteMode(mode) {
  routeMode.value = mode
}

function startNavigation() {
  uni.showToast({
    title: `已生成到${selectedPlace.value.title}的${routeSummary.value.label}路线`,
    icon: 'none',
  })
}

onMounted(() => {
  locateUser()
})
</script>

<template>
  <view class="h-full flex flex-col bg-gray-50">
    <view class="relative h-[52vh] flex-none overflow-hidden bg-gray-100">
      <map
        class="size-full"
        :latitude="location.latitude"
        :longitude="location.longitude"
        :scale="scale"
        :markers="markers"
        :polyline="polyline"
        show-location
        @markertap="onMarkerTap"
      />

      <view class="absolute left-3 right-3 top-3 flex items-center gap-2">
        <view
          class="min-w-0 flex flex-1 items-center rounded-xl bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm"
        >
          <view
            class="i-carbon-location-current mr-2 size-5 flex-none text-primary-500"
          ></view>
          <view class="min-w-0 flex-1">
            <view class="truncate text-sm text-gray-900 font-semibold">
              {{ location.title }}
            </view>
            <view class="truncate text-xs text-gray-500">
              {{ location.address }}
            </view>
          </view>
        </view>

        <button
          class="m-0 h-11 w-11 flex flex-none items-center justify-center rounded-xl bg-white/95 p-0 shadow-sm"
          :loading="isLocating"
          @click="locateUser"
        >
          <view
            v-if="!isLocating"
            class="i-carbon-location size-5 text-primary-500"
          ></view>
        </button>
      </view>

      <view
        class="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 p-3 shadow-sm backdrop-blur-sm"
      >
        <view class="mb-3 flex items-center justify-between">
          <view class="min-w-0 flex-1">
            <view class="truncate text-base text-gray-900 font-semibold">
              {{ selectedPlace.title }}
            </view>
            <view class="mt-1 flex items-center text-xs text-gray-500">
              <text>{{ selectedPlace.type }}</text>
              <text class="mx-2 text-gray-300"> | </text>
              <text>{{ selectedPlace.address }}</text>
            </view>
          </view>
          <view
            class="ml-3 flex-none rounded-full bg-primary-50 px-2 py-1 text-xs text-primary-600"
          >
            {{ selectedPlace.status }}
          </view>
        </view>

        <view class="grid grid-cols-3 gap-2 text-center">
          <view class="rounded-lg bg-gray-50 py-2">
            <view class="text-xs text-gray-500"> 距离 </view>
            <view class="mt-1 text-sm text-gray-900 font-semibold">
              {{ routeSummary.distance }}
            </view>
          </view>
          <view class="rounded-lg bg-gray-50 py-2">
            <view class="text-xs text-gray-500"> 预计 </view>
            <view class="mt-1 text-sm text-gray-900 font-semibold">
              {{ routeSummary.duration }}
            </view>
          </view>
          <view class="rounded-lg bg-gray-50 py-2">
            <view class="text-xs text-gray-500"> 方式 </view>
            <view
              class="mt-1 flex items-center justify-center text-sm text-gray-900 font-semibold"
            >
              <view class="mr-1 size-4" :class="routeSummary.icon"></view>
              {{ routeSummary.label }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="h-0 flex-1">
      <view class="p-4 space-y-4">
        <view class="rounded-xl bg-white p-3 shadow-sm">
          <view class="mb-3 flex items-center justify-between">
            <view class="text-base text-gray-900 font-semibold">
              路径规划
            </view>
            <view class="text-xs text-gray-500"> 模拟路线 </view>
          </view>

          <view class="grid grid-cols-3 gap-2">
            <view
              v-for="item in [
                { label: '步行', value: 'walk', icon: 'i-carbon-pedestrian' },
                { label: '骑行', value: 'ride', icon: 'i-carbon-bicycle' },
                { label: '驾车', value: 'drive', icon: 'i-carbon-car' },
              ]"
              :key="item.value"
              class="flex items-center justify-center rounded-lg border py-2 text-sm transition-colors"
              :class="
                routeMode === item.value
                  ? 'border-primary-500 bg-primary-50 text-primary-600 font-semibold'
                  : 'border-gray-100 bg-gray-50 text-gray-600'
              "
              @click="setRouteMode(item.value)"
            >
              <view class="mr-1 size-4" :class="item.icon"></view>
              {{ item.label }}
            </view>
          </view>

          <view class="mt-4 space-y-3">
            <view
              v-for="(step, index) in routeSummary.steps"
              :key="step"
              class="flex items-start"
            >
              <view
                class="mr-3 mt-0.5 h-5 w-5 flex flex-none items-center justify-center rounded-full bg-primary-50 text-xs text-primary-600 font-semibold"
              >
                {{ index + 1 }}
              </view>
              <view class="min-w-0 flex-1 text-sm text-gray-700 leading-5">
                {{ step }}
              </view>
            </view>
          </view>

          <view class="mt-4 grid grid-cols-2 gap-3">
            <button
              class="m-0 h-11 rounded-lg bg-gray-100 p-0 text-sm text-gray-700"
              @click="resetLocation"
            >
              重置位置
            </button>
            <button
              class="m-0 h-11 rounded-lg bg-primary-500 p-0 text-sm text-white"
              @click="startNavigation"
            >
              开始导航
            </button>
          </view>
        </view>

        <view class="rounded-xl bg-white p-3 shadow-sm">
          <view class="mb-3 flex items-center justify-between">
            <view class="text-base text-gray-900 font-semibold">
              附近 marker
            </view>
            <view class="text-xs text-gray-500">
              {{ mockPlaces.length }} 个点位
            </view>
          </view>

          <view class="space-y-2">
            <view
              v-for="item in mockPlaces"
              :key="item.id"
              class="flex items-center rounded-xl border p-3 transition-colors"
              :class="
                selectedPlaceId === item.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-100 bg-white'
              "
              @click="selectPlace(item)"
            >
              <view
                class="mr-3 h-10 w-10 flex flex-none items-center justify-center rounded-xl"
                :class="
                  selectedPlaceId === item.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                "
              >
                <view class="i-carbon-location-filled size-5"></view>
              </view>
              <view class="min-w-0 flex-1">
                <view class="flex items-center">
                  <view class="truncate text-sm text-gray-900 font-semibold">
                    {{ item.title }}
                  </view>
                  <view
                    class="ml-2 flex-none rounded bg-gray-100 px-1.5 py-0.5 text-2xs text-gray-500"
                  >
                    {{ item.type }}
                  </view>
                </view>
                <view class="mt-1 truncate text-xs text-gray-500">
                  {{ item.address }}
                </view>
              </view>
              <view class="ml-3 flex-none text-right">
                <view class="text-sm text-gray-900 font-semibold">
                  {{ item.distance }}
                </view>
                <view class="mt-1 text-xs text-gray-500">
                  {{ item.eta }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
