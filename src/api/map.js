const AMAP_KEY = 'c808ea9aa9e1ecb1e633591b6209f6a1'
const BASE_URL = 'https://restapi.amap.com/v3'

function requestAmapRoute(path, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${path}`,
      data: {
        key: AMAP_KEY,
        ...data,
      },
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}

export function getWalkingRoute(origin, destination) {
  return requestAmapRoute('/direction/walking', {
    origin,
    destination,
    extensions: 'base',
  })
}

export function getBicyclingRoute(origin, destination) {
  return requestAmapRoute('/direction/bicycling', {
    origin,
    destination,
    extensions: 'base',
  })
}

export function getDrivingRoute(origin, destination) {
  return requestAmapRoute('/direction/driving', {
    origin,
    destination,
    extensions: 'all',
  })
}
