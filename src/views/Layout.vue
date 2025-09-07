<template>
  <el-container class="app-container">
    <el-header>
      <div class="header-content">
        <div class="logo">
          <i class="fas fa-shield-alt"></i>
          <span>SecCommitAnalyzer：基于补丁差异的安全提交识别系统</span>
        </div>
        <div class="user-info">
          <el-avatar :size="36" :src="user.avatar" />
          <span class="user-name">{{ user.name }}</span>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="15%">
        <el-menu
          router
          :default-active="$route.path"
          class="side-menu"
          background-color="#1e293b"
          text-color="#cbd5e1"
          active-text-color="#3b82f6"
        >
          <el-menu-item index="/home">
            <el-icon><DataBoard /></el-icon>
            <span>首页仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/record">
            <el-icon><Folder /></el-icon>
            <span>详细记录</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="main-content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  DataBoard,
  Folder,
  Setting
} from '@element-plus/icons-vue'

// 用户信息
const user = reactive({
  name: '张垚',
  avatar: 'avatar.jpg',
  role: '管理员'
})

</script>

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
      transform: translateX(-80px);
      
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

.el-menu-item {
  font-size: 16px;
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

// 响应式设计
@media (max-width: 768px) {
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