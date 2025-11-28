<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SimplePieChart from '../components/PieChart.vue'
import LineChart from '../components/LineChart.vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useStats } from '../stores/useStats.js'
import { usePieData} from '../stores/pieData.js'
import { test, pageQuery, getStatVulnerabilities, getStatPatchTypes } from '@/api/data.js'
import { useIntervalFn } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core';

// 获取路由实例
const router = useRouter();

// 定义跳转函数：通过路由实例跳转到/record  
const goToRecord = () => {
    router.push('/record'); // 编程式导航，跳转到目标路由
};

// 统计数据
const stats = useStats();
// 饼图数据
const pieData = usePieData();

// 扫描活动数据
const scanActivities = ref([])

// 漏洞类型分布
// const vulnerabilityDistribution = ref([
//     { type: '缓冲区溢出', count: 12, color: '#ef4444' },
//     { type: '空指针', count: 8, color: '#f97316' },
//     { type: '整数溢出', count: 5, color: '#eab308' },
//     { type: '死锁', count: 3, color: '#84cc16' },
//     { type: '其他', count: 7, color: '#64748b' }
// ])
const vulnerabilityDistribution = ref([])

// 补丁类型分布
// const patchTypeDistribution = ref([
//     { type: '功能新增', count: 12, color: '#ef4444' },
//     { type: '性能优化', count: 8, color: '#f97316' },
//     { type: '安全修复', count: 5, color: '#eab308' },
//     { type: '其他', count: 7, color: '#64748b' }
// ])
const patchTypeDistribution = ref([])

//扫描数据
const scanData = ref([
    { date: '10-01', scans: 10 },
    { date: '10-02', scans: 15 },
    { date: '10-03', scans: 8 },
    { date: '10-04', scans: 20 },
    { date: '10-05', scans: 12 },
    { date: '10-06', scans: 18 },
    { date: '10-07', scans: 25 }
])

// 定时任务
const { pause, resume, isActive } = useIntervalFn(async () => {
    try {
        const res = await pageQuery({
            page: 1,
            page_size: 5,
        })
        scanActivities.value = res.items
    } catch (error) {
        ElMessage.error('获取扫描活动失败')
    }
}, 5000, { immediate: true, immediateCallback: true })

// 生成过去7天的日期（格式：MM-DD）
const generatePast7Days = () => {
    const today = new Date();
    const past7Days = [];
    // 从6天前循环到今天（共7天）
    for (let i = 7; i > 0; i--) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - i); // 计算i天前的日期

        // 月份和日期补零（确保格式为两位，如：01-05）
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');

        past7Days.push(`${month}-${day}`);
    }
    return past7Days;
};

const handleTestConnection = async () => {
    try {
        await test()
        ElMessage.success('连接成功')
    } catch (error) {
        ElMessage.error('连接失败')
    }
}

// 更新scanData中的date为过去7天
onMounted(async () => {
    if (pieData.value.total === 0) {
        try {
            const vulnerabilities = await getStatVulnerabilities()
            const patchTypes = await getStatPatchTypes()
            pieData.value.array1 = vulnerabilities.items
            pieData.value.array2 = patchTypes.items
            pieData.value.total = vulnerabilities.total
        } catch (error) {
            ElMessage.error('获取统计数据失败')
        }
    }
    stats.value.vulnerabilities = pieData.value.total
    vulnerabilityDistribution.value = pieData.value.array1
    patchTypeDistribution.value = pieData.value.array2
    stats.value.securityRate = 58.8
    
    console.log(vulnerabilityDistribution.value);
    console.log(patchTypeDistribution.value);
    
    const past7Days = generatePast7Days();
    // 遍历scanData，替换每个对象的date
    scanData.value.forEach((item, index) => {
        item.date = past7Days[index];
    });
});

onUnmounted(() => {
    pause()
})
</script>

