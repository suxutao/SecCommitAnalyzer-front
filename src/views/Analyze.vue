<template>
  <h1 style="font-size: 20px;text-align: center;color: aliceblue;">分析记录详情</h1>
  <div class="data-display-container">
    <el-descriptions border column="1" class="data-descriptions" label-width="120px">
      <el-descriptions-item label="分析时间">
        {{ useDateFormat(analyzeData.data.date, 'YYYY-MM-DD HH:mm:ss', { timeZone: 'UTC' }).value }}
      </el-descriptions-item>
      <el-descriptions-item label="SHA">
        <span class="sha-text">{{ analyzeData.data.sha }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="CWE编号">
        {{ analyzeData.data.cwe }}
      </el-descriptions-item>
      <el-descriptions-item label="提交类型">
        <el-tag
          :type="analyzeData.data.analysis_meta?.raw?.patch_type === null ? 'warning' : analyzeData.data.analysis_meta?.raw?.patch_type === 'security' ? 'success' : 'info'"
          class="status-tag" size="large">
          {{ analyzeData.data.analysis_meta?.raw?.patch_type === null ? '未知补丁' :
            analyzeData.data.analysis_meta?.raw?.patch_type === 'security' ? '安全补丁' : '非安全补丁' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="分支来源">
        {{ analyzeData.data.source_branch || '无' }}
      </el-descriptions-item>
      <el-descriptions-item label="其他分支修复情况">
        <div v-for="item in analyzeData.data.other_branches" :key="item.branch">
          <span>{{ item.branch }}:</span>
          <el-tag
            :type="item.status === 'true' ? 'success' : 'danger'" size="small">
            {{ item.status === 'true' ? '已修复' : '未修复' }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <!-- <el-descriptions-item label="元信息">
        {{ analyzeData.data.analysis_meta }}
      </el-descriptions-item> -->
      <el-descriptions-item label="引擎">
        {{ analyzeData.data.analysis_meta?.engine || '无' }}
      </el-descriptions-item>
      <el-descriptions-item label="版本">
        {{ analyzeData.data.analysis_meta?.version || '无' }}
      </el-descriptions-item>
      <el-descriptions-item label="修复方案">
        {{ analyzeData.data.analysis_meta?.raw?.fix_plan || '无' }}
      </el-descriptions-item>
      <el-descriptions-item label="根本原因">
        {{ analyzeData.data.analysis_meta?.raw?.root_cause || '无' }}
      </el-descriptions-item>
      <el-descriptions-item label="关联的CVE">
        {{ analyzeData.data.analysis_meta?.raw?.related_cve || '无' }}
      </el-descriptions-item>
      <el-descriptions-item label="漏洞类型">
        {{ analyzeData.data.analysis_meta?.raw?.vulnerability_type || '无' }}
      </el-descriptions-item>
      <!-- <el-descriptions-item label="补丁类型">
        {{ analyzeData.data.analysis_meta?.raw?.补丁类型 || '无' }}
      </el-descriptions-item> -->
    </el-descriptions>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus'
import { useDateFormat } from '@vueuse/core'

// 数据源
const analyzeData = defineProps({
  data: { required: true }
})

const formattedMeta = computed(() => {
  const jsonStr = analyzeData.data?.analysis_meta;
  if (!jsonStr) return '无元信息';

  try {
    // 1. 解析JSON字符串为JavaScript对象
    const jsonObj = JSON.parse(jsonStr);
    // 2. 格式化对象为带缩进的字符串（2个空格缩进，保留层级）
    return JSON.stringify(jsonObj, null, 2);
  } catch (error) {
    // 处理JSON格式错误（如字符串不完整、语法错误）
    return `JSON解析失败：${error.message}`;
  }
});
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