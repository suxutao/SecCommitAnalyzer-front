<template>
  <div class="dark-chart-container">
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

// 接收父组件传入的数据
const props = defineProps({
  chartData: {
    type: Array,
    required: true,
    default: () => []
  }
})

const chartRef = ref(null)
let chartInstance = null

// 初始化深色模式图表
const initChart = () => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  chartInstance = echarts.init(chartRef.value)
  
  // 处理数据
  const seriesData = props.chartData.map(item => ({
    name: item.type,
    value: item.count
  }))
  
  const colors = props.chartData.map(item => item.color)
  
  // 深色模式配置
  const option = {
    // 图表背景色（深色）
    backgroundColor: 'transparent',
    color: colors,
    
    // 提示框样式（深色适配）
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(30, 30, 30, 0.9)', // 深色半透明背景
      borderColor: '#444',
      textStyle: { color: '#fff' } // 提示框文字白色
    },
    
    // 图例样式
    legend: {
      top: 'bottom',
      textStyle: { 
        color: '#ccc' // 图例文字浅灰色
      },
      itemWidth: 12,
      itemHeight: 12
    },
    
    series: [{
      type: 'pie',
      radius: '55%',
      data: seriesData,
      // 扇区样式（深色背景下增加边框）
      itemStyle: {
        borderColor: '#445266', // 深色边框与背景融合
        borderWidth: 2
      },
      // 隐藏内部标签
      label: {
        show: false
      },
      // 高亮状态（hover时）
      emphasis: {
        label: {
          show: false,
          color: '#fff', // 高亮文字白色
          fontSize: 14,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影增强立体感
        }
      }
    }]
  }
  
  chartInstance.setOption(option)
}

// 生命周期管理
onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chartInstance?.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => chartInstance?.resize())
  chartInstance?.dispose()
})

// 数据变化重新渲染
watch(() => props.chartData, initChart, { deep: true })
</script>

<style scoped>
.dark-chart-container {
  width: 100%;
  box-sizing: border-box;
  background-color: #445266; /* 深色容器背景 */
  border-radius: 8px;
}

.chart-wrapper {
  width: 100%;
  height: 450px;
}
</style>