<template>
    <div class="dashboard-header">
        <div>
            <h1 class="welcome-title">安全提交分析控制台</h1>
            <p class="welcome-subtitle">监控和分析代码提交中的安全漏洞和潜在风险</p>
        </div>
        <el-button type="success" @click="handleTestConnection">
            测试连接
        </el-button>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-container">
        <el-card class="stat-card">
            <div class="stat-content">
                <div class="stat-icon">
                    <i class="fas fa-code-branch"></i>
                </div>
                <div class="stat-data">
                    <div class="stat-number">{{ stats.totalScans }}</div>
                    <div class="stat-title">总扫描提交数</div>
                </div>
            </div>
        </el-card>

        <el-card class="stat-card">
            <div class="stat-content">
                <div class="stat-icon" style="color: #10b981;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="stat-data">
                    <div class="stat-number">{{ stats.securityRate }}%</div>
                    <div class="stat-title">安全提交率</div>
                </div>
            </div>
        </el-card>

        <el-card class="stat-card">
            <div class="stat-content">
                <div class="stat-icon" style="color: #ef4444;">
                    <i class="fas fa-bug"></i>
                </div>
                <div class="stat-data">
                    <div class="stat-number">{{ stats.vulnerabilities }}</div>
                    <div class="stat-title">发现漏洞</div>
                </div>
            </div>
        </el-card>

        <el-card class="stat-card">
            <div class="stat-content">
                <div class="stat-icon" style="color: #f59e0b;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="stat-data">
                    <div class="stat-number">{{ stats.potentialRisks }}</div>
                    <div class="stat-title">潜在风险</div>
                </div>
            </div>
        </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
        <el-card class="chart-card">
            <template #header>
                <div class="chart-header">
                    <span>漏洞类型分布</span>
                </div>
            </template>
            <div class="chart-content">
                <div class="vulnerability-list">
                    <div v-for="(item, index) in vulnerabilityDistribution" :key="index" class="vulnerability-item">
                        <div class="vuln-type">
                            <div class="color-indicator" :style="{ backgroundColor: item.color }"></div>
                            <span>{{ item.type }}</span>
                        </div>
                        <div class="vuln-count">{{ item.count }}个</div>
                    </div>
                </div>
                <div class="chart-placeholder">
                    <i class="fas fa-chart-pie"></i>
                    <SimplePieChart :chart-data="vulnerabilityDistribution" />
                </div>
            </div>
        </el-card>

        <el-card class="chart-card">
            <template #header>
                <div class="chart-header">
                    <span>补丁类型分布</span>
                </div>
            </template>
            <div class="chart-content">
                <div class="vulnerability-list">
                    <div v-for="(item, index) in patchTypeDistribution" :key="index" class="vulnerability-item">
                        <div class="vuln-type">
                            <div class="color-indicator" :style="{ backgroundColor: item.color }"></div>
                            <span>{{ item.type }}</span>
                        </div>
                        <div class="vuln-count">{{ item.count }}个</div>
                    </div>
                </div>
                <div class="chart-placeholder">
                    <i class="fas fa-chart-pie"></i>
                    <SimplePieChart :chart-data="patchTypeDistribution" />
                </div>
            </div>
        </el-card>
    </div>

    <!-- 最近扫描活动 -->
    <div class="charts-container">
        <el-card class="chart-card">
            <template #header>
                <div class="chart-header">
                    <span>扫描数量图</span>
                </div>
            </template>
            <div class="chart-placeholder">
                <i class="fas fa-chart-line"></i>
                <LineChart :data="scanData" />
            </div>
        </el-card>
        <el-card class="activity-card">
            <template #header>
                <div class="activity-header">
                    <span>最近扫描活动</span>
                    <el-button type="primary" text @click="goToRecord">查看全部</el-button>
                </div>
            </template>
            <el-table :data="scanActivities" class="dark-table commits-table" style="width: 100%;margin: auto;">
                <!-- ID列 -->
                <el-table-column label="ID" width="100">
                    <template #default="scope">
                        <div class="commit-id">
                            <i class="fas fa-code-commit"></i>
                            {{ scope.row.sha.substring(0, 8) }}
                        </div>
                    </template>
                </el-table-column>

                <!-- 日期列 -->
                <el-table-column label="日期">
                    <template #default="scope">
                        <div class="commit-date">
                            {{ useDateFormat(scope.row.date, 'YYYY-MM-DD HH:mm:ss', { timeZone: 'UTC' }).value }}
                        </div>
                    </template>
                </el-table-column>

                <!-- 分支和消息 -->
                <el-table-column label="仓库信息" min-width="150">
                    <template #default="scope">
                        <div class="commit-info">
                            <div class="commit-message">
                                {{ scope.row.repo_name }}
                            </div>
                            <div class="commit-meta">
                                <el-tag size="small" effect="plain" class="branch-tag">
                                    <i class="fas fa-code-branch"></i>
                                    {{ scope.row.repo_owner }}
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
                <el-table-column label="提交类型" align="center">
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.is_security === true ? 'success' : scope.row.is_security === false ? 'info' : 'warning'"
                            class="status-tag" size="large">
                            {{ scope.row.is_security === true ? '安全补丁' : scope.row.is_security === false ? '非安全补丁' :
                                '未知' }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

</template>

<style lang="scss" scoped>
.app-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.el-header {
    background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    padding: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    height: 64px;

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 24px;

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;

            i {
                margin-right: 12px;
                color: #10b981;
                font-size: 1.8rem;
            }
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 16px;

            .user-name {
                font-weight: 500;
                margin-right: 8px;
            }
        }
    }
}

