import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

export const useSpiderStore = defineStore('spider', () => {
  // 爬虫运行状态
  const isRunning = ref(false)

  // 爬虫配置参数
  const selectedTimeInterval = ref(5)
  const selectedRecordCount = ref(10)

  // 控制爬虫的方法
  function startSpider() {
    isRunning.value = true
    ElMessage.success('开始爬虫')
    console.log('开始爬虫，间隔时间：', selectedTimeInterval.value, '秒钟，每次爬取：', selectedRecordCount.value, '条')
  }

  function stopSpider() {
    isRunning.value = false
    ElMessage.info('停止爬虫')
    console.log('停止爬虫')
  }

  function setTimeInterval(interval) {
    selectedTimeInterval.value = interval
  }

  function setRecordCount(count) {
    selectedRecordCount.value = count
  }

  return {
    isRunning,
    selectedTimeInterval,
    selectedRecordCount,
    startSpider,
    stopSpider,
    setTimeInterval,
    setRecordCount
  }
})