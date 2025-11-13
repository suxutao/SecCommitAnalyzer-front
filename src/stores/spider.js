import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSpiderStore = defineStore('spider', () => {
  // 爬虫运行状态
  const isRunning = ref(false)

  // 爬虫配置参数
  const selectedTimeInterval = ref(10) // 默认10分钟
  const selectedRecordCount = ref(20) // 默认20条

  // 控制爬虫的方法
  function startSpider() {
    isRunning.value = true
    console.log('开始爬虫，间隔时间：', selectedTimeInterval.value, '分钟，每次爬取：', selectedRecordCount.value, '条')
  }

  function stopSpider() {
    isRunning.value = false
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