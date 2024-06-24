<template>
  <div>
    <!-- 搜索区域 -->
    <div class="search">
      <!-- 搜索框，带有搜索图标和v-model绑定 -->
      <el-input 
        placeholder="请输入内容" 
        prefix-icon="el-icon-search" 
        v-model="search"  
      ></el-input>
      <el-button type="primary" @click="getSearch">查询</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="ctable">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column fixed prop="username" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="100">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="100">
        </el-table-column>
        <el-table-column prop="flag" label="禁用解禁" width="120">
          <template slot-scope="scope">
            <!-- 根据用户状态显示禁用或解禁按钮，并绑定点击事件 -->
            <el-button @click="jinyong(scope.row.id)" v-if="scope.row.flag === true" size="small">禁用</el-button>
            <el-button @click="jinyong(scope.row.id)" v-else type="danger" size="small">解禁</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="chongzhi(scope.row.id)" size="small">重置密码</el-button>
            <el-button @click="remove(scope.row.id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user',   //组件名称
  components: {
  },
  mixins: [],
  props: {
  },
  data() {
    return {
      search: '',   //搜索框绑定的数据
      userList: []    //用户列表数据
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getList()     //组件挂载后调用获取用户列表的方法 
  },
  methods: {
    getList() {       // 获取用户列表的方法
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http({ url: `/users/backend/list?id=${userinfo.id}` }).then(res => {
        if (res.data.code === 1) {
          this.userList = res.data.list
        }
      })
    },
    getSearch() {       // 搜索方法
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http({ url: `/users/backend/search?id=${userinfo.id}&searchStr=${this.search}` }).then(res => {
        if (res.data.code === 1) {
          this.userList = res.data.list
        }
      })
    },
    remove(id) {      // 删除用户的方法
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http({ method: 'post', url: '/users/backend/del', data: { id: userinfo.id, uid: id } }).then(res => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
          this.getList()
        } else {
          this.$message(res.data.message)
        }
      })
    },
    jinyong(id) {       // 禁用或解禁用户的方法
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http({ method: 'post', url: '/users/backend/flag', data: { id: userinfo.id, uid: id } }).then(res => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
          this.getList()
        } else {
          this.$message(res.data.message)
        }
      })
    },
    chongzhi(id) {      // 重置用户密码的方法
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http({ method: 'post', url: '/users/backend/reset', data: { id: userinfo.id, uid: id } }).then(res => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
          this.getList()
        } else {
          this.$message(res.data.message)
        }
      })
    }
  }
};
</script>
<style scoped>
.search {
  width: 600px;
  display: flex;
  align-items: center;
  margin: 24px;
  background-color: #0000FF; 
}
.ctable {
  margin: 0 24px 24px;
}
</style>