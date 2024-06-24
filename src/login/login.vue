<template>
  <div class="login">     <!-- 整个登录界面的容器 -->
    <div class="input">    <!-- 输入框容器 -->
      <div class="login-title">欢迎登录后台管理系统</div>  <!-- 登录标题 -->
      <div class="input-item">          <!-- 用户名输入框 -->
        <div class="label">用户名</div>    
        <!-- 双向绑定用户名数据 -->
        <el-input
          v-model="username"             
          placeholder="请输入用户名"
          clearable
          key="username-input"  
        ></el-input>
      </div>
      <div class="input-item">          <!-- 唯一键值，用于优化渲染 -->
        <div class="label">密码</div>
        <!-- 双向绑定密码数据 -->
        <el-input
          v-model="password"
          type="password"
          placeholder="请输入密码"
          clearable
          key="password-input"
        ></el-input>
      </div>
      <div> <!-- 登录按钮 -->
        <el-button type="primary" style="width: 100%" @click="login">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '', //用户名数据绑定
      password: '',  //密码数据绑定
    }
  },
  mounted() {
    this.getCode()
  },
  methods: {
    getCode() {
      this.$http.get({ url: '/users/backend/code' }).then(res => {
        if (res.data.code === 1) {
          console.log(res)
          this.code = res.data.data.data
        }
      })
    },
    login() {                        // 登录方法
      if (!this.username) {
        this.$message({
          message: '请输入账号',
          type: 'error'
        })
        return
      }
      if (!this.password) {
        this.$message(
          {
            message: '请输入密码',
            type: 'error'
          }
        )
        return
      }
// 发送登录请求
      this.$http({ method: "POST", url: '/users/backend/login', data: { username: this.username, password: this.password } }).then((res) => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userinfo', JSON.stringify(res.data.user))
          this.$router.push('/user')
        } else {
          this.$message(res.data.message)
        }
      })
        .catch(() => {
          this.$message(res.data.message)
        })
    },
  },
}
</script>


<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('../../public/img/12.png');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input {
  width: 400px;
  background-color: rgb(212, 135, 235);
  border-radius: 5px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}


.login-title {
  color: #ff4056;
  font-size: 25px;
  font-weight: 700;
}

.label {
  margin-bottom: 10px;
}

.codebox {
  display: flex;
  gap: 12px;
}
</style>