import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { updateCrawl, startCrawl, stopCrawl } from '@/api/data'
import { useDateFormat } from '@vueuse/core'



export const useSpiderStore = defineStore('spider', () => {
  // 爬虫运行状态
  const isRunning = ref(false)

  // 爬虫配置参数
  const selectedTimeInterval = ref(5)
  const selectedRecordCount = ref(10)
  const startTime = ref('2025-10-01 00:00:00')

  // 控制爬虫的方法
  const startSpider = async () => {
    isRunning.value = true
    await startCrawl()
    ElMessage.success('开始爬虫')
    console.log('开始爬虫，间隔时间：', selectedTimeInterval.value, '秒钟，每次爬取：', selectedRecordCount.value, '条')
  }

  const stopSpider = async () => {
    isRunning.value = false
    await stopCrawl()
    ElMessage.info('停止爬虫')
    console.log('停止爬虫')
  }

  const setTimeInterval = async (interval) => {
    selectedTimeInterval.value = interval
    await updateConfig()
  }

  const setRecordCount = async (count) => {
    selectedRecordCount.value = count
    await updateConfig()  
  }

  const setStartTime = async (time) => {
    startTime.value = time
    await updateConfig()  
  }

  return {
    isRunning,
    startTime,
    selectedTimeInterval,
    selectedRecordCount,
    setStartTime,
    startSpider,
    stopSpider,
    setTimeInterval,
    setRecordCount
  }
})