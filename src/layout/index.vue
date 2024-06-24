<template>
  <div>
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <!-- 菜单区域 -->
      <div class="menu-container">
        <span class="title">后台管理</span>
        <!-- 水平菜单 -->
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="1">
            <!-- 用户管理路由链接 -->
            <router-link to="/user" class="menu-link">用户</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <!-- 轮播图管理路由链接 -->
            <router-link to="/carousel" class="menu-link">轮播图</router-link>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 用户信息和注销按钮 -->
      <div class="user-info">
        <span>{{ userinfo.username }}</span>
        <el-button @click="logout" type="primary" size="small">注销登录</el-button>
      </div>
    </el-header>

    <!-- 主要内容区域 -->
    <el-container>
      <div class="content">
        <!-- 路由视图占位符 -->
        <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'index',
  components: {

  },
  mixins: [],
  props: {

  },
  data() {
    return {
      userinfo: JSON.parse(localStorage.getItem('userinfo'))
    }
  },
  methods: {
    logout() {
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http.get(`/users/backend/logout?id=${userinfo.id}`).then(res => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
        }
      })
      localStorage.removeItem('token')
      localStorage.removeItem('userinfo')
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
  color: #333;
}

a {
  text-decoration: none;
  color: #333;
}

.link{
  display: block;
}

.header {
  padding-top: 30px;
  text-align: right;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 16px;
}

.menu {
  display: flex;
  align-items: center;
  gap: 40px;
}

.content {
  width: 1200px;
  margin: 0 auto;
}
</style>