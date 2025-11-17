import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { updateCrawl, startCrawl, stopCrawl } from '@/api/data'

export const useSpiderStore = defineStore('spider', () => {
  // 爬虫运行状态
  const isRunning = ref(false)

  // 爬虫配置参数
  const selectedTimeInterval = ref(5)
  const selectedRecordCount = ref(10)
  const startTime = ref(new Date(2025, 9, 1, 0, 0, 0))

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

  const updateConfig = async () => {
    const config = {
      interval_seconds: selectedTimeInterval.value,
      max_commits_per_run: selectedRecordCount.value,
      since: startTime.value
    }
    await updateCrawl(config)
    ElMessage.success('更新配置成功')
    console.log('更新配置成功，间隔时间：', selectedTimeInterval.value, '秒钟，每次爬取：', selectedRecordCount.value, '条，开始时间：', startTime.value)
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
    selectedTimeInterval,
    selectedRecordCount,
    setStartTime,
    startSpider,
    stopSpider,
    setTimeInterval,
    setRecordCount,
    updateConfig
  }
})