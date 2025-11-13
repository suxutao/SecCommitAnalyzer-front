<script setup>
import { watch } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import { useSpiderStore } from '../stores/spider'
import { useIntervalFn } from '@vueuse/core'
import { crawl } from '@/api/data'

// 初始化spider store
const spiderStore = useSpiderStore()

const pa = async () => {
  console.log(spiderStore.selectedTimeInterval);
  
  // await crawl({
  //   timeInterval: spiderStore.selectedTimeInterval.value,
  //   recordCount: spiderStore.selectedRecordCount.value
  // })
}

const { pause, resume, isActive } = useIntervalFn(
  pa,
  () => spiderStore.selectedTimeInterval * 1000,
  {
    immediate: false,
    immediateCallback: true
  }
);

watch(
  () => spiderStore.isRunning,
  (newVal) => {
    if (newVal) {
      resume(); // 使用 resume 而不是 start
    } else {
      pause();  // 使用 pause 而不是 stop
    }
  },
  {
    immediate: true
  }
);


// 时间间隔选项
const timeIntervalOptions = [
  { label: '1秒钟', value: 1 },
  { label: '5秒钟', value: 5 },
  { label: '10秒钟', value: 10 },
  { label: '30秒钟', value: 30 },
  { label: '1分钟', value: 60 },
  { label: '2分钟', value: 120 },
  { label: '5分钟', value: 300 },
  { label: '10分钟', value: 600 },
]

// 每次爬取条数选项
const recordCountOptions = [
  { label: '1条', value: 1 },
  { label: '5条', value: 5 },
  { label: '10条', value: 10 },
  { label: '20条', value: 20 },
  { label: '50条', value: 50 },
  { label: '100条', value: 100 },
  { label: '200条', value: 200 }
]

// 方法引用
const startSpider = () => spiderStore.startSpider()
const stopSpider = () => spiderStore.stopSpider()
</script>

