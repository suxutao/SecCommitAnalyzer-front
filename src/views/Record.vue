<template>
    <el-dialog v-model="dialogVisible" width="50%" style="background-color: #2B384B;height: fit-content;">
        <Detail :data="ObjectData"></Detail>
    </el-dialog>
    <!-- 页面标题和操作 -->
    <div class="page-header">
        <div>
            <h1 class="page-title">提交记录详细分析</h1>
            <p class="page-subtitle">代码提交安全扫描结果与详细分析</p>
        </div>
    </div>

    <!-- 提交历史表格 -->
    <el-card class="commits-card">
        <template #header>
            <div class="card-header">
                <span>最近提交记录</span>
                <!-- <div>
                    <el-select placeholder="所有分支" v-model="selectedBranch" style="width: 150px;" class="dark-select">
                        <el-option label="所有分支" value="all" />
                        <el-option label="main" value="main" />
                        <el-option label="dev" value="dev" />
                        <el-option label="release" value="release" />
                    </el-select>
                </div> -->
            </div>
        </template>

        <el-table :data="commitHistory" class="dark-table commits-table" style="width: 80%;margin: auto;">
            <!-- ID列 -->
            <el-table-column label="ID" width="100">
                <template #default="scope">
                    <div class="commit-id">
                        <i class="fas fa-code-commit"></i>
                        {{ scope.row.id.substring(0, 8) }}
                    </div>
                </template>
            </el-table-column>

            <!-- 日期列 -->
            <el-table-column label="日期" width="160">
                <template #default="scope">
                    <div class="commit-date">
                        {{ scope.row.date }}
                    </div>
                </template>
            </el-table-column>

            <!-- SHA列 -->
            <el-table-column label="SHA" min-width="180">
                <template #default="scope">
                    <div class="commit-sha">
                        <el-tooltip :content="scope.row.sha" placement="top">
                            <span>{{ scope.row.sha.substring(0, 20) }}...</span>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>

            <!-- 分支和消息 -->
            <el-table-column label="提交信息" min-width="300">
                <template #default="scope">
                    <div class="commit-info">
                        <div class="commit-message">
                            {{ scope.row.message }}
                        </div>
                        <div class="commit-meta">
                            <el-tag size="small" effect="plain" class="branch-tag">
                                <i class="fas fa-code-branch"></i>
                                {{ scope.row.branch }}
                            </el-tag>
                            <span class="commit-author">
                                <i class="fas fa-user"></i>
                                {{ scope.row.author }}
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <!-- 安全状态列 -->
            <el-table-column label="安全状态" width="120" align="center">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.status === 'safe' ? 'success' : scope.row.status === 'warning' ? 'warning' : 'danger'"
                        class="status-tag" size="large">
                        {{ scope.row.status === 'safe' ? '安全' : scope.row.status === 'warning' ? '警告' : '危险' }}
                    </el-tag>
                </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button size="medium" type="primary" @click="viewCommitDetails(scope.row)" class="detail-btn">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页控件 -->
        <div class="pagination-container">
            <el-pagination :page-size="10" :total="25" layout="total, prev, pager, next, jumper" 
                background class="dark-pagination" />
        </div>
    </el-card>
</template>

<script setup>
import { ref,nextTick } from 'vue'
import Detail from './Detail.vue'

// 选择的分支
const selectedBranch = ref('all')

// 提交历史数据
const commitHistory = ref([
    {
        id: 'a1b2c3d4',
        date: '2023-10-15 14:32:25',
        sha: 'a1b2c3d4e5f67890123456789abcdef01234567',
        message: '修复XSS漏洞 - 用户输入验证',
        author: '张三',
        status: 'safe',
        branch: 'main'
    },
    {
        id: 'b2c3d4e5',
        date: '2023-10-15 13:15:42',
        sha: 'b2c3d4e5f67890123456789abcdef0123456789',
        message: '添加SQL注入防护',
        author: '李四',
        status: 'safe',
        branch: 'dev'
    },
    {
        id: 'c3d4e5f6',
        date: '2023-10-15 12:42:18',
        sha: 'c3d4e5f67890123456789abcdef0123456789ab',
        message: '更新依赖包版本',
        author: '王五',
        status: 'warning',
        branch: 'feature/auth'
    },
    {
        id: 'd4e5f678',
        date: '2023-10-15 11:28:53',
        sha: 'd4e5f67890123456789abcdef0123456789abcd',
        message: '临时提交，包含敏感信息',
        author: '赵六',
        status: 'danger',
        branch: 'hotfix'
    },
    {
        id: 'e5f67890',
        date: '2023-10-15 10:15:37',
        sha: 'e5f67890123456789abcdef0123456789abcde',
        message: '重构用户认证模块',
        author: '钱七',
        status: 'safe',
        branch: 'main'
    }
])

// 查看提交详情
const dialogVisible = ref(false)
const ObjectData = ref({})
const viewCommitDetails = async(commit) => {
    console.log('查看提交详情:', commit)
    dialogVisible.value = true
    await nextTick()
    console.log('查看提交详情:', ObjectData.value)
    ObjectData.value = commit
}
</script>

<style lang="scss" scoped>
.main-content {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-height: calc(100vh - 112px);
    border: 1px solid #334155;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .page-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 8px;
    }

    .page-subtitle {
        font-size: 1rem;
        color: #94a3b8;
    }

    .header-actions {
        display: flex;
        align-items: center;
    }
}