.el-container {
    min-height: calc(100vh - 64px);
}

.el-aside {
    background-color: #1e293b;
    border-right: 1px solid #334155;

    .side-menu {
        border-right: none;
        padding: 16px 8px;

        .el-menu-item {
            height: 48px;
            margin: 4px 0;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
                background-color: #334155 !important;
            }

            &.is-active {
                background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%) !important;
                color: #fff !important;
                font-weight: 500;
            }
        }

        .el-sub-menu {
            .el-sub-menu__title {
                height: 48px;
                margin: 4px 0;
                border-radius: 8px;

                &:hover {
                    background-color: #334155 !important;
                }
            }

            .el-menu-item {
                padding-left: 56px !important;
            }
        }

        .badge {
            margin-left: 8px;
        }
    }
}

.el-main {
    padding: 24px;
    background-color: #0f172a;

    .main-content {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        min-height: calc(100vh - 112px);
        border: 1px solid #334155;
    }
}

.dashboard-header {
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

.stats-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;

    .stat-card {
        background: linear-gradient(135deg, #334155 0%, #475569 100%);
        border: 1px solid #475569;

        :deep(.el-card__body) {
            padding: 20px;
        }

        .stat-content {
            display: flex;
            align-items: center;
        }

        .stat-icon {
            font-size: 2.5rem;
            margin-right: 16px;
            color: #60a5fa;
        }

        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 4px;
        }

        .stat-title {
            font-size: 0.9rem;
            color: #94a3b8;
        }
    }

    :deep(.stat-card:hover) {
        transform: translateY(-3px) scale(0.99);
        /* 向上位移3px + 轻微缩放 */
        box-shadow: 0 4px 12px rgba(56, 103, 173, 0.87);
        /* 加深阴影增强立体感 */
    }
}

.charts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;

    .chart-card {
        background: linear-gradient(135deg, #334155 0%, #475569 100%);
        border: 1px solid #475569;

        .chart-header {
            color: #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chart-content {
            display: flex;
            height: 450px;
        }

        .vulnerability-list {
            flex: 1;
            padding-right: 16px;
            color: #e2e8f0;
        }

        .vulnerability-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #475569;

            &:last-child {
                border-bottom: none;
            }

            .vuln-type {
                display: flex;
                align-items: center;

                .color-indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    margin-right: 8px;
                }
            }
        }

        .chart-placeholder {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #64748b;

            i {
                font-size: 3rem;
                margin-bottom: 12px;
            }
        }
    }
}

.activity-card {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    border: 1px solid #475569;

    .activity-header {
        color: #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    .stats-container {
        grid-template-columns: repeat(2, 1fr);
    }

    .charts-container {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .stats-container {
        grid-template-columns: 1fr;
    }

    .el-aside {
        width: 64px !important;

        .el-sub-menu__title span,
        .el-menu-item span {
            display: none;
        }
    }

    .header-content {
        .logo span {
            display: none;
        }

        .user-info .user-name {
            display: none;
        }
    }
}
</style>