<template>
  <div class="chart-outer-container">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    <div ref="chartContainer" class="chart-inner-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: { type: String, default: '' },
  data: {
    type: Array,
    required: true,
    validator: (val) => val.length > 0 && val.every(item => item.date && typeof item.scans === 'number')
  },
  // 图表高度（核心：通过此属性调整高度）
  height: { type: Number, default: 200 },
  lineColor: { type: String, default: '#42b983' },
  // 新增：x轴标签名称（如“日期”）
  xAxisLabel: { type: String, default: '日期' },
  // 新增：y轴标签名称（如“扫描数”）
  yAxisLabel: { type: String, default: '扫描提交数' }
})

const chartContainer = ref(null)
let chartInstance = null

const initChart = async () => {
  await nextTick()
  if (!chartContainer.value) return

  // 强制应用高度
  chartContainer.value.style.height = `${props.height}px`

  const { clientWidth, clientHeight } = chartContainer.value
  if (clientWidth === 0 || clientHeight === 0) {
    console.warn('容器尺寸异常，使用默认尺寸')
    chartContainer.value.style.width = '100%'
    chartContainer.value.style.height = `${props.height}px`
  }

  if (chartInstance) chartInstance.dispose()
  
  try {
    chartInstance = echarts.init(chartContainer.value)
    const xAxisData = props.data.map(item => item.date)
    const seriesData = props.data.map(item => item.scans)

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(20, 20, 20, 0.9)',
        textStyle: { color: '#fff' }
      },
      grid: { left: '6%', right: '6%', bottom: '18%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: xAxisData,
        // 新增：x轴标签（坐标名称）
        name: props.xAxisLabel,  // x轴标签文本
        nameLocation: 'middle',  // 标签位置（中间）
        nameGap: 30,             // 标签与轴线的距离
        nameTextStyle: {         // 标签样式
          color: '#ccc',
          fontSize: 14
        },
        axisLine: { lineStyle: { color: '#666' } },
        axisLabel: {
          color: '#ccc',
          fontSize: 12,
          rotate: 30
        }
      },
      yAxis: {
        type: 'value',
        // 新增：y轴标签（坐标名称）
        name: props.yAxisLabel,  // y轴标签文本
        nameLocation: 'middle',  // 标签位置
        nameGap: 40,             // 标签与轴线的距离
        nameTextStyle: {         // 标签样式
          color: '#ccc',
          fontSize: 14
        },
        axisLine: { lineStyle: { color: '#666' } },
        axisLabel: { color: '#ccc', fontSize: 12 },
        splitLine: { lineStyle: { color: '#333' } },
        min: 0
      },
      series: [{
        data: seriesData,
        type: 'line',
        smooth: true,
        lineStyle: { width: 2, color: props.lineColor },
        itemStyle: { color: props.lineColor },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: `${props.lineColor}33` },
              { offset: 1, color: `${props.lineColor}00` }
            ]
          }
        }
      }]
    }

    chartInstance.setOption(option)
  } catch (error) {
    console.error('图表初始化失败:', error)
  }
}

// 监听高度变化，实时更新
watch(() => props.height, () => {
  if (chartContainer.value) {
    chartContainer.value.style.height = `${props.height}px`
    chartInstance?.resize()
  }
}, { immediate: true })

// 其他生命周期和监听逻辑
onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chartInstance?.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => chartInstance?.resize())
  chartInstance?.dispose()
})

watch(() => [props.data, props.xAxisLabel, props.yAxisLabel], initChart, { deep: true })
</script>

<style scoped>
.chart-outer-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #445266;
  border-radius: 8px;
  margin-bottom: 20px;
}

.chart-title {
  color: #f0f0f0;
  font-size: 16px;
  margin: 0 0 15px 0;
}

/* 图表容器：宽度100%，高度由JS动态设置 */
.chart-inner-container {
  width: 100%;
}
</style>
