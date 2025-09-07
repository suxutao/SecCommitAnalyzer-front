<template>
  <h1 style="font-size: 20px;text-align: center;color: aliceblue;">提交记录详情</h1>
  <div class="data-display-container">
    <el-descriptions border column="1" class="data-descriptions">
      <el-descriptions-item label="ID">{{ commitData.data.id }}</el-descriptions-item>
      <el-descriptions-item label="日期">{{ commitData.data.date }}</el-descriptions-item>
      <el-descriptions-item label="SHA">
        <span class="sha-text">{{ commitData.data.sha }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="提交信息">{{ commitData.data.message }}</el-descriptions-item>
      <el-descriptions-item label="作者">{{ commitData.data.author }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="getStatusType">{{ commitData.data.status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="分支">{{ commitData.data.branch }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import { ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus'

// 数据源
const commitData = defineProps({
  data: { required: true }
})

// 根据状态获取标签类型
const getStatusType = computed(() => {
  switch (commitData.data.status) {
    case 'safe': return 'success'
    case 'warning': return 'warning'
    case 'danger': return 'danger'
    default: return 'info'
  }
})
</script>

<style>
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