.commits-card {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    border: 1px solid #475569;

    .card-header {
        color: #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
  background-color: #1f2937; /* 深色背景，可按需调整 */
  border-color: #4b5563;     /* 边框颜色 */
  color: #f3f4f6;            /* 文字颜色（浅色） */
  --el-bg-color-overlay: #1e293b;
}
/* 触发按钮 hover/focus 状态 */
.el-select .el-input__inner:hover,
.el-select .el-input__inner:focus {
  border-color: #9ca3af;
  --el-bg-color-overlay: #1e293b;
}

/* 2. 下拉面板（深色） */
:deep(.el-select-dropdown ){
  background-color: #1f2937; /* 与按钮背景一致 */
  border-color: #4b5563;     /* 面板边框 */
  --el-bg-color-overlay: #1e293b;
}
/* 下拉选项样式 */
.el-select-dropdown__item {
background-color: #1f2937;
  color: #f3f4f6; /* 选项文字浅色 */
  --el-bg-color-overlay: #1e293b;
}
/* 选项 hover/选中状态 */
.el-select-dropdown__item:hover,
.el-select-dropdown__item.selected {
  background-color: #374151; /* hover/选中背景色 */
  color: #ffffff;            /* 文字高亮 */
}
/* 下拉面板底部空白区域（如需统一深色） */
.el-select-dropdown__empty {
  color: #000000; /* 空选项文字色 */
}


// 提交表格自定义样式
:deep(.commits-table) {
    .commit-id {
        display: flex;
        align-items: center;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.9rem;
        color: #60a5fa;

        i {
            margin-right: 6px;
            color: #8b5cf6;
        }
    }

    .commit-date {
        color: #94a3b8;
        font-size: 0.9rem;
    }

    .commit-sha {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.85rem;
        color: #cbd5e1;
        cursor: pointer;

        &:hover {
            color: #60a5fa;
        }
    }

    .commit-info {
        .commit-message {
            color: #e2e8f0;
            margin-bottom: 6px;
            font-weight: 500;
        }

        .commit-meta {
            display: flex;
            align-items: center;
            gap: 12px;

            .branch-tag {
                background-color: #3b82f520;
                border-color: #3b82f540;
                color: #60a5fa;

                i {
                    margin-right: 4px;
                }
            }

            .commit-author {
                font-size: 0.8rem;
                color: #94a3b8;

                i {
                    margin-right: 4px;
                }
            }
        }
    }

    .status-tag {
        font-weight: 500;

        i {
            margin-right: 4px;
        }
    }

    .detail-btn {
        background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
        border: none;

        &:hover {
            background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
        }
    }
}

.pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

// 深色分页样式
:deep(.dark-pagination) {
    --el-pagination-bg-color: #1e293b;
    --el-pagination-button-color: #e2e8f0;
    --el-pagination-button-disabled-color: #64748b;
    --el-pagination-button-disabled-bg-color: #334155;
    --el-pagination-button-bg-color: #334155;
    --el-pagination-hover-color: #3b82f5;
    --el-pagination-font-color: #e2e8f0;

    .btn-prev,
    .btn-next,
    .number {
        background-color: var(--el-pagination-button-bg-color);
        color: var(--el-pagination-button-color);
        border: 1px solid #475569;

        &:hover {
            color: var(--el-pagination-hover-color);
        }

        &.active {
            background-color: #3b82f5;
            color: white;
            border-color: #3b82f5;
        }
    }

    .el-pagination__total {
        color: #94a3b8;
    }

    .el-pagination__jump {
        color: #94a3b8;

        .el-input__inner {
            background-color: #334155;
            border-color: #475569;
            color: #e2e8f0;
        }
    }
}


// 深色主题表格样式
:deep(.dark-table) {
    --el-table-border-color: #475569;
    --el-table-border: 1px solid var(--el-table-border-color);
    --el-table-text-color: #e2e8f0;
    --el-table-header-text-color: #94a3b8;
    --el-table-row-hover-background-color: #495e7c;
    --el-table-current-row-background-color: #4ca9f565;
    --el-table-header-background-color: #1e293b;
    --el-table-fixed-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    --el-table-background-color: #1e293b;
    --el-table-tr-background-color: #2c4061;

    .el-table__header {
        th {
            background-color: var(--el-table-header-background-color);
            color: var(--el-table-header-text-color);
            font-weight: 600;
        }
    }

    .el-table__body {
        tr {
            background-color: var(--el-table-tr-background-color);
            color: var(--el-table-text-color);

            &:hover {
                >td {
                    background-color: var(--el-table-row-hover-background-color);
                }
            }
        }

        td {
            border-bottom: var(--el-table-border);
        }
    }

    .el-table__empty-block {
        background-color: var(--el-table-background-color);
        color: var(--el-table-text-color);
    }

    // 分页器样式（如果使用）
    .el-pagination {
        --el-pagination-background-color: #1e293b;
        --el-pagination-button-color: #e2e8f0;
        --el-pagination-button-disabled-color: #64748b;
        --el-pagination-hover-color: #3b82f5;
    }
}

// 响应式设计
@media (max-width: 1200px) {
    .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .header-actions {
        width: 100%;
        justify-content: space-between;
    }
}
</style>