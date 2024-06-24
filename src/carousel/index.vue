<template>
  <div>
    <!-- 上传区域 -->
    <div class="uploadImg">
      <!-- Element UI上传组件，包含自定义上传逻辑 -->
      <el-upload 
        action="#" 
        :http-request="customRequest" 
        class="upload-demo" 
        ref="upload" 
        :file-list="fileList"
        :on-success="uploadSuccess" 
        :auto-upload="false">
        <!-- 点击时触发文件选择 -->
        <el-button slot="trigger" size="small" type="warning">选取要上传的文件</el-button>
        <!-- 点击时提交上传 -->
        <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">点击上传文件</el-button>
      </el-upload>
    </div>
    <!-- 图片展示区域 -->
    <div class="block">
      <!-- 使用v-for循环展示图片列表 -->
      <div class="img" v-for="img in imgList" :key="img.id">
        <!-- Element UI图片组件，展示单个图片 -->
        <el-image style="width:300px" :src="`http://localhost:9000/${img.name}`"></el-image> 
        <!-- 删除按钮，点击时调用delImg方法删除图片 -->
        <el-button @click="delImg(img.id)" class="del" type="warning" icon="el-icon-delete" circle></el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 定义 Vue 组件
export default {
  name: 'index',
  // 组件使用的其他 Vue 组件
  components: {},
  // 混入的选项
  mixins: [],
  // 组件的属性
  props: {},
  // 组件的初始数据
  data() {
    return {
      imgList: [],// 存储图片列表
      fileList: []  // 存储上传的文件列表
    }
  },
  computed: {
  // 侦听器
  },
  watch: {
  // 组件挂载后调用的方法
  },
  mounted() {
    this.getSwiper()// 获取轮播图数据
  },
  methods: {
    // 提交上传文件
    submitUpload() {
      this.$refs.upload.submit()
    },
     // 自定义上传请求
    customRequest(params) {
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      console.log(params)
      const fd = new FormData()
      fd.append('id', userinfo.id)
      fd.append('carousel', params.file)
    // 发送 POST 请求上传文件
      this.$http.post('carousel/backend/add', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
          this.getSwiper()
        } else {
          this.$message('操作失败')
        }
      })
    },
    // 处理上传成功的逻辑
    uploadSuccess(res) {
      this.getSwiper()// 重新获取轮播图数据
    },
    // 获取轮播图数据
    getSwiper() {
      this.$http.get('/carousel/list').then(res => {
        if (res.data.code === 1) {
          this.imgList = res.data.list
        }
      })
    },
     // 删除图片
    delImg(imgId) {
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.$http.post('carousel/backend/remove', { id: userinfo.id, imgId: imgId }).then(res => {
        if (res.data.code === 1) {
          this.$message(res.data.message)
          this.getSwiper()
        } else {
          this.$message('操作失败')
        }
      })
    }
  }
};
</script>
<style scoped>
.uploadImg {
  margin: 24px;
  background-color: #4CAF50; /* 添加了背景颜色 */
}

.block {
  width: 100%;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 24px;
  background-color: #4CAF50; /* 添加了背景颜色 */
}

.img {
  position: relative;
  background-color: white; /* 假设图片容器背景为白色 */
}

.del {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #2c3e50; /* 删除按钮背景色，可以自定义 */
  color: white; /* 删除按钮文字颜色 */
  border-color: #2c3e50; /* 删除按钮边框颜色 */
}
</style>