<script setup>
import { sleep } from '@/utils'

const formData = ref({
  name: '',
  gender: '',
  department: '',
  position: '',
  email: '',
  phone: '',
  idCard: '',
  address: '',
  education: '',
  graduateSchool: '',
  joinDate: '',
  emergencyContact: '',
  emergencyPhone: '',
  remark: '',
})

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
]

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
  { label: '运营部', value: 'operation' },
  { label: '市场部', value: 'market' },
  { label: '人力资源部', value: 'hr' },
]

const positionOptions = [
  { label: '工程师', value: 'engineer' },
  { label: '高级工程师', value: 'senior_engineer' },
  { label: '技术专家', value: 'tech_expert' },
  { label: '产品经理', value: 'pm' },
  { label: '设计师', value: 'designer' },
  { label: '运营专员', value: 'operator' },
  { label: '市场专员', value: 'marketer' },
  { label: 'HR', value: 'hr' },
]

const educationOptions = [
  { label: '高中', value: 'high_school' },
  { label: '大专', value: 'college' },
  { label: '本科', value: 'bachelor' },
  { label: '硕士', value: 'master' },
  { label: '博士', value: 'doctor' },
]

const isSubmitting = ref(false)

function validateForm() {
  if (!formData.value.name) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return false
  }

  if (!formData.value.gender) {
    uni.showToast({ title: '请选择性别', icon: 'none' })
    return false
  }

  if (!formData.value.department) {
    uni.showToast({ title: '请选择部门', icon: 'none' })
    return false
  }

  if (!formData.value.position) {
    uni.showToast({ title: '请选择职位', icon: 'none' })
    return false
  }

  if (!formData.value.phone) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return false
  }

  const phoneReg = /^1[3-9]\d{9}$/
  if (!phoneReg.test(formData.value.phone)) {
    uni.showToast({ title: '手机号格式不正确', icon: 'none' })
    return false
  }

  if (formData.value.email) {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailReg.test(formData.value.email)) {
      uni.showToast({ title: '邮箱格式不正确', icon: 'none' })
      return false
    }
  }

  if (formData.value.idCard) {
    const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!idCardReg.test(formData.value.idCard)) {
      uni.showToast({ title: '身份证号格式不正确', icon: 'none' })
      return false
    }
  }

  return true
}

async function mockSubmit(data) {
  await sleep(1000 + Math.random() * 1000)

  if (Math.random() < 0.1) {
    throw new Error('网络异常，请稍后重试')
  }

  return {
    code: 200,
    message: '提交成功',
    data: {
      id: Date.now(),
      ...data,
    },
  }
}

async function handleSubmit() {
  if (!validateForm())
    return

  try {
    isSubmitting.value = true

    const result = await mockSubmit(formData.value)

    if (result.code === 200) {
      uni.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
      })

      setTimeout(() => {
        handleReset()
      }, 2000)
    }
    else {
      throw new Error(result.message || '提交失败')
    }
  }
  catch (error) {
    console.error('提交失败:', error)
    uni.showToast({
      title: error.message || '提交失败',
      icon: 'none',
      duration: 2000,
    })
  }
  finally {
    isSubmitting.value = false
  }
}

function handleReset() {
  formData.value = {
    name: '',
    gender: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    idCard: '',
    address: '',
    education: '',
    graduateSchool: '',
    joinDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    remark: '',
  }
}

function handleDateChange(e) {
  formData.value.joinDate = e.detail.value
}
</script>