<template>
  <div class="spider-container">
    <div class="spider-header">
      <div>
        <h1 class="welcome-title">爬虫管理</h1>
        <p class="welcome-subtitle">设置爬虫参数并管理爬虫运行状态</p>
      </div>
    </div>

    <!-- 参数设置卡片 -->
    <el-card class="config-card">
      <template #header>
        <div class="card-header">
          <span>爬虫参数设置</span>
        </div>
      </template>

      <div class="config-form">
        <div class="form-item">
          <el-form-item label="爬取时间间隔">
            <el-select v-model="spiderStore.selectedTimeInterval" class="select-width" placeholder="选择时间间隔"
              :disabled="spiderStore.isRunning">
              <el-option v-for="item in timeIntervalOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </div>

        <div class="form-item">
          <el-form-item label="每次爬取条数">
            <el-select v-model="spiderStore.selectedRecordCount" class="select-width" placeholder="选择爬取条数"
              :disabled="spiderStore.isRunning">
              <el-option v-for="item in recordCountOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <span class="unit-label">条/次</span>
          </el-form-item>
        </div>
      </div>
    </el-card>

    <!-- 操作按钮区域 -->
    <div class="action-buttons">
      <el-button type="success" :icon="Check" size="large" :disabled="spiderStore.isRunning" @click="startSpider">
        开始爬虫
      </el-button>

      <el-button type="danger" :icon="Close" size="large" :disabled="!spiderStore.isRunning" @click="stopSpider">
        停止爬虫
      </el-button>
    </div>

    <!-- 状态显示卡片 -->
    <el-card class="status-card">
      <template #header>
        <div class="card-header">
          <span>爬虫状态</span>
        </div>
      </template>
      <div class="status-content">
        <div class="status-item">
          <span class="status-label">运行状态：</span>
          <el-tag :type="spiderStore.isRunning ? 'success' : 'danger'" size="large">
            {{ spiderStore.isRunning ? '运行中' : '已停止' }}
          </el-tag>
        </div>
        <div class="status-item">
          <span class="status-label">设置参数：</span>
          <div class="status-details">
            <span>每 {{ spiderStore.selectedTimeInterval }} 秒钟爬取 {{ spiderStore.selectedRecordCount }} 条记录</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.spider-container {
  .spider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .welcome-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 8px;
    }

    .welcome-subtitle {
      font-size: 1rem;
      color: #94a3b8;
    }
  }

  .config-card {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    border: 1px solid #475569;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px) scale(0.995);
      box-shadow: 0 4px 12px rgba(56, 103, 173, 0.87);
    }

    .card-header {
      color: #e2e8f0;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .config-form {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 16px 0;

      .form-item {
        flex: 1;
        min-width: 300px;
      }

      .el-form-item {
        margin-bottom: 0;
      }

      :deep(.el-form-item__label) {
        color: #94a3b8 !important;
        font-weight: 600;
        font-size: 1rem;
      }

      .select-width {
        width: 200px;
      }

      .unit-label {
        color: #c6d1e0;
        margin-left: 8px;
        font-size: 0.9rem;
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    .el-button {
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .status-card {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    border: 1px solid #475569;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    .card-header {
      color: #e2e8f0;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .status-content {
      padding: 16px 0;

      .status-item {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        &:last-child {
          margin-bottom: 0;
        }

        .status-label {
          color: #94a3b8;
          font-weight: 500;
          margin-right: 12px;
          min-width: 100px;
        }

        .status-details {
          color: #e2e8f0;
          font-size: 1rem;
        }
      }
    }
  }
}

:deep(.el-select) {
  --el-fill-color-blank: #243042;
  --el-bg-color-overlay: #1e293b;

  --el-text-color-primary: #E8F3FF;
  --el-text-color-regular: #CFE3FF;
  --el-text-color-secondary: #A6CDFF;
  --el-text-color-placeholder: #7EB8FF;

  /* 边框颜色 */
  --el-border-color: #4A5568;
  --el-border-color-light: #4A5568;
  --el-border-color-lighter: #4A5568;
  --el-border-color-extra-light: #4A5568;

  /* 下拉面板 */
  --el-bg-color: #2D3748;
  --el-bg-color-overlay: #081e44;

  /* 选项悬停/选中状态 */
  --el-color-primary-light-9: rgba(8, 14, 24, 0.16);
  --el-fill-color-light: rgba(255, 255, 255, 0.12);

}

/* 1. 下拉框触发按钮（深色） */
.el-select .el-input__inner {
  background-color: #1f2937;
  /* 深色背景，可按需调整 */
  border-color: #4b5563;
  /* 边框颜色 */
  color: #f3f4f6;
  /* 文字颜色（浅色） */
  --el-bg-color-overlay: #1e293b;
}

/* 触发按钮 hover/focus 状态 */
.el-select .el-input__inner:hover,
.el-select .el-input__inner:focus {
  border-color: #9ca3af;
  --el-bg-color-overlay: #1e293b;
}

/* 2. 下拉面板（深色） */
:deep(.el-select-dropdown) {
  background-color: #1f2937;
  /* 与按钮背景一致 */
  border-color: #4b5563;
  /* 面板边框 */
  --el-bg-color-overlay: #1e293b;
}

/* 下拉选项样式 */
.el-select-dropdown__item {
  background-color: #1f2937;
  color: #f3f4f6;
  /* 选项文字浅色 */
  --el-bg-color-overlay: #1e293b;
}

/* 选项 hover/选中状态 */
.el-select-dropdown__item:hover,
.el-select-dropdown__item.selected {
  background-color: #374151;
  /* hover/选中背景色 */
  color: #ffffff;
  /* 文字高亮 */
}

/* 下拉面板底部空白区域（如需统一深色） */
.el-select-dropdown__empty {
  color: #000000;
  /* 空选项文字色 */
}


// 响应式设计
@media (max-width: 768px) {
  .spider-container {
    .config-form {
      flex-direction: column;
      .form-item {
        min-width: 100%;
      }
    }

    .action-buttons {
      flex-direction: column;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>