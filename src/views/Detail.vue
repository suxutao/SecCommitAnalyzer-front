<template>
  <h1 style="font-size: 20px;text-align: center;color: aliceblue;">提交记录详情</h1>
  <div class="data-display-container">
    <el-descriptions border column="1" class="data-descriptions" label-width="120px">
      <el-descriptions-item label="日期">{{ useDateFormat(commitData.data.date, 'YYYY-MM-DD HH:mm:ss', {
        timeZone: 'UTC'
      }).value }}</el-descriptions-item>
      <el-descriptions-item label="SHA">
        <span class="sha-text">{{ commitData.data.sha }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="仓库信息">
        <el-breadcrumb separator="/" class="current-scope">
          <el-breadcrumb-item>{{ commitData.data.repo_name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ commitData.data.repo_owner }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ commitData.data.author }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-descriptions-item>
      <el-descriptions-item label="链接">
        <el-link :href="commitData.data.url" target="_blank" type="primary">
          {{ commitData.data.url }}
        </el-link></el-descriptions-item>
      <el-descriptions-item label="提交类型">
        <el-tag
          :type="commitData.data.is_security === true ? 'success' : commitData.data.is_security === false ? 'info' : 'warning'"
          class="status-tag" size="large">
          {{ commitData.data.is_security === true ? '安全补丁' : commitData.data.is_security === false ? '非安全补丁' : '未知' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="提交信息">
        <div v-html="commitData.data.message" class="diff-content"></div>
      </el-descriptions-item>
      <!-- <el-descriptions-item label="提交差异">
        <div v-html="formatDiff(commitData.data.diff)" class="diff-content"></div>
      </el-descriptions-item> -->
    </el-descriptions>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { ElDescriptions, ElDescriptionsItem, ElTag, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useDateFormat } from '@vueuse/core'

// 数据源
const commitData = defineProps({
  data: { required: true }
})

// 处理转义字符的函数
const formatDiff = (diffStr) => {
  if (!diffStr) return '';
  return diffStr.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
};
</script>

<style>
.diff-content {
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
  line-height: 1.5;
  padding: 10px;
  border-radius: 4px;
}

/* 深色模式容器样式 */
.data-display-container {
  background-color: #404E62;
  color: #e0e0e0;
}

/* 描述列表整体样式 */
.data-descriptions {
  background-color: #404E62;
  border: 0px solid #444;
  border-radius: 0px;
}

/* 描述项标签样式 */
.el-descriptions .el-descriptions__label {
  color: #fffcfc !important;
  font-weight: 500;
  background-color: #404E62 !important;
  border: 1px solid #b8b8b8 !important;
}

/* 描述项内容样式 */
.el-descriptions .el-descriptions__content {
  color: #e0e0e0 !important;
  background-color: #404E62 !important;
  border: 1px solid #b8b8b8 !important;
}

/* 最后一行去除下边框 */
.el-descriptions .el-descriptions__row:last-child .el-descriptions__label,
.el-descriptions .el-descriptions__row:last-child .el-descriptions__content {
  border-bottom: none !important;
}

/* SHA文本样式 */
.sha-text {
  font-family: monospace;
  color: #8ab4f8 !important;
  word-break: break-all;
}

/* 状态标签深色模式适配 */
.el-tag {
  border: none !important;
}

.el-tag--success {
  background-color: #1e5128 !important;
  color: #a3cfbb !important;
}

.el-tag--warning {
  background-color: #5c4033 !important;
  color: #f2c98a !important;
}

.el-tag--danger {
  background-color: #5c1e23 !important;
  color: #f8c1c3 !important;
}

.el-tag--info {
  background-color: #1e3a5f !important;
  color: #a0c4ff !important;
}
</style>

<style scoped>
/* 在当前作用域的根容器上定义CSS变量 */
.current-scope {
  --el-text-color-regular: #ffffff;
  /* 白色 */
}
</style>