<template>
  <view class="h-full flex flex-col bg-gray-50">
    <scroll-view scroll-y class="flex-1">
      <view class="p-4 space-y-4">
        <!-- 基本信息 -->
        <view class="overflow-hidden rounded-2xl bg-white shadow-sm">
          <view class="border-b border-gray-100 px-4 py-3">
            <text class="text-base text-gray-900 font-semibold">基本信息</text>
          </view>

          <view class="p-4 space-y-4">
            <!-- 姓名 -->
            <view class="space-y-2">
              <view class="flex items-center">
                <text class="text-sm text-gray-700 font-medium">姓名</text>
                <text class="ml-1 text-red-500">*</text>
              </view>
              <input
                v-model="formData.name"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入姓名"
                placeholder-class="text-gray-400"
              />
            </view>

            <!-- 性别 -->
            <view class="space-y-2">
              <view class="flex items-center">
                <text class="text-sm text-gray-700 font-medium">性别</text>
                <text class="ml-1 text-red-500">*</text>
              </view>
              <view class="flex space-x-3">
                <view
                  v-for="option in genderOptions"
                  :key="option.value"
                  class="flex flex-1 items-center justify-center rounded-lg border py-3 transition-colors"
                  :class="formData.gender === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-700'"
                  @click="formData.gender = option.value"
                >
                  <text class="text-sm font-medium">{{ option.label }}</text>
                </view>
              </view>
            </view>

            <!-- 部门 -->
            <view class="space-y-2">
              <view class="flex items-center">
                <text class="text-sm text-gray-700 font-medium">部门</text>
                <text class="ml-1 text-red-500">*</text>
              </view>
              <picker
                mode="selector"
                :range="departmentOptions"
                range-key="label"
                @change="e => formData.department = departmentOptions[e.detail.value].value"
              >
                <view class="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4" style="height: 44px;">
                  <text class="text-sm" :class="formData.department ? 'text-gray-900' : 'text-gray-400'">
                    {{ formData.department ? departmentOptions.find(d => d.value === formData.department)?.label : '请选择部门' }}
                  </text>
                  <view class="i-carbon-chevron-down h-4 w-4 text-gray-400"></view>
                </view>
              </picker>
            </view>

            <!-- 职位 -->
            <view class="space-y-2">
              <view class="flex items-center">
                <text class="text-sm text-gray-700 font-medium">职位</text>
                <text class="ml-1 text-red-500">*</text>
              </view>
              <picker
                mode="selector"
                :range="positionOptions"
                range-key="label"
                @change="e => formData.position = positionOptions[e.detail.value].value"
              >
                <view class="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4" style="height: 44px;">
                  <text class="text-sm" :class="formData.position ? 'text-gray-900' : 'text-gray-400'">
                    {{ formData.position ? positionOptions.find(p => p.value === formData.position)?.label : '请选择职位' }}
                  </text>
                  <view class="i-carbon-chevron-down h-4 w-4 text-gray-400"></view>
                </view>
              </picker>
            </view>

            <!-- 入职日期 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">入职日期</text>
              <picker mode="date" :value="formData.joinDate" @change="handleDateChange">
                <view class="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4" style="height: 44px;">
                  <text class="text-sm" :class="formData.joinDate ? 'text-gray-900' : 'text-gray-400'">
                    {{ formData.joinDate || '请选择入职日期' }}
                  </text>
                  <view class="i-carbon-calendar h-4 w-4 text-gray-400"></view>
                </view>
              </picker>
            </view>
          </view>
        </view>

        <!-- 联系方式 -->
        <view class="overflow-hidden rounded-2xl bg-white shadow-sm">
          <view class="border-b border-gray-100 px-4 py-3">
            <text class="text-base text-gray-900 font-semibold">联系方式</text>
          </view>

          <view class="p-4 space-y-4">
            <!-- 手机号 -->
            <view class="space-y-2">
              <view class="flex items-center">
                <text class="text-sm text-gray-700 font-medium">手机号</text>
                <text class="ml-1 text-red-500">*</text>
              </view>
              <input
                v-model="formData.phone"
                type="number"
                maxlength="11"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入手机号"
                placeholder-class="text-gray-400"
              />
            </view>

            <!-- 邮箱 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">邮箱</text>
              <input
                v-model="formData.email"
                type="text"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入邮箱"
                placeholder-class="text-gray-400"
              />
            </view>

            <!-- 身份证号 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">身份证号</text>
              <input
                v-model="formData.idCard"
                type="idcard"
                maxlength="18"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入身份证号"
                placeholder-class="text-gray-400"
              />
            </view>

            <!-- 地址 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">居住地址</text>
              <textarea
                v-model="formData.address"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                placeholder="请输入居住地址"
                placeholder-class="text-gray-400"
                :auto-height="true"
                :maxlength="200"
              />
            </view>
          </view>
        </view>

        <!-- 教育背景 -->
        <view class="overflow-hidden rounded-2xl bg-white shadow-sm">
          <view class="border-b border-gray-100 px-4 py-3">
            <text class="text-base text-gray-900 font-semibold">教育背景</text>
          </view>

          <view class="p-4 space-y-4">
            <!-- 学历 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">学历</text>
              <picker
                mode="selector"
                :range="educationOptions"
                range-key="label"
                @change="e => formData.education = educationOptions[e.detail.value].value"
              >
                <view class="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4" style="height: 44px;">
                  <text class="text-sm" :class="formData.education ? 'text-gray-900' : 'text-gray-400'">
                    {{ formData.education ? educationOptions.find(e => e.value === formData.education)?.label : '请选择学历' }}
                  </text>
                  <view class="i-carbon-chevron-down h-4 w-4 text-gray-400"></view>
                </view>
              </picker>
            </view>

            <!-- 毕业院校 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">毕业院校</text>
              <input
                v-model="formData.graduateSchool"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入毕业院校"
                placeholder-class="text-gray-400"
              />
            </view>
          </view>
        </view>

        <!-- 紧急联系人 -->
        <view class="overflow-hidden rounded-2xl bg-white shadow-sm">
          <view class="border-b border-gray-100 px-4 py-3">
            <text class="text-base text-gray-900 font-semibold">紧急联系人</text>
          </view>

          <view class="p-4 space-y-4">
            <!-- 联系人姓名 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">联系人姓名</text>
              <input
                v-model="formData.emergencyContact"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入紧急联系人姓名"
                placeholder-class="text-gray-400"
              />
            </view>

            <!-- 联系人电话 -->
            <view class="space-y-2">
              <text class="text-sm text-gray-700 font-medium">联系人电话</text>
              <input
                v-model="formData.emergencyPhone"
                type="number"
                maxlength="11"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400"
                style="height: 44px;"
                placeholder="请输入紧急联系人电话"
                placeholder-class="text-gray-400"
              />
            </view>
          </view>
        </view>

        <!-- 备注 -->
        <view class="overflow-hidden rounded-2xl bg-white shadow-sm">
          <view class="border-b border-gray-100 px-4 py-3">
            <text class="text-base text-gray-900 font-semibold">备注信息</text>
          </view>

          <view class="p-4">
            <textarea
              v-model="formData.remark"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
              placeholder="请输入备注信息"
              placeholder-class="text-gray-400"
              :auto-height="true"
              :maxlength="500"
            />
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="border-t border-gray-200 bg-white px-4 py-3">
      <view class="flex space-x-3">
        <button
          class="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-sm text-gray-700 font-medium transition-transform active:scale-98"
          @click="handleReset"
        >
          重置
        </button>
        <button
          class="flex-1 rounded-lg bg-blue-500 py-3 text-sm text-white font-medium transition-transform active:scale-98"
          :class="isSubmitting ? 'opacity-60' : ''"
          :disabled="isSubmitting"
          @click="handleSubmit"
        >
          {{ isSubmitting ? '提交中...' : '提交' }}
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped>
input,
textarea {
  box-sizing: border-box;
}

textarea {
  min-height: 80px;
  line-height: 1.5;
}
</style>
